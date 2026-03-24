import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPaperPlane, FaEdit } from "react-icons/fa";
import { useEffect } from "react";

const commentSchema = z.object({
  author: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  text: z.string().min(5, "El comentario debe tener al menos 5 caracteres").max(200, "Máximo 200 caracteres"),
  rating: z.coerce.number().min(1).max(5),
});

const CommentForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: initialData || { author: "", text: "", rating: 5 }
  });

  useEffect(() => {
    if (initialData) {
      setValue("author", initialData.author);
      setValue("text", initialData.text);
      setValue("rating", initialData.rating);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!isEditing) reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-red_dark/30 p-6 rounded-2xl border border-red_light/20 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-cream_light/70 text-sm ml-1">Tu Nombre</label>
          <input
            {...register("author")}
            placeholder="Ej. Bulma"
            className={`bg-red_dark/40 border-2 rounded-xl p-3 text-cream_light font-body focus:outline-none focus:border-orange_base transition-colors ${
              errors.author ? "border-red-500" : "border-red_light/30"
            }`}
          />
          {errors.author && <span className="text-red-400 text-xs ml-1">{errors.author.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-cream_light/70 text-sm ml-1">Valoración (1-5)</label>
          <select
            {...register("rating")}
            className="bg-red_dark/40 border-2 border-red_light/30 rounded-xl p-3 text-cream_light font-body focus:outline-none focus:border-orange_base transition-colors"
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num} className="bg-red_dark">{num} Estrellas</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-cream_light/70 text-sm ml-1">Tu Comentario de Batalla</label>
        <textarea
          {...register("text")}
          placeholder="¿Qué te parece su poder?"
          rows="3"
          className={`bg-red_dark/40 border-2 rounded-xl p-3 text-cream_light font-body focus:outline-none focus:border-orange_base transition-colors resize-none ${
            errors.text ? "border-red-500" : "border-red_light/30"
          }`}
        ></textarea>
        {errors.text && <span className="text-red-400 text-xs ml-1">{errors.text.message}</span>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`flex items-center justify-center gap-2 p-3 rounded-xl font-title font-bold transition-all ${
          isValid 
            ? "bg-orange_base text-red_dark hover:scale-[1.02] cursor-pointer" 
            : "bg-red_light/10 text-cream_light/30 cursor-not-allowed"
        }`}
      >
        {isEditing ? <><FaEdit /> Actualizar Opinión</> : <><FaPaperPlane /> Publicar Comentario</>}
      </button>
    </form>
  );
};

export default CommentForm;
