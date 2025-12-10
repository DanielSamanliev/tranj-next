import z from "zod";
import { ProductSchema } from "./product.schema";
import { QuestionSchema } from "./questions.schema";

export const HomepageSchema = z.object({
  products: z.array(ProductSchema),
  questions: z.array(QuestionSchema),
});
