import { IrrecoverableError } from "../Error/Error";
import { Input } from "../Main";
import { fetchAndProcessPlainHTML } from "../Utils/Utils";

type Initial = {
  mainNav: DocumentFragment;
  aside: DocumentFragment | IrrecoverableError;
};

export const getInitialHTML = async ({
  gnavSource,
  asideSource
}: Input): Promise<Initial | IrrecoverableError> => {
  const mainNav = await fetchAndProcessPlainHTML(gnavSource);
  if (mainNav instanceof IrrecoverableError)
    return mainNav;
  const aside = await fetchAndProcessPlainHTML(asideSource);
  return {
    mainNav,
    aside,
  }
}

