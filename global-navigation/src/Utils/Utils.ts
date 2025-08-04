import { IrrecoverableError, RecoverableError } from "../Error/Error";

export const isDesktop = window.matchMedia('(min-width: 900px)');

export const icons = {
  brand: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 64.57 35"><defs><style>.cls-1{fill: #eb1000;}</style></defs><path class="cls-1" d="M6.27,10.22h4.39l6.2,14.94h-4.64l-3.92-9.92-2.59,6.51h3.08l1.23,3.41H0l6.27-14.94ZM22.03,13.32c.45,0,.94.04,1.43.16v-3.7h3.88v14.72c-.89.4-2.81.89-4.73.89-3.48,0-6.47-1.98-6.47-5.93s2.88-6.13,5.89-6.13ZM22.52,22.19c.36,0,.65-.07.94-.16v-5.42c-.29-.11-.58-.16-.96-.16-1.27,0-2.45.94-2.45,2.92s1.2,2.81,2.47,2.81ZM34.25,13.32c3.23,0,5.98,2.18,5.98,6.02s-2.74,6.02-5.98,6.02-6-2.18-6-6.02,2.72-6.02,6-6.02ZM34.25,22.13c1.11,0,2.14-.89,2.14-2.79s-1.03-2.79-2.14-2.79-2.12.89-2.12,2.79.96,2.79,2.12,2.79ZM41.16,9.78h3.9v3.7c.47-.09.96-.16,1.45-.16,3.03,0,5.84,1.98,5.84,5.86,0,4.1-2.99,6.18-6.53,6.18-1.52,0-3.46-.31-4.66-.87v-14.72ZM45.91,22.17c1.34,0,2.56-.96,2.56-2.94,0-1.85-1.2-2.72-2.5-2.72-.36,0-.65.04-.91.16v5.35c.22.09.51.16.85.16ZM58.97,13.32c2.92,0,5.6,1.87,5.6,5.64,0,.51-.02,1-.09,1.49h-7.27c.4,1.32,1.56,1.94,3.01,1.94,1.18,0,2.27-.29,3.5-.82v2.97c-1.14.58-2.5.82-3.9.82-3.7,0-6.58-2.23-6.58-6.02s2.61-6.02,5.73-6.02ZM60.93,18.02c-.2-1.27-1.05-1.78-1.92-1.78s-1.58.54-1.87,1.78h3.79Z"/></svg>',
  company: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none"><path d="M14.2353 21.6209L12.4925 16.7699H8.11657L11.7945 7.51237L17.3741 21.6209H24L15.1548 0.379395H8.90929L0 21.6209H14.2353Z" fill="#EB1000"/></svg>',
  search: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path></svg>',
  home: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 18 18" width="25"><path fill="#6E6E6E" d="M17.666,10.125,9.375,1.834a.53151.53151,0,0,0-.75,0L.334,10.125a.53051.53051,0,0,0,0,.75l.979.9785A.5.5,0,0,0,1.6665,12H2v4.5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5v5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5V12h.3335a.5.5,0,0,0,.3535-.1465l.979-.9785A.53051.53051,0,0,0,17.666,10.125Z"/></svg>',
};

// split arrays based on a predicate
// unlike string.prototype.split, it works on
// all arrays.
export const split = <T>(
  predicate: (_: T) => boolean
) => (arr: T[]): T[][] => {
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

export const takeWhile = <T>(
  predicate: (_: T) => boolean
) => (arr: T[]): T[] => {
  if (arr.length === 0)
    return arr;
  const [x, ...xs] = arr;
  if (predicate(x))
    return [x].concat(takeWhile(predicate)(xs));
  return [];
};

export const dropWhile = <T>(
  predicate: (_: T) => boolean
) => (arr: T[]): T[] => {
  if (arr.length === 0)
    return arr;
  const [x, ...xs] = arr;
  if (predicate(x))
    return dropWhile(predicate)(xs);
  return xs;
};

export const getNextSiblings = (element: Element): Element[] => {
  const accumulator = [];
  let iterator = element.nextElementSibling as Element ?? null;
  while(iterator !== null) {
    accumulator.push(iterator);
    iterator = iterator.nextElementSibling as Element ?? null;
  }
  return accumulator;
};

type Alternative<T, R> = {
  or: (g: (_: R) => T) => Alternative<T, R>;
  eval: (_: R) => T;
};

export const alternative = <T, R>(
  f: (_: R) => T
): Alternative<T, R> => {
  return {
    eval: f,
    or: (g) => alternative((r) => {
      try {
        return f(r)
      } catch (_) {
        return g(r);
      }
    })
  }
};

export const parseListAndAccumulateErrors = <
  UnParsedObj,
  ParsedObj,
  ErrorType
  >(
  xs: List<UnParsedObj>,
  parse: (_: UnParsedObj) => Parsed<ParsedObj, ErrorType>
): Parsed<List<ParsedObj>, ErrorType> => xs.reduce(
  ([accB, accErrors], x) => {
    try {
      const [b, es] = parse(x);
      return [[...accB, b], [...accErrors, ...es]];
    } catch (e) {
      if (e instanceof IrrecoverableError) {
        return [accB, [
          e as ErrorType,
          ...accErrors]
        ];
      }
      return [accB, accErrors];
    }
  },
  [[],[]] as Parsed<List<ParsedObj>, ErrorType>
  );

type CleanupFunction = () => void;
type AddListeners = (gnav: HTMLElement) => CleanupFunction;
type ListenerSetupFunctions = {
  mobileEventListeners: AddListeners;
  desktopEventListeners: AddListeners;
}
export const setupMobileDesktopListeners = ({
  mobileEventListeners,
  desktopEventListeners
}: ListenerSetupFunctions) => (gnav: HTMLElement): void => {
  let cleanup: CleanupFunction;
  if (isDesktop.matches)
    cleanup = desktopEventListeners(gnav);
  else
    cleanup = mobileEventListeners(gnav);

  isDesktop.addEventListener('change', () => {
    cleanup?.();
    cleanup
      = isDesktop.matches
      ? desktopEventListeners(gnav)
      : mobileEventListeners(gnav);
  });
};

export const fetchAndCreateDocumentFragment = async (
  source: URL | null
): Promise<DocumentFragment | IrrecoverableError> => {
  try {
    if (source === null)
      return new IrrecoverableError('URL is null');
    const r = await fetch(source);
    if (!r.ok)
      return new IrrecoverableError(`Request for ${source} failed`);
    if (r.headers.get('Content-Type') !== 'text/html')
      return new IrrecoverableError(`${source} returned `);
    const html = await r.text();
    return document.createRange().createContextualFragment(html);
  } catch (e) {
    return new IrrecoverableError(JSON.stringify(e));
  }
};
