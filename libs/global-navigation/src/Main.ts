import { column } from "./Components/Column/Render";
import { component } from "./Components/Component";
import { productEntryCTA } from "./Components/CTA/Render";
import { renderGhostColumns } from "./Components/MegaMenu/Render";
import { IrrecoverableError, RecoverableError } from "./Error/Error";
import { GlobalNavigationData, parseNavigation } from "./Parse/Parse";
import { initClickListeners } from "./PostRendering/ClickListeners";
import { initKeyboardNav } from "./PostRendering/Keyboard";
import { UnavConfig } from "./PostRendering/Unav";
import { getInitialHTML } from "./PreRendering/FetchAssets";
import { renderListItems } from "./Utils/Utils";
import './styles/styles.css';

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
  if (!(input.gnavSource instanceof URL)) {
    throw new IrrecoverableError("gnavSource needs to be a URL object");
  }
  const initial = await getInitialHTML(input)
  if (initial instanceof IrrecoverableError)
    throw initial;
  const { mainNav, aside: _aside } = initial;
  if (mainNav instanceof IrrecoverableError)
    throw mainNav;

  const gnavData = parseNavigation(mainNav);
  if (gnavData instanceof IrrecoverableError)
    throw gnavData;
  
  // TODO: Implement Aside
  
  renderGnav(gnavData)(input.mountpoint);

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
    mm.innerHTML = renderGhostColumns();
  });
  const mmPromises = data.components
    .filter(com => com.type === "MegaMenu")
    .map(com => com.columns);
  const _errors_ = await Promise.all(mmPromises.map(async (mmPromise, idx) => {
    const [columns, errors] = await mmPromise;
    const renderedColumns = renderListItems(columns, column);
    megaMenus[idx].innerHTML = renderedColumns;
    return errors;
  }).flat());
  return mountpoint;
};

export const renderGnavString = ({
  components,
  productCTA,
}: GlobalNavigationData
): string => `
<nav>
  <ul>
    ${renderListItems(components, component)}
  </ul>
  ${productCTA === null ? '' : productEntryCTA(productCTA)}
  <div class="feds-utilities">
  </div>
</nav>
`;


export const postRenderingTasks = (
  input: Input,
): GlobalNavigation | IrrecoverableError => {
  const errors = new Set<RecoverableError>();
  const unav = loadUnav(input.mountpoint);
  if (unav instanceof RecoverableError)
    errors.add(unav);
  else 
    unav.errors.forEach(errors.add);
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
    getGnavTopPosition: (): number => 0
  };
};

type Unav = {
  reloadUnav: (_?: UnavConfig) => void;
  errors: Set<RecoverableError>;
};

const loadUnav = (
  _nav: HTMLElement,
  _config?: UnavConfig
): Unav | RecoverableError => {
  return new RecoverableError("loadUnav has not been implemented yet");
};

const closeEverything = (): void => {
};
