import privacyState from './privacy-state.js';
import getUserLocation from './utilities/helpers/getUserLocation.js';
import getPropertySafely from './utilities/lang/getPropertySafely.js';
import isInSensitiveGroup from './utilities/helpers/isInSensitiveGroup.js';
import isGPCEnabled from './utilities/helpers/isGPCEnabled.js';
import { loadStyle } from './utilities/utilities.js';
import { createTag } from './utilities/utilities.js';
import { loadOneTrustScriptOnce } from './utilities/utilities.js';

// Helper: fetch OneTrust config
async function getOneTrustConfig(otDomainId) {
  if (!otDomainId) return null;
  try {
    const resp = await fetch(`https://cdn.cookielaw.org/consent/${otDomainId}/${otDomainId}.json`, { cache: 'no-cache' });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

function isGdprEnforcedCountry(location, config) {
  if (!location?.country || !config?.RuleSet) return true;
  const country = location.country.toLowerCase();
  const rules = config.RuleSet.filter((rule) =>
    Array.isArray(rule.Countries) && rule.Countries.includes(country) && !rule.Global
  );
  return !!rules.length;
}

async function getInitialConsent({ isGdpr, userProfileTags = [] }) {
  // Always enable strictly necessary cookies
  if (isGdpr) return ['C0001'];

  // For non-GDPR regions:
  if (isGPCEnabled()) return ['C0001', 'C0002', 'C0003']; // Exclude advertising if GPC is enabled

  const [isSensitive] = isInSensitiveGroup(userProfileTags);
  if (isSensitive) return ['C0001', 'C0002', 'C0003']; // Exclude advertising for sensitive groups

  // Otherwise, enable all
  return ['C0001', 'C0002', 'C0003', 'C0004'];
}

async function fetchBannerData(config) {
  const url1 = `${config.contentRoot ?? ''}/privacy/privacy-banner.json`;
  const url2 = 'https://stage--federal--adobecom.aem.page/federal/dev/snehal/privacy/privacy-banner.json';
  try {
    let resp = await fetch(url2, { cache: 'no-cache' });
    if (!resp.ok) resp = await fetch(url1, { cache: 'no-cache' });
    if (resp.ok) {
      const json = await resp.json();
      if (json?.data?.[0]) return json.data[0];
    }
  } catch {}
  // Fallback
  return {
    title: 'DefaultTitle',
    description: 'DefaultDescription',
  };
}

export default async function loadPrivacyBanner(config, getMetadata) {
  // Support custom location for local/dev testing
  const urlParams = new URLSearchParams(window.location.search);
  const customLocation = urlParams.get('customPrivacyLocation');
  if (customLocation) {
    const locationData = JSON.stringify({ country: customLocation.toUpperCase() });
    window.sessionStorage.setItem(config.location, locationData);
  }

  if (document.querySelector('.privacy-banner')) return;
  
    // const cssUrl = new URL('./privacy-banner.css', import.meta.url).href;
   //const codeRoot = "https://acomprivacyot--federal--adobecom.aem.page";
   //const cssUrl = `${codeRoot}/features/privacy/privacy-banner.css`
    // loadStyle(cssUrl);
    //this works in bundle but not in local
  // import ('./privacy-banner.css');
  //   loadStyle(new URL('./privacy-banner.css', import.meta.url).href);
  try {
    await import('./privacy-banner.css');
  } catch {
    loadStyle(new URL('./privacy-banner.css', import.meta.url).href);
  }


  if (privacyState.hasExistingConsent()) return;

  // GEO/CONFIG/PROFILE/GPC LOGIC
  const otDomainId = config.privacyId || (config.privacy && config.privacy.otDomainId);
  const location = await getUserLocation();
  const otConfig = await getOneTrustConfig(otDomainId);
  const isGdpr = isGdprEnforcedCountry(location, otConfig);

  const userProfileTags = [];

  const initialConsent = await getInitialConsent({ isGdpr, userProfileTags });

  // Set implicit consent for non-GDPR
  if (!isGdpr && !privacyState.hasExistingConsent()) {
    privacyState.setImplicitConsent();
  }

  // Show banner only if GDPR consent is required
  const showBanner = isGdpr;
  if (!showBanner) {
    privacyState.setImplicitConsent(); // For non-GDPR
    return;
  }

  // Set default consent if not already set (usually C0001)
  if (!privacyState.hasExistingConsent()) {
    privacyState.setConsent(['C0001']);
  }

  const bannerData = await fetchBannerData(config);

  const banner = createTag('div', { class: 'privacy-banner', role: 'region', 'aria-label': 'Cookie banner' });
  const wrap = createTag('div', { class: 'privacy-banner-wrap' });

  const content = createTag('div', { class: 'privacy-banner-content' });
  content.append(
    createTag('h2', { class: 'privacy-banner-title' }, bannerData.title),
    createTag('div', { class: 'privacy-banner-desc' }, bannerData.description)
  );

  const btnRow = createTag('div', { class: 'privacy-banner-actions' });
  const btnSettings = createTag('button', { class: 'privacy-banner-btn settings', type: 'button' }, 'Cookie Settings');
  const btnGroup = createTag('div', { class: 'privacy-banner-action-group' });
  const btnReject = createTag('button', { class: 'privacy-banner-btn reject', type: 'button' }, "Don't Enable");
  const btnAccept = createTag('button', { class: 'privacy-banner-btn accept', type: 'button' }, 'Enable all');
  btnGroup.append(btnReject, btnAccept);
  btnRow.append(btnSettings, btnGroup);

  wrap.append(content, btnRow);
  banner.append(wrap);

  btnAccept.onclick = async () => {
    privacyState.setConsent(initialConsent);

    const otDomainId = config.privacyId || (config.privacy && config.privacy.otDomainId);
    await loadOneTrustScriptOnce(otDomainId);
    if (window.OneTrust && typeof window.OneTrust.AcceptAll === "function") {
      window.OneTrust.AcceptAll();
    }

    banner.remove();
  };
  btnReject.onclick = async () => {
    privacyState.setConsent(['C0001']);

    const otDomainId = config.privacyId || (config.privacy && config.privacy.otDomainId);
    await loadOneTrustScriptOnce(otDomainId);
    if (window.OneTrust && typeof window.OneTrust.RejectAll === "function") {
      window.OneTrust.RejectAll();
    }

    banner.remove();
  };
  btnSettings.onclick = () => {
    document.dispatchEvent(new CustomEvent('adobePrivacy:OpenModal'));
    banner.remove();
  };

  document.body.append(banner);
}
