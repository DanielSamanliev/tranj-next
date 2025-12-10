import z from "zod";

const CategorySchema = z.object({
  documentId: z.string(),
  title: z.string(),
  icon: z.object({
    url: z.string(),
  }),
});

export const CategoriesSchema = z.object({
  categories: z.array(CategorySchema),
});

export type CategoryType = z.infer<typeof CategorySchema>;
