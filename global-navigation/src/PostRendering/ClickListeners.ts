import { setupMobileDesktopListeners } from "../Utils/Utils";

type CleanupFunction = () => void

const mobileClickListeners = (
  gnav: HTMLElement
): CleanupFunction => {
  return () => console.log(gnav);
};

const desktopClickListeners = (
  gnav: HTMLElement
): CleanupFunction => {
  return () => console.log(gnav);
};

export const initClickListeners = setupMobileDesktopListeners({
  mobileEventListeners: mobileClickListeners,
  desktopEventListeners: desktopClickListeners,
});

