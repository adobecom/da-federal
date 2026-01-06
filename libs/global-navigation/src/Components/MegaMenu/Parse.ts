import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { fetchAndProcessPlainHTML, inlineNestedFragments, parseListAndAccumulateErrors } from "../../Utils/Utils";
import { parseTab } from "../Tab/Parse";
import { Link, parseLink } from "../Link/Parse";
import { Tab } from "../Tab/Parse";


export type MegaMenu = {
  type: "MegaMenu";
  title: string;
  tabs: Promise<Parsed<List<Tab>, RecoverableError>>;
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

  const tabs = (async (): 
                   Promise<Parsed<List<Tab>, RecoverableError>> => {
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
      const unparsedTabs = [...megaMenuFragment.children]
      const [tabs, errors] = parseListAndAccumulateErrors(
        unparsedTabs,
        parseTab,
      );
      return [tabs.flat(), errors];
    } catch (e) {
        // @ts-expect-error errors usually have a message
        throw new IrrecoverableError(e?.message);
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
      tabs,
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
