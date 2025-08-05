import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { fetchAndProcessPlainHTML, inlineNestedFragments, parseListAndAccumulateErrors } from "../../Utils/Utils";
import { Column, parseColumn } from "../Column/Parse";
import { Link, parseLink } from "../Link/Parse";


export type MegaMenu = {
  type: "MegaMenu";
  title: string;
  columns: Promise<Parsed<List<Column>, RecoverableError>>;
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

  const columns = (async (): 
                   Promise<Parsed<List<Column>, RecoverableError>> => {
    try {
      const fragment: HTMLAnchorElement | null = element.querySelector('h2 > a');
      const fragmentURL = new URL(fragment?.href ?? "");
      const initialFragment =
        await fetchAndProcessPlainHTML(fragmentURL);
      if (initialFragment instanceof IrrecoverableError)
        throw new Error(initialFragment.message);
      const megaMenuFragment = await inlineNestedFragments(initialFragment);
      if (megaMenuFragment instanceof IrrecoverableError)
        throw new Error(megaMenuFragment.message);
      const unparsedColumns = [...megaMenuFragment.children]
        .map(c => c.querySelector('main')?.firstElementChild)
        .filter(c => c !== null && c !== undefined);
      console.log(unparsedColumns[0].outerHTML);
      console.log(unparsedColumns[1].outerHTML);
      debugger;
      return parseListAndAccumulateErrors(
        unparsedColumns,
        parseColumn
      );
    } catch (e) {
        throw new IrrecoverableError(JSON.stringify(e));
    }
  })();
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
      ...ccmErrors,
      ...errors
    ]
  ]
};

const ERRORS = {
  elementNull: "Element is null",
  noTitle: "Large Menu has no Title",
};
