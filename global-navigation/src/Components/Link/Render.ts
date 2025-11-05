import { Link } from "./Parse";

export const link = ({
  text,
  href
}: Link): HTML => `<a href="${href}">${text}</a>`;
