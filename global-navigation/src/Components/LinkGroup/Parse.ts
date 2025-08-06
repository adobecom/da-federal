import { IrrecoverableError, RecoverableError } from "../../Error/Error";
import { alternative } from "../../Utils/Utils";
import { Link, parseLink } from "../Link/Parse";

export type LinkGroupHeader = {
  type: "LinkGroupHeader";
  title: string;
  classes: string[];
};

export type LinkGroupLink = {
  type: "LinkGroupLink";
  iconHref: string | null;
  iconAlt: string | null;
  title: string;
  href: string;
  subtitle: string;
}

export type LinkGroupBlue = {
  type: "LinkGroupBlue";
  link: Link;
};

export type LinkGroup
  = LinkGroupHeader
  | LinkGroupLink
  | LinkGroupBlue;


export const parseLinkGroup = (
  element: Element | null
): Parsed<LinkGroup, RecoverableError> => 
  alternative(parseLinkGroupHeader)
    .or(parseLinkGroupLink)
    .or(parseLinkGroupBlue)
    .eval(element);

/* example structure of a link group
*
* <div class="link-group">
*   <div>
*     <div><a href="/federal/assets/svgs/creative-cloud-40.svg">https://main--federal--adobecom.hlx.page/federal/assets/svgs/creative-cloud-40.svg | Adobe Creative Cloud</a></div>
*     <div>
*       <p><a href="https://www.adobe.com/creativecloud.html">What is Creative Cloud?</a></p>
*       <p>Creative apps and services for everyone</p>
*     </div>
*   </div>
* </div>
*  
* Sometimes it's slightly different
* <div class="link-group gray-gradient bold header">
    <div>
      <div></div>
      <div>
        <h5 id="document-productivity"><a href="bookmark://_document-productivity">Document productivity</a></h5>
      </div>
    </div>
  </div>
*
*/

const ERRORS = {
  elementNull: "Element not found",
  noTitleAnchor: "Title anchor not found",
  noHref: "Title Anchor has no href",
  noTitle: "Title text not found",
  noSubtitleP: "Subtitle <p> not found",
  noSubtitle: "Subtitle text not found",
  notAHeader: "Expected a Header class",
};

const parseLinkGroupLink = (
  element: Element | null
): Parsed<LinkGroup, RecoverableError> => {
  const errors = new Set<RecoverableError>();
  if (!element)
    throw new IrrecoverableError(ERRORS.elementNull);

  const titleElement = element.querySelector("p a");
  if (!titleElement)
    throw new IrrecoverableError(ERRORS.noTitleAnchor);

  const title = titleElement.textContent ?? '';
  if (title === '')
    errors.add(new RecoverableError(ERRORS.noTitle));

  const href = titleElement.getAttribute("href") ?? '';
  if (href === '')
    errors.add(new RecoverableError(ERRORS.noHref));

  const subtitleElement = titleElement
    ?.closest("p")
    ?.nextElementSibling;
  if (!subtitleElement)
    throw new IrrecoverableError(ERRORS.noSubtitleP);

  const subtitle = subtitleElement.textContent ?? '';
  if (subtitle === '')
    errors.add(new RecoverableError(ERRORS.noSubtitle));

  const [iconHref = null, iconAlt = null] = (element
    .firstElementChild
    ?.firstElementChild
    ?.textContent
    ?.split("|") ?? []).map(x => x.trim());
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
  ]
}

const parseLinkGroupHeader = (
  element: Element | null
): Parsed<LinkGroup, RecoverableError> => {
  if (!element)
    throw new IrrecoverableError(ERRORS.elementNull);
  
  const classes = [...element.classList];

  if(!classes.includes('header'))
    throw new IrrecoverableError(ERRORS.notAHeader);

  const title = element.querySelector('h5')?.textContent ?? "";
  if(title === "")
    throw new IrrecoverableError(ERRORS.noTitle);

  return [
    {
      type: "LinkGroupHeader",
      title,
      classes,
    },
    []
  ];
};

const parseLinkGroupBlue = (
  element: Element | null
): Parsed<LinkGroup, RecoverableError> => {
  if (!element)
    throw new IrrecoverableError(ERRORS.elementNull);

  if (!element.classList.contains('blue'))
    throw new Error('Not a Blue Link Group');

  const a = element.querySelector('a');
  const [link, es] = parseLink(a);

  return [
    {
      type: "LinkGroupBlue",
      link
    },
    es
  ];
};
