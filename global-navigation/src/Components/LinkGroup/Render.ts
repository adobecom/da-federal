import { LinkGroup, LinkGroupBlue, LinkGroupHeader, LinkGroupLink } from "./Parse";

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
}: LinkGroupHeader): HTML => `
  <div role="heading" class="${classes.join(',')}">
    <div class="title">${title}</div>
  </div>
`;

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
  `
}

const linkGroupBlue = ({
  link
}: LinkGroupBlue): HTML => `
  <a href="${link.href}" class="link-group blue">
    ${link.text}
  </a>
`;

