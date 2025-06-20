// libs/features/privacy/privacy-state.js

import getCookieValue from './utilities/cookie/getCookieValue.js';
import setCookieValue from './utilities/cookie/setCookieValue.js';
import extractRootDomain from './utilities/helpers/extractRootDomain.js';
import uuid from './utilities/helpers/uuid.js';

const CONSENT_COOKIE = 'OptanonConsent';
const INTERACTION_COOKIE = 'OptanonAlertBoxClosed';
const CATEGORIES_DEFAULT = 'C0001';
const CATEGORIES_ALL = ['C0001', 'C0002', 'C0003', 'C0004'];

function parseConsentCookie(cookie) {
  // Example: "groups=C0001:1,C0002:1,C0003:0&..."
  const active = [];
  const available = [];
  if (!cookie) return [active, available];
  let consent = cookie.split('groups=')[1] || '';
  [consent] = consent.split('&');
  consent.split(',').forEach((group) => {
    if (group.endsWith(':1')) {
      const cat = group.replace(':1', '');
      active.push(cat);
      available.push(cat);
    } else if (group.endsWith(':0')) {
      available.push(group.replace(':0', ''));
    }
  });
  return [active, available];
}

function buildConsentCookie(groups, { isGpcEnabled = 0 } = {}) {
  let consentId = localStorage.getItem('OptanonConsentId');
  if (!consentId) {
    consentId = uuid();
    localStorage.setItem('OptanonConsentId', consentId);
  }
  const datestamp = encodeURIComponent(new Date().toString());
  const landingPath = encodeURIComponent(window.location.pathname);
  const groupsStr = CATEGORIES_ALL
    .map((cat) => `${cat}:${groups.includes(cat) ? 1 : 0}`)
    .join('%2C');
  return [
    `isGpcEnabled=${isGpcEnabled}`,
    `datestamp=${datestamp}`,
    'version=202311.1.0',
    `consentId=${consentId}`,
    'interactionCount=1',
    `landingPath=${landingPath}`,
    `groups=${groupsStr}`
  ].join('&');
}

function fireEvent(name, detail = {}) {
  window.dispatchEvent(new CustomEvent(`adobePrivacy:${name}`, { detail }));
}
function getConsent() {
  const cookieValue = getCookieValue(CONSENT_COOKIE);
  const decoded = decodeURIComponent(cookieValue || '');
  return parseConsentCookie(decoded);
}

function hasExistingConsent() {
  const cookie = getCookieValue(INTERACTION_COOKIE);
  if (!cookie) return false;
  const date = Date.parse(cookie);
  if (!date || isNaN(date)) return false;
  const [active] = getConsent();
  return active.length > 0;
}

function hasFullConsent() {
  const [active, available] = getConsent();
  return hasExistingConsent() && active.length && active.length === available.length;
}

function hasCustomConsent() {
  const [active, available] = getConsent();
  const isReject = (active.length === 1 && active[0] === CATEGORIES_DEFAULT);
  return hasExistingConsent() && active.length && active.length !== available.length && !isReject;
}

function fireConsentEvent() {
  if (!hasExistingConsent()) return;
  const [active, available] = getConsent();
  if (hasFullConsent()) {
    fireEvent('PrivacyConsent', { active, available });
  } else if (hasCustomConsent()) {
    fireEvent('PrivacyCustom', { active, available });
  } else {
    fireEvent('PrivacyReject', { active, available });
  }
}

function updateOneTrustRuntime(groups = []) {
  const formatted = `,${groups.join(',')},`;

  function write(val) {
    window.OptanonActiveGroups  = val;
    window.OneTrustActiveGroups = val;
  }

  write(formatted);                         
  window._desiredOTGroups = formatted;

  if (!window._otPatchApplied) {
    window._otPatchApplied = true;

    ['OptanonActiveGroups', 'OneTrustActiveGroups'].forEach((prop) => {
      let internal = window[prop]; 

      Object.defineProperty(window, prop, {
        configurable: true,
        enumerable: true,
        get()  { return internal; },
        set(v) {
          internal = window._desiredOTGroups || v;
        }
      });
    });
  }
  if (window.OneTrust) {
    window.OneTrust.activeGroups = groups;
  }
}

function attachOneTrustSyncHook() {
  if (
    window.OneTrust &&
    typeof window.OneTrust.OnConsentChanged === 'function' &&
    !window._otSyncHookAdded
  ) {
    window._otSyncHookAdded = true;
    window.OneTrust.OnConsentChanged(() => {
      try {
        const [active] = getConsent();        // read fresh from cookie
        updateOneTrustRuntime(active);
      } catch (e) {
        console.warn('[Privacy] Sync-hook failed:', e);
      }
    });
  }
}

function setConsent(groups) {
  const domain      = `.${extractRootDomain(window.location.hostname)}`;
  const cookieValue = buildConsentCookie(groups);
  const expiration  = new Date();
  expiration.setFullYear(expiration.getFullYear() + 1);

  setCookieValue(CONSENT_COOKIE,     cookieValue,              { path: '/', domain, expiration });
  setCookieValue(INTERACTION_COOKIE, expiration.toISOString(), { path: '/', domain, expiration });

  updateOneTrustRuntime(groups);
  attachOneTrustSyncHook();

  if (window.OneTrust && typeof window.OneTrust.SaveConsent === 'function') {
    try { window.OneTrust.SaveConsent(); } catch (_) { /* silent */ }
  }
  updateOneTrustRuntime(groups);
  setTimeout(() => updateOneTrustRuntime(groups), 0);
  markConsentAvailable();
  fireConsentEvent();
}

function setImplicitConsent() {
  setConsent(CATEGORIES_ALL);
}
function on(event, cb) {
  window.addEventListener(`adobePrivacy:${event}`, cb);
}

const privacyState = {
  getConsent,
  setConsent,
  hasExistingConsent,
  hasFullConsent,
  hasCustomConsent,
  setImplicitConsent,
  on,
};

privacyState.activeCookieGroups = () => privacyState.getConsent()[0];
function markConsentAvailable() {
  if (!performance.getEntriesByName('Privacy-Consent-Available').length) {
    performance.mark('Privacy-Consent-Available');
    performance.measure('Privacy-Time-To-Consent', 'navigationStart', 'Privacy-Consent-Available');
  }
}
window.adobePrivacy = privacyState;
export default privacyState;
