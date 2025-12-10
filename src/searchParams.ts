import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const productsSearchParams = {
  categories: parseAsArrayOf(parseAsString, ",")
    .withOptions({
      shallow: false,
    })
    .withDefault([]),
  sort: parseAsString.withOptions({ shallow: false, clearOnDefault: true }),
  page: parseAsInteger
    .withOptions({ shallow: false, clearOnDefault: true })
    .withDefault(1),
};

export const loadSearchparams = createLoader(productsSearchParams);
