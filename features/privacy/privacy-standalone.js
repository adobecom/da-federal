(function setCustomPrivacyLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    const customLocation = params.get('customPrivacyLocation');
    if (customLocation) {
      window.sessionStorage.setItem(
        'privacyLocation',
        JSON.stringify({ country: customLocation.toUpperCase() })
      );
    }
  } catch (e) {}
})();

import loadPrivacyBanner from '../privacy/privacy-banner.js';
import loadPrivacyModal from '../privacy/privacy-modal.js';

export function initPrivacy(config, getMetadata) {
  loadPrivacyBanner(config, getMetadata);
  document.addEventListener('adobePrivacy:OpenModal', () => {
    loadPrivacyModal(config, getMetadata);
  });
}
export default initPrivacy;