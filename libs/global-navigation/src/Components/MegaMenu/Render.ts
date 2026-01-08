import { MegaMenu } from "./Parse";
import { sanitize } from "../../Utils/Utils";
import './megaMenu.css';

export const renderGhostTabs = (title: string): HTML => {
  const tab = (): { name: string; description: string } => ({
    name: '',
    description: '',
  });
  const tabs = [0, 1, 2, 3].map(tab);
  return `
  <div class="feds-popup loading" aria-hidden="true">
    <div class="top-bar">
    </div>
    <div class="title">
      <h2>${title}</h2>
    </div>
    <div class="tabs" role="tablist">
      ${tabs.map(({ name, description }, i) => `
        <div class="tab-wrapper">
          <button
          role="tab"
          class="tab"
          aria-selected="false"
          aria-controls="${i}"
          >${name.trim() === '' ? '<div></div>' : name}</button>
          ${description ? `<div class="feds-menu-description">${description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    <div class="tab-content">
    ${tabs.map((_, i) => `
        <div
          id="${i}"
          role="tabpanel"
          aria-labelledby="${i}"
          class="feds-navLink-content"
        >
      <div class="feds-navLink-title"></div>
      <div class="feds-navLink-description"></div>
      </div>`).join('')}
  </div>
  `;
}

/* 
* We don't render columns immediately
* So that we can deal with the ghost state
* and so on.
*/
      
export const megaMenu = ({
  title,
  isSection
}: MegaMenu): HTML => `
  <button type="button"
          aria-expanded="false"
          aria-controls="${sanitize(title)}"
          class="mega-menu feds-link"
          popovertarget="${sanitize(title)}"
  >
    ${title}
  </button>
  <div id="${sanitize(title)}" popover class="feds-popup${isSection ? '' : ' section'}" aria-hidden="true">
    <ul>
    </ul>
  </div>
`
