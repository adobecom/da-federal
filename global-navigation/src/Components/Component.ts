import { IrrecoverableError, RecoverableError } from "../Error/Error";
import { Brand, parseBrand } from "./Brand/Parse";
import { parsePrimaryCTA, parseSecondaryCTA, PrimaryCTA, SecondaryCTA } from "./CTA/Parse";
import { Link, parseLink } from "./Link/Parse";
import { MegaMenu, parseMegaMenu } from "./MegaMenu/Parse";
import { parseSmallMenu, SmallMenu } from "./SmallMenu/Parse";
import { parseText, Text } from "./Text/Parse";

export type Component
  = Text
  | Link
  | SecondaryCTA
  | PrimaryCTA
  | Brand
  | SmallMenu
  | MegaMenu;

export const parseComponent = (
  element: Element
): Parsed<Component, RecoverableError> => {
  if (element === null)
    throw new IrrecoverableError(ERRORS.elementNull);

  const brand = element.querySelector('.gnav-brand');
  if (brand !== null) 
    return parseBrand(element)

  const largeMenu = element.querySelector('.large-menu');
  if (largeMenu !== null)
    return parseMegaMenu(largeMenu);

  if (element.querySelector('h5, ul, link-group') !== null)
    return parseSmallMenu(element);

  if (element.querySelector('strong') !== null)
    return parsePrimaryCTA(element);
  
  if (element.querySelector('em') !== null)
    return parseSecondaryCTA(element);

  if (element.querySelector('a') === null)
    return parseText(element);

  return parseLink(element.querySelector('a'));
};

const ERRORS = {
  elementNull: "Element is null",
};

