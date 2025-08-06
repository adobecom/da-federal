import { MegaMenu } from "./Parse";
import { renderListItems, sanitize } from "../../Utils/Utils";
import { link } from "../Link/Render";

export const renderGhostColumns = (): HTML => `
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
`;

/* 
* We don't render columns immediately
* So that we can deal with the ghost state
* and so on.
*/
      
export const megaMenu = ({
  title,
  crossCloudMenu,
  isSection
}: MegaMenu): HTML => `
  <button type="button"
          aria-expanded="false"
          aria-controls="${sanitize(title)}"
          class="mega-menu"
  >
    ${title}
  </button>
  <div id="${sanitize(title)}" class="feds-popup${isSection ? '' : ' section'}">
    <ul>
    </ul>
    <ul class="cross-cloud-menu">
      ${renderListItems(crossCloudMenu, link)}
    </ul>
  </div>
`
