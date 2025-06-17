/* config */
const categories = ['C0001', 'C0002', 'C0003', 'C0004'];
const categoriesDefault = categories[0];
const configEndpoint = 'https://cdn.cookielaw.org/consent/';
const id = 'onetrust';
const location = 'feds_location';
const locationURL = 'https://geo2.adobe.com/json/?callback=';
const url = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';

/* restrictions */
const imsTimeout = 3000;
const userTags = {
    age: ['agegroup_under13', 'agegroup_13_15', 'agegroup_16_17'],
    edu: ['edu', 'edu_k12', 'edu_hed', 'edu_student'],
};
const modes = {
    gpc: 'GPC',
    group: 'User Group',
    user: 'User Initiated',
};

/* cookies */
const interaction = 'OptanonAlertBoxClosed';
const consent = 'OptanonConsent';

/* selectors */
const banner = '#onetrust-banner-sdk';
const bannerAccept = `${banner} #onetrust-accept-btn-handler`;
const bannerClose = '#ot-banner-close';
const bannerCustomize = `${banner} #onetrust-pc-btn-handler`;
const bannerIcon = '#ot-cookie-button';
const bannerReject = `${banner} #onetrust-reject-all-handler`;
const buttonGroup = `${banner} #onetrust-button-group`;
const preferenceCenter = '#onetrust-pc-sdk';
const preferenceCenterTitle = `${preferenceCenter} #pc-title`;
const preferenceCenterAccept = `${preferenceCenter} .enable-all-btn`;
const preferenceCenterAlwaysActive = `${preferenceCenter} #first-party-cookies-domain`;
const preferenceCenterCheckboxes = `${preferenceCenter} .switch-checkbox`;
const preferenceCenterClose = `${preferenceCenter} .pc-close-button`;
const preferenceCenterConfirm = `${preferenceCenter} .pc-save-and-close`;
const preferenceCenterFaqs = `${preferenceCenter} .ot-general-question`;
const preferenceCenterReject = `${preferenceCenter} .disable-all-btn`;
const preferenceCenterViewCookies = `${preferenceCenter} .host-item > input`;
const toastNotification = '#ot-cookie-settings';
const toastNotificationClose = `${toastNotification} .cs-close`;
const toastNotificationManage = `${toastNotification} .ot-sdk-show-settings`;
const wrapper = '#onetrust-consent-sdk';
const backdrop = `${wrapper} .onetrust-pc-dark-filter`;
const holdBanner = 'hold-banner';

/* events */
const privacyConsent = 'adobePrivacy:PrivacyConsent';
const privacyConsentCustom = 'adobePrivacy:PrivacyCustom';
const privacyReject = 'adobePrivacy:PrivacyReject';
const oneTrustReady = 'feds.events.oneTrustReady';

export default {
    categories,
    categoriesDefault,
    configEndpoint,
    id,
    location,
    locationURL,
    url,
    events: {
        privacyConsent,
        privacyConsentCustom,
        privacyReject,
        oneTrustReady,
    },
    cookies: {
        consent,
        interaction,
    },
    selectors: {
        banner,
        bannerAccept,
        bannerClose,
        bannerCustomize,
        bannerIcon,
        bannerReject,
        buttonGroup,
        preferenceCenter,
        preferenceCenterTitle,
        preferenceCenterAccept,
        preferenceCenterAlwaysActive,
        preferenceCenterCheckboxes,
        preferenceCenterClose,
        preferenceCenterConfirm,
        preferenceCenterFaqs,
        preferenceCenterReject,
        preferenceCenterViewCookies,
        holdBanner,
        toastNotification,
        toastNotificationClose,
        toastNotificationManage,
        wrapper,
        backdrop,
    },
    restrictions: {
        imsTimeout,
        userTags,
        modes,
    },
};