import z from "zod";

export const ProductSlugsSchema = z.object({
  products: z.array(
    z.object({
      slug: z.string(),
    }),
  ),
});
