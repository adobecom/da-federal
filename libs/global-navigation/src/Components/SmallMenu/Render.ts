import { renderListItems, sanitize } from "../../Utils/Utils";
import { SingleColumnSectionList } from "../Column/Parse";
import { column, menuPromo } from "../Column/Render";
import { Link } from "../Link/Parse";
import { link } from "../Link/Render";
import { SmallMenu } from "./Parse";

export const smallMenu = ({
  title,
  columns,
  promo
}: SmallMenu): HTML => `
  <button type="button"
          aria-expanded="false"
          aria-controls="${sanitize(title)}"
  >
    ${title}
  </button>
  <div class="feds-popup" id="${sanitize(title)}">
    ${smallMenuList(columns)}
    ${promo === null ? '' : `<li>${menuPromo(promo)}</li>`}
  </div>
`;

const smallMenuList = (
  c: SingleColumnSectionList | List<List<Link>>
): HTML => {
  if (!Array.isArray(c) && c?.type === "SingleColumnSectionList")
    return column(c);
  return `
  <ul>
    ${renderListItems(c as List<List<Link>>, (l) => `
      <ul>
        ${renderListItems(l, link)}
      </ul>
    `)}
  </ul>
  `;
}
