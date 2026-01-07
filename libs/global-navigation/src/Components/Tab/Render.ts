import { ColumnItem, MenuPromo, Tab } from "./Parse";
import { linkGroup } from "../LinkGroup/Render";
import { link } from "../Link/Render";
import { primaryCTA, secondaryCTA } from "../CTA/Render";
import { renderListItems } from "../../Utils/Utils";

export const tabs = (
  brand: HTML,
  title: string,
  breadcrumbs: HTML,
  fedsPopupId: string,
  isLocalNav: boolean
) => (
  ts: List<Tab>,
): HTML => `
  <div class="top-bar">
    ${isLocalNav ? brand : '' /* TODO placeholders */}
  </div>
  <div class="title">
    ${breadcrumbs || '<div class="breadcrumbs"></div>'}
    <h2 id="${fedsPopupId}-title">${title}</h2>
  </div>
  <div class="tabs" role="tablist">
    ${ts.map((t, i) => `
      <button
        role="tab"
        class="tab"
        aria-selected="false"
        aria-controls="${i}"
      >
        ${t.title === '' ? '<div></div>' : t.title}
      </button>
    `).join('')}
  </div>
  <div class="tab-content">
    ${ts.map((t, i) => {
      return `
      <div
        id="${i}"
        role="tabpanel"
        class="${Array.isArray(t.columns) &&
          t.columns
           .flat()
           .some(item => item.type === "LinkGroupHeader")
          ? "has-subheader"
          : ""
        }"
        hidden
      >
        <ul>
        ${Array.isArray(t.columns)
          ? renderListItems(t.columns, links => `
                              <ul>
                                ${renderListItems(
                                  links.filter(l => 
                                      l.type !== 'PrimaryCTA'),
                                  columnItem
                                )}
                              </ul>
                            `)
          : t.columns.content}
        </ul>
        <div class="sticky-cta">
          ${t.CTA ? columnItem(t.CTA) : ''}
        </div>
      </div>
    `.trim();
    }).join('')
  }
  </div>
`.trim();

export const menuPromo = ({
  content
}: MenuPromo): HTML => content

export const columnItem = (
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
      item satisfies never;
      return "";
    }
  }
}
