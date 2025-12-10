import { DocumentNode, print } from "graphql";
import { ZodType } from "zod";

export async function gqlRequestStrapi<T>(
  query: DocumentNode,
  variables = {},
  schema: ZodType<T>
) {
  const res = await fetch(process.env.NEXT_STRAPI_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  const parsedData = schema.safeParse(json.data);
  if (!parsedData.success) {
    console.error(parsedData.error);
    throw new Error("Failed to parse API response");
  }

  return parsedData.data;
}
