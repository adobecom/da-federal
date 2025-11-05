import { RecoverableError } from "../../Error/Error";

export type Brand = {
  type: "Brand";
  imgSrc: string;
  altText: string;
  render: boolean;
  brandImageOnly: boolean;
  href: URL;
};

// TODO: Implement this for real.
export const parseBrand = (
  _element: Element | null,
): Parsed<Brand, RecoverableError> => {
  return [
    {
      type: "Brand",
      imgSrc: "/federal/assets/svgs/adobe-logo.svg",
      altText: "Adobe .Inc.",
      render: true,
      brandImageOnly: true,
      href: new URL('https://www.adobe.com')
    },
    []
  ]
};
