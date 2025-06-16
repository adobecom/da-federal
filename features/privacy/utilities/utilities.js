export function createTag(tag, attributes, html, options = {}) {
    const el = document.createElement(tag);
    // Handle HTML content (string, Node, DocumentFragment, Array)
    if (html) {
      if (html.nodeType === Node.ELEMENT_NODE
        || html instanceof SVGElement
        || html instanceof DocumentFragment) {
        el.append(html);
      } else if (Array.isArray(html)) {
        el.append(...html);
      } else {
        el.insertAdjacentHTML('beforeend', html);
      }
    }
    if (attributes) {
        Object.entries(attributes).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
              el.setAttribute(key, val);
            }
          });
    }
    if (options.parent) options.parent.append(el);
    return el;
  }  

export function loadStyle(url) {
    return new Promise((resolve, reject) => {
      if ([...document.styleSheets].some(s => s.href && s.href.endsWith(url))) return resolve();
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
}

export function loadOneTrustScriptOnce(domainId) {
    if (!domainId) {
        console.warn('[Privacy] OneTrust domain script ID is missing – OneTrust SDK will not be loaded.');
        return Promise.resolve();
    }
    if (window.OneTrust) return Promise.resolve();
    if (window._otScriptLoadingPromise) return window._otScriptLoadingPromise;
    window._otScriptLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
      script.setAttribute('data-domain-script', domainId);
      script.setAttribute('data-settings-id', domainId);
      script.setAttribute('data-document-language', 'true');
      script.setAttribute('data-disable-banner', 'true');
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return window._otScriptLoadingPromise;
  }

  