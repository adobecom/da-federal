import { Brand } from "./Parse";
import './brand.css';

type ImageData = Extract<Brand['data'], { image: unknown }>['image'];

const renderImage = (image: ImageData, imageOnly: boolean): string => {
  const cls = `feds-brand-image${imageOnly ? ' brand-image-only' : ''}`;
  
  if (image.type === 'inline-svg') {
    return `<span class="${cls}">${image.svgContent}</span>`;
  }

  const alt = image.alt ? ` alt="${image.alt}"` : '';
  return `<span class="${cls}"><img src="${image.src}"${alt} /></span>`;
};

const renderBrand = (href: string, content: string, ariaLabel = ''): HTML =>
  `<div class="feds-brand-container">
    <a href="${href}" class="feds-brand" daa-ll="Brand"${ariaLabel}>
      ${content}
    </a>
  </div>`.trim();

export const brand = (brandData: Brand): HTML => {
  const { data } = brandData;
  switch (data.type) {
    case 'LabelledBrand':
      return renderBrand(
        data.href,
        renderImage(data.image, false) +
        `<span class="feds-brand-label">${data.label}</span>`
      );

    case 'BrandImageOnly': {
      const aria = data.alt ? ` aria-label="${data.alt}"` : '';
      return renderBrand(
        data.href,
        renderImage(data.image, true),
        aria
      );
    }

    case 'ImageOnlyBrand': {
      const aria = data.alt ? ` aria-label="${data.alt}"` : '';
      return renderBrand(
        data.href,
        renderImage(data.image, false),
        aria
      );
    }

    case 'BrandLabelOnly':
      return renderBrand(
        data.href,
        `<span class="feds-brand-label">${data.label}</span>`
      );

    case 'NoRender':
      return '';

    default:
      data satisfies never;
      return '';
  }
};