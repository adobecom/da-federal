import { Column, ColumnItem, MenuPromo, MultiColumnSection, SingleColumnSection, SingleColumnSectionList } from "./Parse";
import { linkGroup } from "../LinkGroup/Render";
import { link } from "../Link/Render";
import { primaryCTA, secondaryCTA } from "../CTA/Render";
import { renderListItems } from "../../Utils/Utils";

export const column = (
  c: Column
): HTML => {
  switch(c.type) {
    case "SingleColumnSection":
      return singleColumnSection(c);
    case "SingleColumnSectionList":
      return singleColumnSectionList(c);
    case "MultiColumnSection":
      return multiColumnSection(c);
    case "MenuPromo":
      return menuPromo(c);
    default: {
      const exhaustive: never = c;
      console.error(`Unexpected Column Type ${exhaustive}`);
      return "";
    }
  }
}

const singleColumnSection = ({
  title,
  items,
}: SingleColumnSection): HTML => `
<ul>
  ${title === null
    ? ''
    : `<span class="column-section-title">${title}</span>`
  }
  ${renderListItems(items, columnItem)}
</ul>
`;

const singleColumnSectionList = ({
  sections
}: SingleColumnSectionList): HTML => `
  <ul>
    ${renderListItems(sections, singleColumnSection)}
  </ul>
`;

const multiColumnSection = ({
  title,
  columns
}: MultiColumnSection): HTML => `
  <ul>
  ${title === null
    ? ''
    : `<span class="column-section-title">${title}</span>`
  }
  ${renderListItems(
    columns, 
    (columnItemList) => renderListItems(columnItemList, columnItem))
  }
  </ul>
`
export const menuPromo = ({
  content
}: MenuPromo): HTML => content

const columnItem = (
  item: ColumnItem
): HTML => {
  switch (item.type) {
    case "LinkGroupHeader":
    case "LinkGroupLink":
    case "LinkGroupBlue":
      return linkGroup(item);
    case "Link":
      return link(item);
    case "PrimaryCTA":
      return primaryCTA(item);
    case "SecondaryCTA":
      return secondaryCTA(item);
    default: {
      const exhaustive: never = item;
      console.error(`Unexpected ColumnItem type ${exhaustive}`);
      return "";
    }
  }
}
