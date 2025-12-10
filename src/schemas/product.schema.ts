import z from "zod";

export const ProductSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  longDescription: z.string().nullable().optional(),
  image: z.object({
    url: z.string(),
  }),
  price: z.number(),
  slug: z.string(),
  prepMethods: z
    .array(
      z.object({
        title: z.string(),
        icon: z.object({
          url: z.string(),
        }),
      })
    )
    .optional(),
});

export const ProductQuerySchema = z.object({
  products: z.array(ProductSchema),
});

export type ProductType = z.infer<typeof ProductSchema>;
