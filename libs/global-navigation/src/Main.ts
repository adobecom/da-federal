import { component } from "./Components/Component";
import { productEntryCTA } from "./Components/CTA/Render";
import { renderGhostTabs} from "./Components/MegaMenu/Render";
import { IrrecoverableError, RecoverableError } from "./Error/Error";
import { GlobalNavigationData, parseNavigation } from "./Parse/Parse";
import { initClickListeners } from "./PostRendering/ClickListeners";
import { initKeyboardNav } from "./PostRendering/Keyboard";
import { loadUnav } from "./PostRendering/Unav/Unav";
import { getInitialHTML } from "./PreRendering/FetchAssets";
import { renderListItems, setMiloConfig, MiloConfig } from "./Utils/Utils";
import './styles/styles.css';
import { tabs } from "./Components/Tab/Render";

// TODO implement Analytics

type GlobalNavigation = {
  closeEverything: () => void;
  reloadUnav: () => void;
  getGnavTopPosition: () => number;
  setGnavTopPosition: (_: number) => void;
  errors: Set<RecoverableError>;
};

export type Input = {
  gnavSource: URL;
  asideSource: URL | null;
  gnavTop?: number;
  isLocalNav: boolean;
  mountpoint: HTMLElement;
  unavEnabled: boolean;
  miloConfig?: MiloConfig;

  getStageDomainMap: (domainmap: unknown[], env: string) =>
    { [key: string]: string }
  // MEP: {
  //   commands: unknown;
  //   handleCommands: (_: unknown) => unknown;
  // }
};

export const main = async (
  input: Input
): Promise<GlobalNavigation | IrrecoverableError> => {
  const { gnavSource, mountpoint, unavEnabled, miloConfig } = input;
  if (!(gnavSource instanceof URL)) {
    throw new IrrecoverableError("gnavSource needs to be a URL object");
  }
  const initial = await getInitialHTML(input);
  if (initial instanceof IrrecoverableError)
    throw initial;
  const { mainNav, aside: _aside } = initial;
  if (mainNav instanceof IrrecoverableError)
    throw mainNav;

  // Initialize MiloConfig with validation
  try {
    setMiloConfig(miloConfig);
  } catch (error) {
    throw new IrrecoverableError(`Failed to initialize MiloConfig: ${error}`);
  }

  const gnavData = parseNavigation(mainNav, unavEnabled);
  if (gnavData instanceof IrrecoverableError)
    throw gnavData;
  
  // TODO: Implement Aside
  
  await renderGnav(gnavData)(mountpoint);

  return postRenderingTasks(input);
};


export const renderGnav = (
  data: GlobalNavigationData
) => async (
mountpoint: HTMLElement
): Promise<HTMLElement> => {
  const navHTML = renderGnavString(data)
  mountpoint.innerHTML = navHTML;
  mountpoint.classList.add('site-pivot');
  const megaMenus = [
    ...mountpoint.querySelectorAll('.mega-menu ~ .feds-popup > ul')
  ]
  megaMenus.forEach(mm => {
    mm.innerHTML = renderGhostTabs(mm.textContent?.trim() ?? '');
  });
  const mmPromises = data.components
    .filter(com => com.type === "MegaMenu")
    .map(com => com.tabs);
  const _errors_ = await Promise.all(mmPromises.map(async (mmPromise, idx) => {
    const [parsedTabs, errors] = await mmPromise;
    const brand = mountpoint.querySelector('.feds-brand-container')?.outerHTML ?? '';
    const title = megaMenus[idx].parentElement?.previousElementSibling?.textContent ?? '';
    const breadcrumbs = mountpoint.querySelector('.breadcrumbs')?.outerHTML ?? '';
    const fedsPopupId = megaMenus[idx].querySelector('.feds-popup')?.id ?? '';
    const isLocalNav = megaMenus.length === 1;
    const renderedTabs = tabs(
      brand,
      title,
      breadcrumbs,
      fedsPopupId,
      isLocalNav
    )(parsedTabs);
    megaMenus[idx].innerHTML = renderedTabs;
    return errors;
  }).flat());
  return mountpoint;
};

export const renderGnavString = ({
  components,
  productCTA,
  unavEnabled,
}: GlobalNavigationData
): string => `
<nav>
  <ul>
    ${((): string => {
      const brandComponent = components.find((c) =>
        c.type === "Brand"
      ) ?? null;
      const menuComponents = components.filter((c) => c.type !== "Brand");
      const toggleButton = `
        <button
          class="feds-nav-toggle"
          type="button"
          aria-label="Navigation menu"
          aria-expanded="false"
          aria-controls="feds-menu-wrapper"
          popovertarget="feds-menu-wrapper"
        >
        </button>
      `.trim();

      const brandHTML = brandComponent ? component(brandComponent) : "";
      const menuItemsHTML = renderListItems(menuComponents, component);

      return `
        <li class="feds-brand-wrapper">
          ${toggleButton}
          ${brandHTML}
        </li>
        <li
          id="feds-menu-wrapper"
          popover
          class="feds-menu-wrapper"
          aria-hidden="true"
        >
          <ul class="feds-gnav-items">
            ${menuItemsHTML}
          </ul>
        </li>
      `.trim();
    })()}
  </ul>
  ${productCTA === null ? '' : productEntryCTA(productCTA)}
  ${unavEnabled ? '<div class="feds-utilities"></div>' : ''}
</nav>
`;


export const postRenderingTasks = async (
  input: Input,
): Promise<GlobalNavigation | IrrecoverableError> => {
  const errors = new Set<RecoverableError>();
  const unav = await loadUnav(input.mountpoint);
  if (unav instanceof RecoverableError)
    errors.add(unav);
  else 
    unav.errors.forEach((error: RecoverableError) => errors.add(error));
  initClickListeners(input.mountpoint);
  initKeyboardNav(input.mountpoint);
  
  const reloadUnav
    = unav instanceof RecoverableError
    ? (): void => {}
    : unav.reloadUnav;

  return {
    closeEverything,
    reloadUnav,
    errors,
    setGnavTopPosition: (_): void => {},
    getGnavTopPosition: (): number => 0,
  };
};

const closeEverything = (): void => {
};

