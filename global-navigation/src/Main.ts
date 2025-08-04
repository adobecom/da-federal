import { IrrecoverableError, RecoverableError } from "./Error/Error";
import { GlobalNavigationData, parseNavigation } from "./Parse/Parse";
import { initClickListeners } from "./PostRendering/ClickListeners";
import { initKeyboardNav } from "./PostRendering/Keyboard";
import { UnavConfig } from "./PostRendering/Unav";
import { getInitialHTML } from "./PreRendering/FetchAssets";


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
};

export const main = async (
  input: Input
): Promise<GlobalNavigation | IrrecoverableError> => {
  const initial = await getInitialHTML(input)
  if (initial instanceof IrrecoverableError)
    return initial;
  const { mainNav, aside: _aside } = initial;
  if (mainNav instanceof IrrecoverableError)
    return mainNav;

  const gnavData = parseNavigation(mainNav);
  if (gnavData instanceof IrrecoverableError)
    return gnavData;
  
  // TODO: Implement Aside
  
  renderGnav(gnavData)(input.mountpoint);

  return postRenderingTasks(input);
};


export const renderGnav = (
  _data_: GlobalNavigationData
) => (
_mountpoint: HTMLElement
): 1 | IrrecoverableError => {
  return new IrrecoverableError("Not yet implemented");
};

export const renderGnavString = (
  _data: GlobalNavigationData
): string => '';


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
