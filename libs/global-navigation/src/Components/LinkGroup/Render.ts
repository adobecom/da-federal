import { LinkGroup, LinkGroupBlue, LinkGroupHeader, LinkGroupLink } from "./Parse";

// css
import "./linkGroup.css";

export const linkGroup = (lg: LinkGroup): HTML => {
  switch (lg.type) {
    case "LinkGroupHeader": return linkGroupHeader(lg);
    case "LinkGroupLink": return linkGroupLink(lg);
    case "LinkGroupBlue": return linkGroupBlue(lg);
    default: {
      const exhaustivenessCheck: never = lg;
      console.error(exhaustivenessCheck);
      return "";
    }
  }
};

const linkGroupHeader = ({
  title,
  classes
}: LinkGroupHeader): HTML => {
  const classNames = classes.slice(1).map(cls => `feds-link-group--${cls}`).join(' ');
  return `
    <div role="heading" class="feds-link-group ${classNames}">
      <div class="feds-link-group__content">
        <div class="feds-link-group__title">${title}</div>
      </div>
    </div>
  `;
};

const linkGroupLink = ({
  iconHref,
  iconAlt,
  title,
  href,
  subtitle
}: LinkGroupLink): HTML => {
  const hasIcon = iconAlt !== null && iconHref !== null;
  const icon = !hasIcon
    ? ""
    : `
      <picture class="feds-link-group__icon">
        <img
          loading="lazy"
          src="${iconHref}"
          alt="${iconAlt}"
          class="feds-link-group__icon-img"
        >
      </picture>
    `;
  return `
    <a class="feds-link-group" href="${href}" daa-ll="${title}">
      ${icon}
      <div class="feds-link-group__content">
        <div class="feds-link-group__title">${title}</div>
        <div class="feds-link-group__subtitle">${subtitle}</div>
      </div>
    </a>
  `
}

const linkGroupBlue = ({
  link
}: LinkGroupBlue): HTML => `
  <a href="${link.href}" class="feds-link-group feds-link-group--blue" daa-ll="${link.text}">
    <div class="feds-link-group__content">
        <div class="feds-link-group__title">${link.text}</div>
      </div>
  </a>
`;