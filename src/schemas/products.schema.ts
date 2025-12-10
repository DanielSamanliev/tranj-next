import { z } from "zod";
import { ProductSchema } from "./product.schema";

export const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});
