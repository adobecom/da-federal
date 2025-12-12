// src/Error/Error.ts
var IrrecoverableError = class _IrrecoverableError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _IrrecoverableError.prototype);
  }
};
var RecoverableError = class _RecoverableError extends Error {
  constructor(message, severity = "Minor") {
    super(message);
    Object.setPrototypeOf(this, _RecoverableError.prototype);
    if (severity !== "Minor") {
    }
  }
};

// src/Components/LinkGroup/Render.ts
var linkGroup = (lg) => {
  switch (lg.type) {
    case "LinkGroupHeader":
      return linkGroupHeader(lg);
    case "LinkGroupLink":
      return linkGroupLink(lg);
    case "LinkGroupBlue":
      return linkGroupBlue(lg);
    default: {
      const exhaustivenessCheck = lg;
      console.error(exhaustivenessCheck);
      return "";
    }
  }
};
var linkGroupHeader = ({
  title,
  classes
}) => `
  <div role="heading" class="${classes.join(",")}">
    <div class="title">${title}</div>
  </div>
`;
var linkGroupLink = ({
  iconHref,
  iconAlt,
  title,
  href,
  subtitle
}) => {
  const hasIcon = iconAlt !== null && iconHref !== null;
  const icon = !hasIcon ? "" : `
      <picture>
        <img
          loading="lazy"
          src="${iconHref}"
          alt="${iconAlt}"
        >
      </picture>
    `;
  return `
    <a class="link-group" href="${href}">
      ${icon}
      <div class="content">
        <div class="title">${title}</div>
        <div class="subtile">${subtitle}</div>
      </div>
    </a>
  `;
};
var linkGroupBlue = ({
  link: link2
}) => `
  <a href="${link2.href}" class="link-group blue">
    ${link2.text}
  </a>
`;

// src/Components/Link/Render.ts
var link = ({
  text: text2,
  href
}) => `<a href="${href}">${text2}</a>`;

// src/Components/CTA/Render.ts
var primaryCTA = ({
  text: text2,
  href
}) => `
<a href="${href}" class="feds-primary-cta">
  ${text2}
</a>
`;
var secondaryCTA = ({
  text: text2,
  href
}) => `
<a href="${href}" class="feds-secondary-cta">
  ${text2}
</a>
`;
var productEntryCTA = (cta) => {
  if (cta.type === "PrimaryCTA")
    return primaryCTA(cta);
  return secondaryCTA(cta);
};

