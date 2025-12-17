import { Brand } from "./Parse";
import './brand.css';

const isDarkMode = (): boolean => {
 // TODO: Implement dark mode detection
  return true;
};

const createImageElement = ({
  renderImage,
  imgSrc,
  imgSrcDark,
  altText,
  brandImageOnly,
}: Brand): string => {
  if (!renderImage) {
    return '';
  }

  let imageSrc = imgSrc;
  if (isDarkMode() && imgSrcDark !== null && imgSrcDark !== undefined) {
    imageSrc = imgSrcDark;
  }

  // If the imgSrc starts with '<svg', it's inline SVG HTML
  const isInlineSvg = imageSrc.startsWith('<svg');
  const brandImageClass = brandImageOnly ? ' brand-image-only' : '';
  
  if (isInlineSvg) {
    const className = `feds-brand-image${brandImageClass}`;
    return `<span class="${className}">${imageSrc}</span>`;
  }

  // Regular image element
  const altAttr = altText.length > 0 ? ` alt="${altText}"` : '';
  const className = `feds-brand-image${brandImageClass}`;
  return `<span class="${className}"><img src="${imageSrc}"${altAttr} /></span>`;
};

const createLabelElement = ({
  renderLabel,
  label,
}: Brand): string => {
  if (!renderLabel || label.length === 0) return '';

  return `<span class="feds-brand-label">${label}</span>`;
};

/**
 * Renders the brand component as HTML
 */
export const brand = (brandData: Brand): HTML => {
  const { href, renderImage, renderLabel, altText } = brandData;

  if (!renderImage && !renderLabel) return '';

  const imageElement = createImageElement(brandData);
  const labelElement = createLabelElement(brandData);

  // If only image is rendered and we have alt text, 
  // add aria-label for accessibility
  const ariaLabel = !renderLabel && altText.length > 0 ? ` aria-label="${altText}"` : '';

  return `
   <div class="feds-brand-container">
    <a href="${href}" class="feds-brand" daa-ll="Brand"${ariaLabel}>
        ${imageElement}
        ${labelElement}
      </a>
    </div>`.trim();
};