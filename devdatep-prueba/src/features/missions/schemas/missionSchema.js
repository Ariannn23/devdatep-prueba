import { z } from "zod";

export const missionSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(50, "El título es demasiado largo"),
  description: z
    .string()
    .min(10, "Describe la misión con al menos 10 caracteres")
    .max(200, "La descripción es demasiado larga"),
  assignedCharacter: z
    .string()
    .min(1, "Debes asignar un guerrero a la misión"),
  country: z
    .string()
    .min(1, "Debes seleccionar una región de despliegue"),
  difficulty: z.enum(["Bajo", "Medio", "Alto", "Extremo"], {
    errorMap: () => ({ message: "Selecciona un nivel de amenaza válido" }),
  }),
});