// src/Utils/Utils.ts
var isDesktop = window.matchMedia("(min-width: 900px)");
var split = (predicate) => (arr) => {
  const accumulator = [];
  let current = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      accumulator.push(current);
      current = [];
      continue;
    }
    current.push(arr[i]);
  }
  accumulator.push(current);
  return accumulator;
};
var takeWhile = (predicate) => (arr) => {
  if (arr.length === 0)
    return arr;
  const [x, ...xs] = arr;
  if (predicate(x))
    return [x].concat(takeWhile(predicate)(xs));
  return [];
};
var getNextSiblings = (element) => {
  const accumulator = [];
  let iterator = element.nextElementSibling ?? null;
  while (iterator !== null) {
    accumulator.push(iterator);
    iterator = iterator.nextElementSibling ?? null;
  }
  return accumulator;
};
var alternative = (f) => {
  return {
    eval: f,
    or: (g) => alternative((r) => {
      try {
        return f(r);
      } catch (_) {
        return g(r);
      }
    })
  };
};
var parseListAndAccumulateErrors = (xs, parse) => xs.reduce(
  ([accB, accErrors], x) => {
    try {
      const [b, es] = parse(x);
      return [[...accB, b], [...accErrors, ...es]];
    } catch (e) {
      if (e instanceof IrrecoverableError) {
        return [
          accB,
          [
            e,
            ...accErrors
          ]
        ];
      }
      return [accB, accErrors];
    }
  },
  [[], []]
);
var setupMobileDesktopListeners = ({
  mobileEventListeners,
  desktopEventListeners
}) => (gnav) => {
  let cleanup;
  if (isDesktop.matches)
    cleanup = desktopEventListeners(gnav);
  else
    cleanup = mobileEventListeners(gnav);
  isDesktop.addEventListener("change", () => {
    cleanup?.();
    cleanup = isDesktop.matches ? desktopEventListeners(gnav) : mobileEventListeners(gnav);
  });
};
var fetchAndProcessPlainHTML = async (source) => {
  try {
    if (source === null)
      return new IrrecoverableError("URL is null");
    const r = await fetch(federateUrl(source.href));
    if (!r.ok)
      return new IrrecoverableError(`Request for ${source} failed`);
    const html = await r.text();
    const { body } = new DOMParser().parseFromString(html, "text/html");
    return body;
  } catch (e) {
    return new IrrecoverableError(JSON.stringify(e));
  }
};
var federateUrl = (path) => {
  const cleanedPath = path.replace(/\.plain\.html(?=[?#]|$)/, ".html");
  return cleanedPath.replace(/\.html(?=[?#]|$)|(?=[?#]|$)/, ".plain.html");
};
var inlineNestedFragments = async (el) => {
  const go = async (element, visited) => {
    if (element instanceof IrrecoverableError)
      return element;
    try {
      const links = [...element.querySelectorAll('a[href*="#_inline"]')].map(async (a) => {
        try {
          if (visited.has(a.href)) return;
          const federated = federateUrl(a.href);
          const url = new URL(federated);
          const fragment = await fetchAndProcessPlainHTML(url);
          visited.add(a.href);
          if (fragment instanceof IrrecoverableError)
            throw fragment;
          await go(fragment, visited);
          const parent = a.closest("div");
          if (parent) {
            parent.replaceChildren(...fragment.children);
          }
          return;
        } catch {
          return;
        }
      }, []);
      await Promise.all(links);
      return element;
    } catch (e) {
      return new IrrecoverableError(JSON.stringify(e));
    }
  };
  return go(el, /* @__PURE__ */ new Set());
};
var renderListItems = (items, renderFn) => {
  return items.map((item) => `<li>${renderFn(item)}</li>`).join("");
};
var sanitize = (str) => {
  return str.toLowerCase().trim().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "id-$1");
};

// src/Components/Column/Render.ts
var column = (c) => {
  switch (c.type) {
    case "SingleColumnSection":
      return singleColumnSection(c);
    case "SingleColumnSectionList":
      return singleColumnSectionList(c);
    case "MultiColumnSection":
      return multiColumnSection(c);
    case "MenuPromo":
      return menuPromo(c);
    case "New":
      return "";
    case "Something":
      return "";
    default: {
      const exhaustive = c;
      console.error(`Unexpected Column Type ${exhaustive}`);
      return "";
    }
  }
};
var singleColumnSection = ({
  title,
  items
}) => `
<ul>
  ${title === null ? "" : `<span class="column-section-title">${title}</span>`}
  ${renderListItems(items, columnItem)}
</ul>
`;
var singleColumnSectionList = ({
  sections
}) => `
  <ul>
    ${renderListItems(sections, singleColumnSection)}
  </ul>
`;
var multiColumnSection = ({
  title,
  columns
}) => `
  <ul>
  ${title === null ? "" : `<span class="column-section-title">${title}</span>`}
  ${renderListItems(
  columns,
  (columnItemList) => renderListItems(columnItemList, columnItem)
)}
  </ul>
`;
var menuPromo = ({
  content
}) => content;
var columnItem = (item) => {
  switch (item.type) {
    case "LinkGroupHeader":
    case "LinkGroupLink":
    case "LinkGroupBlue":
      return linkGroup(item);
    case "Link":
      return link(item);
    case "PrimaryCTA":
      return primaryCTA(item);
    case "SecondaryCTA":
      return secondaryCTA(item);
    default: {
      const exhaustive = item;
      console.error(`Unexpected ColumnItem type ${exhaustive}`);
      return "";
    }
  }
};

// src/Components/Brand/Parse.ts
var parseBrand = (_element) => {
  return [
    {
      type: "Brand",
      imgSrc: "/federal/assets/svgs/adobe-logo.svg",
      altText: "Adobe .Inc.",
      render: true,
      brandImageOnly: true,
      href: new URL("https://www.adobe.com")
    },
    []
  ];
};

// src/Components/Brand/Render.ts
var brand = ({
  imgSrc,
  altText,
  href
}) => `
<a href="${href.href}" 
   class="feds-brand"
   aria-label="Adobe"
>
 <img src="${imgSrc}" alt="${altText}" loading="lazy"> 
</a>
`;

// src/Components/Link/Parse.ts
var ERRORS = {
  elementNull: "Error when parsing Link. Element is null",
  notAnchor: "Cannot parse non-anchor as Link",
  textContentNotFound: "Error when parsing Link. Element has no textContent",
  hrefNotFound: "Element has no href"
};
var parseLink = (anchor) => {
  if (anchor === null)
    throw new IrrecoverableError(ERRORS.elementNull);
  if (anchor.tagName !== "A")
    throw new IrrecoverableError(ERRORS.notAnchor);
  const text2 = anchor?.textContent ?? "";
  if (text2 === "")
    throw new IrrecoverableError(ERRORS.textContentNotFound);
  const href = anchor?.getAttribute("href") ?? "";
  if (href === "")
    throw new IrrecoverableError(ERRORS.hrefNotFound);
  return [
    {
      type: "Link",
      text: text2,
      href
    },
    []
  ];
};

// src/Components/CTA/Parse.ts
var parseCTA = (type) => (element) => {
  if (element === null)
    throw new Error("");
  const anchor = element.querySelector(getSelector(type));
  if (!anchor)
    throw new Error("");
  const [{ text: text2, href }, es] = parseLink(anchor);
  return [
    {
      type: type.type,
      text: text2,
      href
    },
    es
  ];
};
var parsePrimaryCTA = parseCTA({ type: "PrimaryCTA" });
var parseSecondaryCTA = parseCTA({ type: "SecondaryCTA" });
var parseProductEntryCTA = (element) => alternative(parsePrimaryCTA).or(parseSecondaryCTA).eval(element);
var getSelector = ({ type }) => {
  switch (type) {
    case "PrimaryCTA":
      return "strong > a";
    case "SecondaryCTA":
      return "em > a";
    default:
      throw new Error("");
  }
};

// src/Components/LinkGroup/Parse.ts
var parseLinkGroup = (element) => alternative(parseLinkGroupHeader).or(parseLinkGroupLink).or(parseLinkGroupBlue).eval(element);
var ERRORS2 = {
  elementNull: "Element not found",
  noTitleAnchor: "Title anchor not found",
  noHref: "Title Anchor has no href",
  noTitle: "Title text not found",
  noSubtitleP: "Subtitle <p> not found",
  noSubtitle: "Subtitle text not found",
  notAHeader: "Expected a Header class"
};
var parseLinkGroupLink = (element) => {
  const errors = /* @__PURE__ */ new Set();
  if (!element)
    throw new IrrecoverableError(ERRORS2.elementNull);
  const titleElement = element.querySelector("p a");
  if (!titleElement)
    throw new IrrecoverableError(ERRORS2.noTitleAnchor);
  const title = titleElement.textContent ?? "";
  if (title === "")
    errors.add(new RecoverableError(ERRORS2.noTitle));
  const href = titleElement.getAttribute("href") ?? "";
  if (href === "")
    errors.add(new RecoverableError(ERRORS2.noHref));
  const subtitleElement = titleElement?.closest("p")?.nextElementSibling;
  if (!subtitleElement)
    throw new IrrecoverableError(ERRORS2.noSubtitleP);
  const subtitle = subtitleElement.textContent ?? "";
  if (subtitle === "")
    errors.add(new RecoverableError(ERRORS2.noSubtitle));
  const [iconHref = null, iconAlt = null] = (element.firstElementChild?.firstElementChild?.textContent?.split("|") ?? []).map((x) => x.trim());
  return [
    {
      type: "LinkGroupLink",
      iconHref,
      iconAlt,
      title,
      href,
      subtitle
    },
    [...errors]
  ];
};
var parseLinkGroupHeader = (element) => {
  if (!element)
    throw new IrrecoverableError(ERRORS2.elementNull);
  const classes = [...element.classList];
  if (!classes.includes("header"))
    throw new IrrecoverableError(ERRORS2.notAHeader);
  const title = element.querySelector("h5")?.textContent ?? "";
  if (title === "")
    throw new IrrecoverableError(ERRORS2.noTitle);
  return [
    {
      type: "LinkGroupHeader",
      title,
      classes
    },
    []
  ];
};
var parseLinkGroupBlue = (element) => {
  if (!element)
    throw new IrrecoverableError(ERRORS2.elementNull);
  if (!element.classList.contains("blue"))
    throw new Error("Not a Blue Link Group");
  const a = element.querySelector("a");
  const [link2, es] = parseLink(a);
  return [
    {
      type: "LinkGroupBlue",
      link: link2
    },
    es
  ];
};

// src/Components/Column/Parse.ts
var parseColumn = (el) => alternative(parseSingleColumnSectionList).or(parseSingleColumnSection).or(parseMultiColumnSection).or(parseMenuPromo).eval(el);
var parseColumnItems = (items) => parseListAndAccumulateErrors(
  items,
  (item) => alternative(
    parseLinkGroup
  ).or(parsePrimaryCTA).or(parseSecondaryCTA).or(parseLink).eval(item)
);
var extractColumnItems = (elements) => elements.flatMap((item) => {
  if (item.nodeName === "UL")
    return [...item.querySelectorAll("li > a")];
  return [item];
});
var parseSingleColumnSection = (element) => {
  if (element.querySelector(".column-break"))
    throw new IrrecoverableError("Has a column break");
  const h5 = element.firstElementChild;
  if (h5 === null)
    throw new IrrecoverableError("No Children");
  const title = h5.nodeName === "H5" ? h5.textContent ?? null : null;
  const columnItems = h5.nodeName === "H5" ? getNextSiblings(h5) : [...element.children];
  const rawLinks = extractColumnItems(columnItems);
  const [items, es] = parseColumnItems(rawLinks);
  return [
    {
      type: "SingleColumnSection",
      title,
      items
    },
    es
  ];
};
var parseSingleColumnSectionList = (element) => {
  if (element.querySelector(".column-break"))
    throw new IrrecoverableError("Has a column break");
  const h5s = [...element.querySelectorAll("h5")];
  if (h5s.length <= 1)
    throw new IrrecoverableError("Not a section list");
  const parseSection = (h5) => {
    const container = document.createElement("div");
    const listItems = takeWhile(
      (x) => x.nodeName !== "H5"
    )(getNextSiblings(h5));
    container.append(h5, ...listItems);
    return parseSingleColumnSection(container);
  };
  const [sections, es] = parseListAndAccumulateErrors(h5s, parseSection);
  return [
    {
      type: "SingleColumnSectionList",
      sections
    },
    es
  ];
};
var parseMultiColumnSection = (element) => {
  if (!element.querySelector(".column-break"))
    throw new IrrecoverableError("Expected a Column Break");
  const h5 = element.firstElementChild;
  if (h5 === null || h5.nodeName !== "H5")
    throw new IrrecoverableError(ERRORS3.expectedH5);
  const title = h5.textContent;
  if (title === "" || title === null)
    throw new IrrecoverableError(ERRORS3.emptyTitle);
  const isColumnBreak = (x) => x.classList.contains("column-break");
  const rawColumns = split(isColumnBreak)(getNextSiblings(h5)).map(extractColumnItems);
  const [columns, es] = parseListAndAccumulateErrors(rawColumns, parseColumnItems);
  return [
    {
      type: "MultiColumnSection",
      title,
      columns
    },
    es
  ];
};
var parseMenuPromo = (element) => {
  if (element === null)
    throw new IrrecoverableError(ERRORS3.elementNull);
  const promo = element.querySelector(".gnav-promo, .gnav-image");
  if (promo === null)
    throw new IrrecoverableError(ERRORS3.noPromo);
  const content = promo.innerHTML ?? "";
  if (content === "")
    throw new IrrecoverableError(ERRORS3.noPromoContent);
  return [
    {
      type: "MenuPromo",
      content
    },
    []
  ];
};
var ERRORS3 = {
  expectedH5: "Expected an H5 element for the title ",
  emptyTitle: "Expected Title to not be empty",
  elementNull: "Element is null",
  noPromo: "Promo or gnav image not found",
  noPromoContent: "Promo Content not found"
};

// src/Components/MegaMenu/Parse.ts
var parseMegaMenu = (element) => {
  const errors = /* @__PURE__ */ new Set();
  if (element === null)
    throw new IrrecoverableError(ERRORS4.elementNull);
  const title = element.querySelector("h2")?.textContent ?? "";
  if (title === "")
    errors.add(new RecoverableError(ERRORS4.noTitle));
  const columns = (async () => {
    try {
      const fragment = element.querySelector("h2 > a");
      const fragmentURL = new URL(fragment?.href ?? "");
      const initialFragment = await fetchAndProcessPlainHTML(fragmentURL);
      if (initialFragment instanceof IrrecoverableError)
        throw new Error(initialFragment.message);
      const megaMenuFragment = await inlineNestedFragments(initialFragment);
      if (megaMenuFragment instanceof IrrecoverableError)
        throw new Error(megaMenuFragment.message);
      const unparsedColumns = [...megaMenuFragment.children].map((c) => c.firstElementChild ?? c);
      unparsedColumns.forEach((c) => console.log(c.outerHTML));
      return parseListAndAccumulateErrors(
        unparsedColumns,
        parseColumn
      );
    } catch (e) {
      throw new IrrecoverableError(JSON.stringify(e));
    }
  })();
  const unparsedCrossCloud = element.querySelectorAll(
    ".cross-cloud-menu ul > li > a"
  );
  const [crossCloudMenu, ccmErrors] = parseListAndAccumulateErrors(
    [...unparsedCrossCloud],
    parseLink
  );
  const isSection = element.classList.contains("section");
  return [
    {
      type: "MegaMenu",
      title,
      columns,
      crossCloudMenu,
      isSection
    },
    [
      ...ccmErrors,
      ...errors
    ]
  ];
};
var ERRORS4 = {
  elementNull: "Element is null",
  noTitle: "Large Menu has no Title"
};

// src/Components/MegaMenu/Render.ts
var renderGhostColumns = () => `
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
`;
var megaMenu = ({
  title,
  crossCloudMenu,
  isSection
}) => `
  <button type="button"
          aria-expanded="false"
          aria-controls="${sanitize(title)}"
          class="mega-menu"
  >
    ${title}
  </button>
  <div id="${sanitize(title)}" class="feds-popup${isSection ? "" : " section"}">
    <ul>
    </ul>
    <ul class="cross-cloud-menu">
      ${renderListItems(crossCloudMenu, link)}
    </ul>
  </div>
`;

// src/Components/SmallMenu/Parse.ts
var parseSmallMenu = (element) => {
  const errors = [];
  if (element === null)
    throw new IrrecoverableError(ERRORS5.elementNull);
  const h2 = element.querySelector("h2");
  const title = h2?.textContent ?? "";
  if (title === "")
    errors.push(new RecoverableError(ERRORS5.noTitle));
  const columnsContainer = (() => {
    if (h2 === null)
      return element;
    const container = document.createElement("div");
    getNextSiblings(h2).forEach((s) => container.appendChild(s));
    return container;
  })();
  const [columns, es] = alternative(parseSingleColumnSectionList).or((el) => parseListAndAccumulateErrors(
    [...el.children],
    parseNoTitleColumn
  )).eval(columnsContainer);
  const [promo, pes] = (() => {
    try {
      return parseMenuPromo(element);
    } catch (_) {
      return [null, []];
    }
  })();
  return [
    {
      type: "SmallMenu",
      title,
      columns,
      promo
    },
    [
      ...es,
      ...pes
    ]
  ];
};
var parseNoTitleColumn = (element) => {
  if (element.nodeName !== "UL")
    throw new Error("");
  const links = [...element.querySelectorAll("ul > li > a")];
  return parseListAndAccumulateErrors(links, parseLink);
};
var ERRORS5 = {
  elementNull: "The element to be parsed is null",
  noTitle: "Small menu has no title"
};

// src/Components/SmallMenu/Render.ts
var smallMenu = ({
  title,
  columns,
  promo
}) => `
  <button type="button"
          aria-expanded="false"
          aria-controls="${sanitize(title)}"
  >
    ${title}
  </button>
  <div class="feds-popup" id="${sanitize(title)}">
    ${smallMenuList(columns)}
    ${promo === null ? "" : `<li>${menuPromo(promo)}</li>`}
  </div>
`;
var smallMenuList = (c) => {
  if (!Array.isArray(c) && c?.type === "SingleColumnSectionList")
    return column(c);
  return `
  <ul>
    ${renderListItems(c, (l) => `
      <ul>
        ${renderListItems(l, link)}
      </ul>
    `)}
  </ul>
  `;
};

// src/Components/Text/Parse.ts
var ERRORS6 = {
  elementNull: "Error when parsing text. Element is null",
  textContentNull: "Error when parsing text. Element has no textContent"
};
var parseText = (element) => {
  if (element === null)
    return [
      {
        type: "Text",
        content: ""
      },
      [new RecoverableError(ERRORS6.elementNull, "Minor")]
    ];
  const content = element.textContent;
  if (content === null)
    return [
      {
        type: "Text",
        content: ""
      },
      [new RecoverableError(ERRORS6.textContentNull, "Minor")]
    ];
  return [
    {
      type: "Text",
      content
    },
    []
  ];
};

// src/Components/Text/Render.ts
var text = ({ content }) => content;

// src/Components/Component.ts
var parseComponent = (element) => {
  if (element === null)
    throw new IrrecoverableError(ERRORS7.elementNull);
  const brand2 = element.querySelector(".gnav-brand");
  if (brand2 !== null)
    return parseBrand(element);
  const largeMenu = element.querySelector(".large-menu");
  if (largeMenu !== null)
    return parseMegaMenu(largeMenu);
  if (element.querySelector("h5, ul, link-group") !== null)
    return parseSmallMenu(element);
  if (element.querySelector("strong") !== null)
    return parsePrimaryCTA(element);
  if (element.querySelector("em") !== null)
    return parseSecondaryCTA(element);
  if (element.querySelector("a") === null)
    return parseText(element);
  return parseLink(element.querySelector("a"));
};
var component = (c) => {
  switch (c.type) {
    case "Text":
      return text(c);
    case "Link":
      return link(c);
    case "SecondaryCTA":
      return secondaryCTA(c);
    case "PrimaryCTA":
      return primaryCTA(c);
    case "Brand":
      return brand(c);
    case "SmallMenu":
      return smallMenu(c);
    case "MegaMenu":
      return megaMenu(c);
    default: {
      const exhaustive = c;
      console.error(`Failed to recognize component: ${exhaustive}`);
      return "";
    }
  }
};
var ERRORS7 = {
  elementNull: "Element is null"
};

// src/Parse/Parse.ts
var parseNavigation = (mainNav) => {
  const [breadcrumbs, breadcrumbErrors] = parseListAndAccumulateErrors(
    [...document.querySelectorAll(".breadcrumbs ul > li > a") ?? []],
    parseLink
  );
  const [components, componentErrors] = parseListAndAccumulateErrors(
    [...mainNav.children],
    parseComponent
  );
  const productEntryElement = mainNav.querySelector(".product-entry-cta");
  const [productCTA, productCtaErrors] = (() => {
    try {
      return parseProductEntryCTA(productEntryElement);
    } catch (_) {
      return [null, []];
    }
  })();
  const localnav = components.filter((component2) => component2.type === "MegaMenu" && component2.isSection).length === 1;
  const errors = [
    breadcrumbErrors,
    componentErrors,
    productCtaErrors
  ].flat();
  return {
    breadcrumbs,
    components,
    productCTA,
    localnav,
    errors
  };
};

// src/PostRendering/ClickListeners.ts
var mobileClickListeners = (gnav) => {
  return () => console.log(gnav);
};
var desktopClickListeners = (gnav) => {
  return () => console.log(gnav);
};
var initClickListeners = setupMobileDesktopListeners({
  mobileEventListeners: mobileClickListeners,
  desktopEventListeners: desktopClickListeners
});

// src/PostRendering/Keyboard.ts
var initDesktopKeyboardNav = (gnav) => {
  return () => console.log(gnav);
};
var initMobileKeyboardNav = (gnav) => {
  return () => console.log(gnav);
};
var initKeyboardNav = setupMobileDesktopListeners({
  mobileEventListeners: initMobileKeyboardNav,
  desktopEventListeners: initDesktopKeyboardNav
});

// src/PreRendering/FetchAssets.ts
var getInitialHTML = async ({
  gnavSource,
  asideSource
}) => {
  const mainNav = await fetchAndProcessPlainHTML(gnavSource);
  if (mainNav instanceof IrrecoverableError)
    return mainNav;
  const aside = await fetchAndProcessPlainHTML(asideSource);
  return {
    mainNav,
    aside
  };
};

// src/Main.ts
var renderGnav = (data) => async (mountpoint2) => {
  const navHTML = renderGnavString(data);
  mountpoint2.innerHTML = navHTML;
  const megaMenus = [
    ...mountpoint2.querySelectorAll(".mega-menu ~ .feds-popup > ul")
  ];
  megaMenus.forEach((mm) => {
    mm.innerHTML = renderGhostColumns();
  });
  const mmPromises = data.components.filter((com) => com.type === "MegaMenu").map((com) => com.columns);
  const _errors_ = await Promise.all(mmPromises.map(async (mmPromise, idx) => {
    const [columns, errors] = await mmPromise;
    const renderedColumns = renderListItems(columns, column);
    megaMenus[idx].innerHTML = renderedColumns;
    return errors;
  }).flat());
  return mountpoint2;
};
var renderGnavString = ({
  components,
  productCTA
}) => `
<nav>
  <ul>
    ${renderListItems(components, component)}
  </ul>
  ${productCTA === null ? "" : productEntryCTA(productCTA)}
  <div class="feds-utilities">
  </div>
</nav>
`;

// src/test.ts
document.write("<html><head></head><header></header></html");
var mountpoint = document.querySelector("header");
if (!mountpoint) throw new Error("bad mountpoint");
var input = {
  gnavSource: new URL("https://www.adobe.com/dc-shared/navigation/globalnav/localnav-acrobat-teams"),
  asideSource: null,
  isLocalNav: true,
  mountpoint,
  unavEnabled: false
};
(async () => {
  const initial = await getInitialHTML(input);
  if (initial instanceof IrrecoverableError)
    throw initial;
  const { mainNav, aside: _aside } = initial;
  if (mainNav instanceof IrrecoverableError)
    throw mainNav;
  const gnavData = parseNavigation(mainNav);
  if (gnavData instanceof IrrecoverableError)
    throw gnavData;
  console.log(gnavData);
  renderGnav(gnavData)(mountpoint);
})();
