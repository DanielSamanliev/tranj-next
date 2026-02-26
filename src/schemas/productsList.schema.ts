import z from "zod";
import { ProductSchema } from "./product.schema";

export const ProductsListSchema = z.object({
  products_connection: z.object({
    nodes: z.array(ProductSchema),
    pageInfo: z.object({
      page: z.number(),
      pageCount: z.number(),
    }),
  }),
});

export type ProductsListType = z.infer<typeof ProductsListSchema>;
