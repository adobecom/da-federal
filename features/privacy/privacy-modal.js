import privacyState from './privacy-state.js';
//import { setLibs, getLibs } from '../../scripts/utils.js';
import { loadStyle } from './utilities/utilities.js';
import { createTag } from './utilities/utilities.js';
import { loadOneTrustScriptOnce } from './utilities/utilities.js';

//setLibs('/libs');
//const miloLibs = getLibs();

function fragment(children) {
  const frag = document.createDocumentFragment();
  children.forEach(child => frag.appendChild(child));
  return frag;
}

const getValue = (arr, key) => arr?.data?.find((row) => row.key === key)?.value || '';

function collectConsentFromModal(modalContent) {
  const checkboxes = modalContent.querySelectorAll('.privacy-modal-cookiegroup input[type="checkbox"]:not(:disabled)');
  const checked = Array.from(checkboxes)
    .map((cb) => (cb.checked ? cb.closest('.privacy-modal-cookiegroup').dataset.cat : null))
    .filter(Boolean);
  if (!checked.includes('C0001')) checked.unshift('C0001');
  return checked;
}

function createAccordion(accordion, createTag) {
  const accWrap = createTag('div', { class: 'privacy-modal-accordion' });
  accordion.data.forEach((section) => {
    const item = createTag('div', { class: 'privacy-modal-accordion-item' });
    const header = createTag('button', { class: 'privacy-modal-accordion-header', type: 'button' }, section.heading);
    const body = createTag('div', { class: 'privacy-modal-accordion-body' }, section.description);
    header.onclick = () => item.classList.toggle('open');
    item.append(header, body);
    accWrap.appendChild(item);
  });
  return accWrap;
}

function createEnableInfo({ data = [] }, createTag) {
  const infoWrap = createTag('div', { class: 'privacy-modal-enableinfo' });
  const ei = data[0];
  if (!ei) return infoWrap;
  const makeList = (bullets) => (bullets ? bullets.split('\n').map((b) => createTag('li', null, b)) : [createTag('li', null, 'No bullets found!')]);
  const enabled = createTag('div', { class: 'privacy-modal-enabled' }, [
    createTag('h4', null, ei.enabled_heading),
    createTag('ul', null, fragment(makeList(ei.enabled_bullets))),
  ]);
  const disabled = createTag('div', { class: 'privacy-modal-disabled' }, [
    createTag('h4', null, ei.disabled_heading),
    createTag('ul', null, fragment(makeList(ei.disabled_bullets))),
  ]);
  infoWrap.append(enabled, disabled);
  return infoWrap;
}

function createCookieGroups(cookiegroups, createTag) {
  const activeConsent = privacyState.activeCookieGroups();
  const groupsWrap = createTag('div', { class: 'privacy-modal-cookiegroups' });
  cookiegroups.data.forEach((group, i) => {
    const cat = group.category || `C000${i + 1}`;
    const groupDiv = createTag('div', { class: 'privacy-modal-cookiegroup', 'data-cat': cat });
    const groupHeader = createTag('div', { class: 'privacy-modal-cookiegroup-header' });

    const inputAttrs = {
      type: 'checkbox',
      'aria-label': group.group_heading,
    };
    if (activeConsent.includes(cat)) inputAttrs.checked = true;
    if (group.always_active === 'true') inputAttrs.disabled = true;
    groupHeader.append(
      createTag('span', { class: 'privacy-modal-cookiegroup-title' }, group.group_heading),
      createTag('input', inputAttrs),
    );

    const desc = createTag('div', { class: 'privacy-modal-cookiegroup-desc' }, group.group_description);
    const link = createTag('a', {
      class: 'privacy-modal-cookiegroup-link',
      href: group.details_link_u,
      target: '_blank',
      rel: 'noopener noreferrer',
    }, group.details_link_text);
    groupDiv.append(groupHeader, desc, link);
    groupsWrap.appendChild(groupDiv);
  });
  return groupsWrap;
}

function showPrivacyToaster() {
  if (document.querySelector('.privacy-toast')) return;
  const toaster = document.createElement('div');
  toaster.className = 'privacy-toast';
  toaster.textContent = 'Your privacy preferences have been saved.';
  document.body.appendChild(toaster);
  setTimeout(() => toaster.remove(), 3000);
}

function buildModalContent(json, createTag) {
  const { privacy, enableinfo, accordion, actions, cookiegroups } = json;
  const wrap = createTag('div', {
    class: 'privacy-modal-content',
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': 'privacy-modal-title',
  });

  wrap.append(
    createTag('h2', { id: 'privacy-modal-title' }, getValue(privacy, 'modal_title')),
    createTag('h3', null, getValue(privacy, 'main_heading')),
    createAccordion(accordion, createTag),
    createEnableInfo(enableinfo, createTag),
    createCookieGroups(cookiegroups, createTag),
  );

  return wrap;
}

function showModal(content, {
  id = 'privacy-modal-v2',
  className = 'privacy-modal-v2',
  closeEvent = 'closePrivacyModal'
} = {}) {
  // Remove existing modal/curtain
  document.getElementById(id)?.remove();
  document.querySelector('.modal-curtain')?.remove();

  const modal = document.createElement('div');
  modal.id = id;
  modal.className = `${className} dialog-modal`;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.tabIndex = -1;
  modal.append(content);

  const curtain = document.createElement('div');
  curtain.className = 'modal-curtain is-open';

  function closeModal() {
    modal.remove();
    curtain.remove();
    document.body.classList.remove('disable-scroll');
    window.dispatchEvent(new Event(closeEvent));
  }

  curtain.onclick = (e) => { if (e.target === curtain) closeModal(); };

  const closeBtn = document.createElement('button');
  closeBtn.className = 'dialog-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => closeModal();
  modal.prepend(closeBtn);
  document.body.appendChild(modal);
  modal.insertAdjacentElement('afterend', curtain);
  modal.focus();
  modal.onkeydown = (e) => { if (e.key === 'Escape') closeModal(); };
  document.body.classList.add('disable-scroll');

  return closeModal;
}

