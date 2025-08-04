import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { alternative, parseListAndAccumulateErrors } from "../../Utils/Utils";
import { MenuPromo, parseMenuPromo, parseSingleColumnSectionList, SingleColumnSectionList } from "../Column/Parse";
import { Link, parseLink } from "../Link/Parse";

export type SmallMenu = {
  type: "SmallMenu";
  columns: SingleColumnSectionList | List<List<Link>>;
  promo: MenuPromo | null;
};

type ColumnParser = (
  _: Element
) => Parsed<SingleColumnSectionList | List<List<Link>>, RecoverableError>;

export const parseSmallMenu = (
  element: Element | null
): Parsed<SmallMenu, RecoverableError> => {
  if (element === null)
    throw new IrrecoverableError(ERRORS.elementNull);

  const [columns, es]
    = alternative(parseSingleColumnSectionList as ColumnParser)
    .or((el) => parseListAndAccumulateErrors(
      [...el.children],
      parseNoTitleColumn
    )).eval(element);
  
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

}
