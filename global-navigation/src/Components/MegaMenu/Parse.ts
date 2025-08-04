import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { parseListAndAccumulateErrors } from "../../Utils/Utils";
import { Column, parseColumn } from "../Column/Parse";
import { Link, parseLink } from "../Link/Parse";


export type MegaMenu = {
  type: "MegaMenu";
  title: string;
  columns: List<Column>;
  crossCloudMenu: List<Link>;
  isSection: boolean;
};

export const parseMegaMenu = (
  element: Element | null
): Parsed<MegaMenu, RecoverableError> => {
  const errors = new Set<RecoverableError>();
  if (element === null)
    throw new IrrecoverableError(ERRORS.elementNull);

  const title = element.querySelector('h2')?.textContent ?? "";
  if (title === "")
    errors.add(new RecoverableError(ERRORS.noTitle))

  const unparsedColumns = [...element.children];
  const [columns, columnErrors] = parseListAndAccumulateErrors(
    unparsedColumns,
    parseColumn
  );
  const unparsedCrossCloud = element.querySelectorAll(
    '.cross-cloud-menu ul > li > a'
  );
  const [crossCloudMenu, ccmErrors] = parseListAndAccumulateErrors(
    [...unparsedCrossCloud],
    parseLink
  );

  const isSection = element.classList.contains('section');

  return [
    {
      type: "MegaMenu",
      title,
      columns,
      crossCloudMenu,
      isSection
    },
    [
      ...columnErrors,
      ...ccmErrors,
      ...errors
    ]
  ]
};

const ERRORS = {
  elementNull: "Element is null",
  noTitle: "Large Menu has no Title",
};