function createActions(actions, modalContent, cookiegroups, createTag) {
  const actionsDiv = createTag('div', { class: 'privacy-modal-actions' });
  let confirmBtn;
  actions.data.forEach((action) => {
    const btn = createTag('button', {
      class: `privacy-modal-action${action.primary === 'true' ? ' primary' : ''}`,
      'data-action': action.action,
      type: 'button',
      disabled: action.action === 'confirm' ? true : undefined,
    }, action.label);
    if (action.action === 'confirm') confirmBtn = btn;
    actionsDiv.appendChild(btn);
  });

  // Confirm button enable/disable on checkbox change
  if (confirmBtn && modalContent) {
    const checkboxes = modalContent.querySelectorAll('.privacy-modal-cookiegroup input[type="checkbox"]:not(:disabled)');
    const initialState = Array.from(checkboxes).map(cb => cb.checked);
    checkboxes.forEach((cb, idx) => {
      cb.addEventListener('change', () => {
        const changed = Array.from(checkboxes).some((c, i) => c.checked !== initialState[i]);
        confirmBtn.disabled = !changed;
      });
    });
  }
  return actionsDiv;
}

async function fetchPrivacyJson(config, getFederatedContentRoot) {
  const root = config.contentRoot ?? getFederatedContentRoot();
  const url1 = `${root}/privacy/privacy.json`;
  const url2 = 'https://stage--federal--adobecom.aem.page/federal/dev/snehal/privacy/privacy-modal.json';
  let resp = await fetch(url2, { cache: 'no-cache' });
  if (resp.ok) return resp.json();
  resp = await fetch(url1, { cache: 'no-cache' });
  if (resp.ok) return resp.json();
  throw new Error('Privacy JSON not found');
}

export default async function loadPrivacyModal(config, getMetadata) {
  // const utilsModule = await import('../../scripts/utils.js');
  // const getLibs = utilsModule.getLibs;
  // const miloLibs = getLibs('/libs');
  // const { getFederatedContentRoot } = await import(`${miloLibs}/utils/utils.js`);
  const miloLibs = '';
  const getFederatedContentRoot = () => '';

  if (document.querySelector('.privacy-modal-backdrop')) return;

    // const codeRoot = "https://acomprivacyot--federal--adobecom.aem.page";
    // const cssUrl = `${codeRoot}/features/privacy/privacy-modal.css`
    // loadStyle(cssUrl);
    // import('./privacy-modal.css');
    // loadStyle(new URL('./privacy-modal.css', import.meta.url).href);
    
  try {
    await import('./privacy-modal.css');
  } catch {
    loadStyle(new URL('./privacy-modal.css', import.meta.url).href);
  }


  let privacyJson;
  try {
    privacyJson = await fetchPrivacyJson(config, getFederatedContentRoot);
  } catch (e) { return; }

  // Build modal content (without actions yet)
  const content = buildModalContent(privacyJson, createTag);

  // Show modal and get working closeModal callback
  const closeModal = showModal(content, {
    className: 'privacy-modal-v2',
    id: 'privacy-modal-v2',
    closeEvent: 'closePrivacyModal',
  });

  const actionsDiv = createActions(privacyJson.actions, content, privacyJson.cookiegroups, createTag);
  content.prepend(actionsDiv);

  // Button wiring
  actionsDiv.querySelectorAll('.privacy-modal-action').forEach((btn) => {
    btn.onclick = async () => {
      const otDomainId = config.privacyId || (config.privacy && config.privacy.otDomainId);

      if (btn.dataset.action === "accept") {
        content.querySelectorAll('.privacy-modal-cookiegroup input[type="checkbox"]:not(:disabled)').forEach(cb => {
          cb.checked = true;
        });
        const allCats = Array.from(
          content.querySelectorAll('.privacy-modal-cookiegroup')
        ).map(groupDiv => groupDiv.dataset.cat);
        privacyState.setConsent(allCats);
        // Call OneTrust API
        await loadOneTrustScriptOnce(otDomainId);
        if (window.OneTrust && typeof window.OneTrust.AcceptAll === "function") {
          window.OneTrust.AcceptAll();
        }
      } else if (btn.dataset.action === "reject") {
        // Disable all except strictly necessary: uncheck all, check only C0001 in UI and consent
        content.querySelectorAll('.privacy-modal-cookiegroup input[type="checkbox"]:not(:disabled)').forEach(cb => {
          cb.checked = cb.closest('.privacy-modal-cookiegroup').dataset.cat === 'C0001';
        });
        privacyState.setConsent(['C0001']);
  
        await loadOneTrustScriptOnce(otDomainId);
        if (window.OneTrust && typeof window.OneTrust.RejectAll === "function") {
          window.OneTrust.RejectAll();
        }
      } else if (btn.dataset.action === "confirm") {
        const checkedCats = collectConsentFromModal(content);
        privacyState.setConsent(checkedCats);

        await loadOneTrustScriptOnce(otDomainId);
        if (window.OneTrust && typeof window.OneTrust.SaveConsent === "function") {
         window.OneTrust.SaveConsent();
        }
      }
      showPrivacyToaster();
      closeModal();
    };
  });
}


