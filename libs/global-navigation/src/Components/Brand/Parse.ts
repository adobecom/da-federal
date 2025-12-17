import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { icons } from "../../Utils/Utils";

export type Brand = {
  type: "Brand";
  imgSrc: string;
  imgSrcDark?: string;
  altText: string;
  label: string;
  href: string;
  renderImage: boolean;
  renderLabel: boolean;
  brandImageOnly: boolean;
};

const ERRORS = {
  elementNull: "Error when parsing Brand. Element is null",
  noLinks: "Error when parsing Brand. No links found",
  noPrimaryLink: "Error when parsing Brand. No primary link found",
};

const IMG_REGEX = /(\.png|\.jpg|\.jpeg|\.svg)/i;

/**
 * Extracts image source from a link element or picture element
 */
const extractImageSource = (element: Element): string | null => {
  // Check for picture > img elements
  const img = element.querySelector('picture img');
  if (img !== null) {
    const src = img.getAttribute('src');
    if (src !== null && src.length > 0) {
      return src;
    }
  }

  // Check for text content in format "source|alt"
  const textContent = element.textContent?.trim();
  if (textContent !== null && textContent !== undefined 
    && textContent.length > 0 && IMG_REGEX.test(textContent)) {
    const [source] = textContent.split('|');
    const trimmedSource = source.trim();
    if (trimmedSource.length > 0) {
      return trimmedSource;
    }
  }

  // Check if the link itself points to an image
  const href = element.getAttribute('href');
  if (href !== null && href.length > 0 && IMG_REGEX.test(href)) {
    return href;
  }

  return null;
};

/**
 * Extracts alt text from image content
 */
const extractAltText = (element: Element): string => {
  const textContent = element.textContent?.trim();

  // Check for format "source|alt"
  if (textContent !== null && textContent !== undefined && textContent.includes('|')) {
    const [, alt] = textContent.split('|');
    const trimmedAlt = alt?.trim();
    if (trimmedAlt !== null && trimmedAlt !== undefined) {
      return trimmedAlt;
    }
  }

  const img = element.querySelector('img');
  if (img !== null) {
    const alt = img.getAttribute('alt');
    if (alt !== null) {
      return alt;
    }
  }

  return '';
};

export const parseBrand = (
  element: Element | null,
): Parsed<Brand, RecoverableError> => {
  if (element === null) {
    throw new IrrecoverableError(ERRORS.elementNull);
  }

  const rawBlock = element.querySelector('.gnav-brand');
  if (rawBlock === null) {
    throw new IrrecoverableError(ERRORS.elementNull);
  }

  const blockLinks = [...rawBlock.querySelectorAll('a')] as HTMLAnchorElement[];
  if (blockLinks.length === 0) {
    throw new IrrecoverableError(ERRORS.noLinks);
  }

  // Find the primary (non-image) link
  const primaryLink = blockLinks.find((link) => {
    const textContent = link.textContent ?? '';
    return !IMG_REGEX.test(link.href) && !IMG_REGEX.test(textContent);
  });

  if (!primaryLink) {
    throw new IrrecoverableError(ERRORS.noPrimaryLink);
  }

  // Determine rendering flags based on CSS classes
  const isBrandImageOnly = rawBlock.matches('.brand-image-only');
  const noLogo = rawBlock.matches('.no-logo');
  const imageOnly = rawBlock.matches('.image-only');
  const renderImage = !noLogo;
  const renderLabel = !isBrandImageOnly && !imageOnly;

  // Get image links for extracting image sources and alt text
  const imageLinks = blockLinks.filter((link) => {
    const textContent = link.textContent ?? '';
    return IMG_REGEX.test(link.href) || IMG_REGEX.test(textContent);
  });

  // Extract image sources (light and dark mode) and alt text
  let imgSrc = '';
  let imgSrcDark: string | undefined;
  let altText = '';

  if (imageLinks.length > 0) {
    const extractedSrc = extractImageSource(imageLinks[0]);
    imgSrc = extractedSrc ?? '';

    // If there are two images, the second is for dark mode
    if (imageLinks.length > 1) {
      const extractedDarkSrc = extractImageSource(imageLinks[1]);
      imgSrcDark = extractedDarkSrc ?? undefined;
    }
    altText = extractAltText(imageLinks[0]);
  } else {
    const labelText = primaryLink.textContent?.trim();
    altText = labelText ?? '';
  }

  // Check for SVG images in picture elements
  const svgImagesNodeList = rawBlock.querySelectorAll('picture img[src$=".svg"]');
  const svgImages = [...svgImagesNodeList] as HTMLImageElement[];
  if (svgImages.length > 0) {
    imgSrc = svgImages[0].src;
    if (svgImages.length > 1) {
      imgSrcDark = svgImages[1].src;
    }
  }

  // Fallback to default Adobe icons if no image found
  if (imgSrc.length === 0) {
    imgSrc = isBrandImageOnly ? icons.brand : icons.company;
  }

  return [
    {
      type: "Brand",
      imgSrc,
      imgSrcDark,
      altText,
      renderImage,
      renderLabel,
      href: primaryLink.href,
      brandImageOnly: isBrandImageOnly,
      label: primaryLink.textContent?.trim() ?? '',
    },
    []
  ];
};
