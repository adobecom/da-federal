import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { alternative, getNextSiblings, parseListAndAccumulateErrors } from "../../Utils/Utils";
import { MenuPromo, parseMenuPromo, parseSingleColumnSectionList, SingleColumnSectionList } from "../Column/Parse";
import { Link, parseLink } from "../Link/Parse";

export type SmallMenu = {
  type: "SmallMenu";
  title: string;
  columns: SingleColumnSectionList | List<List<Link>>;
  promo: MenuPromo | null;
};

type ColumnParser = (
  _: Element
) => Parsed<SingleColumnSectionList | List<List<Link>>, RecoverableError>;

export const parseSmallMenu = (
  element: Element | null
): Parsed<SmallMenu, RecoverableError> => {
  const errors = [];
  if (element === null)
    throw new IrrecoverableError(ERRORS.elementNull);

  const h2 = element.querySelector('h2')
  const title = h2?.textContent ?? "";
  if (title === "")
    errors.push(new RecoverableError(ERRORS.noTitle))

  const columnsContainer = ((): Element => {
    if (h2 === null)
      return element;
    const container = document.createElement('div');
    getNextSiblings(h2).forEach(s => container.appendChild(s));
    return container;
  })();
  const [columns, es]
    = alternative(parseSingleColumnSectionList as ColumnParser)
    .or((el) => parseListAndAccumulateErrors(
      [...el.children],
      parseNoTitleColumn
    )).eval(columnsContainer);
  
  const [promo, pes] = ((): Parsed<MenuPromo | null, RecoverableError> => {
    try {
      return parseMenuPromo(element);
    } catch (_) {
      return [null, []];
    }
  })();

  return [
    {
      type: "SmallMenu",
      title,
      columns,
      promo
    },
    [
      ...es,
      ...pes
    ]
  ];
};

const parseNoTitleColumn = (
  element: Element
): Parsed<List<Link>, RecoverableError> => {
  if (element.nodeName !== 'UL')
    throw new Error('');
  const links = [...element.querySelectorAll('ul > li > a')];
  return parseListAndAccumulateErrors(links, parseLink);
};

const ERRORS = {
  elementNull: "The element to be parsed is null",
  noTitle: "Small menu has no title",
}
