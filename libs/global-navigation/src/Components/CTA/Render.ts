import { PrimaryCTA, ProductEntryCTA, SecondaryCTA } from "./Parse";

export const primaryCTA = ({
  text,
  href
}: PrimaryCTA): HTML => `
<a href="${href}" class="feds-primary-cta">
  ${text}
</a>
`;

export const secondaryCTA = ({
  text,
  href
}: SecondaryCTA): HTML => `
<a href="${href}" class="feds-secondary-cta">
  ${text}
</a>
`;

export const productEntryCTA = (
  cta: ProductEntryCTA
): HTML => {
  if (cta.type === "PrimaryCTA")
    return primaryCTA(cta);
  return secondaryCTA(cta);
}

