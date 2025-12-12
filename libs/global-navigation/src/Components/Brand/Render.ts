import { Brand } from "./Parse";

export const brand = ({
  imgSrc,
  altText,
  href
}: Brand): HTML => `
<a href="${href.href}" 
   class="feds-brand"
   aria-label="Adobe"
>
 <img src="${imgSrc}" alt="${altText}" loading="lazy"> 
</a>
`;
