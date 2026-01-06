import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { alternative, getNextSiblings, parseListAndAccumulateErrors, split, takeWhile } from "../../Utils/Utils";
import { parsePrimaryCTA, parseSecondaryCTA, PrimaryCTA, SecondaryCTA } from "../CTA/Parse";
import { Link, parseLink } from "../Link/Parse";
import { LinkGroup, parseLinkGroup } from "../LinkGroup/Parse";

export type Tab = {
  type: "Tab";
  title: string | null;
  CTA: PrimaryCTA | undefined;
  columns: List<List<ColumnItem>> | MenuPromo;
};

// We have to return a list of Tabs here because
// SingleColumnSectionList is essentially a list
// of tabs. A tab is essentially a Column Section
// from the old paradigm
export const parseTab = (
  el: Element
): Parsed<List<Tab>, RecoverableError> => {
  const [parsedColumn, errors] = parseColumn(el);
  return ((): Parsed<Tab[], RecoverableError> => {
    switch (parsedColumn.type) {
      case "SingleColumnSection":
        return [
          [{
            type: "Tab",
            title: parsedColumn.title,
            columns: [parsedColumn.items],
            CTA: getTabCTA(parsedColumn),
          }],
          errors
        ];
      case "SingleColumnSectionList":
        return [
          parsedColumn.sections.flatMap(section => ({
            type: "Tab",
            title: section.title,
            columns: [section.items],
            CTA: getTabCTA(section),
          })),
          errors
        ]
      case "MultiColumnSection":
        return [
          [{
            type: "Tab",
            title: parsedColumn.title,
            columns: parsedColumn.columns,
            CTA: getTabCTA(parsedColumn)
          }],
          errors
        ];
      case "MenuPromo":
        return [
          [{
            type: "Tab",
            title: "More", // TODO: Implement Placeholders
            columns: parsedColumn,
            CTA: undefined
          }],
          errors
        ];
      default: parsedColumn satisfies never; return [[], []];
    }
  })();
};

const getTabCTA = (
  section: SingleColumnSection | MultiColumnSection
): PrimaryCTA | undefined => {
  if (section.type === 'SingleColumnSection') {
    return section.items
      .find(item => item.type === 'PrimaryCTA');
  }
  return section.columns
    .flat()
    .find(item => item.type === 'PrimaryCTA');
}

export type Column
  = SingleColumnSection
  | SingleColumnSectionList
  | MultiColumnSection
  | MenuPromo;

type ColumnParser = (_: Element)
  => Parsed<Column, RecoverableError>;

const parseColumn = (
  el: Element
): Parsed<Column, RecoverableError> =>
  alternative(parseSingleColumnSectionList as ColumnParser)
    .or(parseSingleColumnSection)
    .or(parseMultiColumnSection)
    .or(parseMenuPromo)
    .eval(el);

export type ColumnItem
  = LinkGroup
  | Link
  | PrimaryCTA
  | SecondaryCTA;

const parseColumnItems = (
  items: List<Element>
): Parsed<List<ColumnItem>, RecoverableError> =>
  parseListAndAccumulateErrors(items, (item) =>
    alternative(
      parseLinkGroup as (_: Element) => Parsed<ColumnItem, RecoverableError>)
      .or(parsePrimaryCTA)
      .or(parseSecondaryCTA)
      .or(parseLink)
      .eval(item)
  );

const extractColumnItems = (
  elements: List<Element>
): List<Element> =>
  elements.flatMap(item => {
    if (item.nodeName === 'UL')
      return [...item.querySelectorAll('li > a')];
    return [item];
  });

export type SingleColumnSection = {
  type: "SingleColumnSection";
  title: string | null;
  items: List<ColumnItem>;
};

const parseSingleColumnSection = (
  element: Element
): Parsed<SingleColumnSection, RecoverableError> => {

  if (element.querySelector('.gnav-promo')) 
    throw new Error('This is a promo');

  if (element.querySelector('.column-break'))
    throw new IrrecoverableError("Has a column break");

  const h5 = element.firstElementChild;
  if (h5 === null)
    throw new IrrecoverableError("No Children"); // TODO put this into ERRORS

  const title
    = h5.nodeName === 'H5'
    ? (h5.textContent ?? null)
    : null
  const columnItems
    = h5.nodeName === 'H5'
    ? getNextSiblings(h5)
    : [...element.children];
  const rawLinks = extractColumnItems(columnItems);
  const [items, es] = parseColumnItems(rawLinks);

  return [
    {
      type: "SingleColumnSection",
      title,
      items
    },
    es
  ];
}

export type SingleColumnSectionList = {
  type: "SingleColumnSectionList";
  sections: List<SingleColumnSection>;
};

export const parseSingleColumnSectionList = (
  element: Element
): Parsed<SingleColumnSectionList, RecoverableError> => {
  if (element.querySelector('.column-break'))
    throw new IrrecoverableError("Has a column break");

  const h5s = [...element.querySelectorAll('h5')];
  if (h5s.length <= 1)
    throw new IrrecoverableError("Not a section list");

  const parseSection = (
    h5: Element
  ): Parsed<SingleColumnSection, RecoverableError> => {
    const container = document.createElement('div');
    const listItems = 
      takeWhile(
        (x: Element) =>
          x.nodeName !== 'H5')(getNextSiblings(h5));
    container.append(h5, ...listItems);
    return parseSingleColumnSection(container);
  };
  const [sections, es]
    = parseListAndAccumulateErrors(h5s, parseSection);

  return [
    {
      type: "SingleColumnSectionList",
      sections
    },
    es
  ];
};

export type MultiColumnSection = {
  type: "MultiColumnSection";
  title: string;
  columns: List<List<ColumnItem>>;
};

const parseMultiColumnSection = (
  element: Element
): Parsed<MultiColumnSection, RecoverableError> => {
  if (!element.querySelector('.column-break'))
    throw new IrrecoverableError("Expected a Column Break");
  const h5 = element.firstElementChild;
  if (h5 === null || h5.nodeName !== 'H5')
    throw new IrrecoverableError(ERRORS.expectedH5);
  const title = h5.textContent;
  if (title === '' || title === null)
    throw new IrrecoverableError(ERRORS.emptyTitle);

  const isColumnBreak = (x: Element): boolean =>
    x.classList.contains('column-break')
  const rawColumns =
    split(isColumnBreak)(getNextSiblings(h5))
      .map(extractColumnItems);
  const [columns, es] =
    parseListAndAccumulateErrors(rawColumns, parseColumnItems);

  return [
    {
      type: "MultiColumnSection",
      title,
      columns
    },
    es
  ];
};

export type MenuPromo = {
  type: "MenuPromo";
  content: HTML;
};

export const parseMenuPromo = (
  element: Element | null
): Parsed<MenuPromo, RecoverableError> => {
  if (element === null)
    throw new IrrecoverableError(ERRORS.elementNull);
  // TODO: Should gnav-image be treated differently?
  const promo = element.querySelector('.gnav-promo, .gnav-image');
  if (promo === null)
    throw new IrrecoverableError(ERRORS.noPromo);
  const content = promo.innerHTML ?? '';
  if (content === '')
    throw new IrrecoverableError(ERRORS.noPromoContent);
  return [
    {
      type: "MenuPromo",
      content
    },
    []
  ]
};

const ERRORS = {
  expectedH5: "Expected an H5 element for the title ",
  emptyTitle: "Expected Title to not be empty",
  elementNull: "Element is null",
  noPromo: "Promo or gnav image not found",
  noPromoContent: "Promo Content not found",
};
