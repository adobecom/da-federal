import loadPrivacyBanner from '../privacy/privacy-banner.js';
import loadPrivacyModal from '../privacy/privacy-modal.js';

export function initPrivacy(config, getMetadata) {
  loadPrivacyBanner(config, getMetadata);
  document.addEventListener('adobePrivacy:OpenModal', () => {
    loadPrivacyModal(config, getMetadata);
  });
}
export default initPrivacy;