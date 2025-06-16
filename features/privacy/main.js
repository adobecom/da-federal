//import { initPrivacy } from './privacy-standalone.js';
import { initPrivacy } from '../../dist/privacy-standalone.min.js';
import { setLibs, getLibs } from '../../scripts/utils.js';

setLibs('/libs'); 
const miloLibs = getLibs();

const utilsModule = await import(`${miloLibs}/utils/utils.js`);
const { getConfig, getMetadata } = utilsModule;

const rawConfig = getConfig ? getConfig() : {};
const config = {
  ...rawConfig,
    privacyId: '7a5eb705-95ed-4cc4-a11d-0cc5760e93db', // or your test domain's OneTrust ID
    codeRoot: '/libs',
    miloLibs
  };
// Start privacy flow automatically!
initPrivacy(config, getMetadata);
document.getElementById('open-privacy').onclick = () =>
  document.dispatchEvent(new CustomEvent('adobePrivacy:OpenModal'));
