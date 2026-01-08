import { Link } from "./Parse";

export const link = ({
  text,
  href
}: Link): HTML => `<a class="feds-link" href="${href}">${text}</a>`;
