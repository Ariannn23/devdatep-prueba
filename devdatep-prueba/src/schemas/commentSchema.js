import * as z from "zod";

export const commentSchema = z.object({
  author: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  text: z.string().min(5, "El comentario debe tener al menos 5 caracteres").max(200, "Máximo 200 caracteres"),
  rating: z.coerce.number().min(1).max(5),
});
