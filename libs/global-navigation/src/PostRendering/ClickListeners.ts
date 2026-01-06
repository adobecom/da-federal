import { setupMobileDesktopListeners, zip } from "../Utils/Utils";

type CleanupFunction = () => void

const mobileClickListeners = (
  gnav: HTMLElement
): CleanupFunction => {
  const tabButtons = [...gnav.querySelectorAll('.tabs > button[role="tab"]')];
  const tabPanels = [...gnav.querySelectorAll('.tab-content > div')];
  const tabButtonClickCallbacks = tabButtons.map((button, i) => (): void => {
      tabButtons.forEach(tabButton => {
        tabButton.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(tabPanel => {
        tabPanel.setAttribute('hidden', 'true');
      });
      tabPanels[i]?.removeAttribute('hidden');
      button.setAttribute('aria-selected', 'true');
    }
  );
  tabButtons.forEach((button, i) => {
    button.addEventListener('click', tabButtonClickCallbacks[i]);
  });
  return () => {
    tabButtons.forEach((button, i) => {
      button.removeEventListener('click', tabButtonClickCallbacks[i]);
    });
  };
};

const desktopClickListeners = (
  gnav: HTMLElement
): CleanupFunction => {
  return () => console.log(gnav);
};

export const initClickListeners = mobileClickListeners

