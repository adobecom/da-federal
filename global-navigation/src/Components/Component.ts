import { IrrecoverableError, RecoverableError } from "../Error/Error";
import { Brand } from "./Brand/Parse";
import { PrimaryCTA, SecondaryCTA } from "./CTA/Parse";
import { Link } from "./Link/Parse";
import { MegaMenu, parseMegaMenu } from "./MegaMenu/Parse";
import { SmallMenu } from "./SmallMenu/Parse";
import { parseText, Text } from "./Text/Parse";

export type Component
  = Text
  | Link
  | SecondaryCTA
  | PrimaryCTA
  | Brand
  | SmallMenu
  | MegaMenu;

export const parseComponent = async (
  element: Element | null
): Promise<Parsed<Component, RecoverableError>> => {
  if (element === null)
    throw new IrrecoverableError(elementNull);

  const largeMenu = element.querySelector('.large-menu') ?? null;
  const fragmentLink = largeMenu?.querySelector(
};

const ERRORS = {
  elementNull: "Element is null",
};

