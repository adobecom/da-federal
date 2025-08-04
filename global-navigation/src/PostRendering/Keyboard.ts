import { setupMobileDesktopListeners } from "../Utils/Utils";

type CleanupFunction = () => void

const initDesktopKeyboardNav = (
  gnav: HTMLElement
): CleanupFunction => {
  return () => console.log(gnav);
};

const initMobileKeyboardNav = (
  gnav: HTMLElement
): CleanupFunction => {
  return () => console.log(gnav);
};

export const initKeyboardNav =  setupMobileDesktopListeners({
  mobileEventListeners: initMobileKeyboardNav,
  desktopEventListeners: initDesktopKeyboardNav,
});
