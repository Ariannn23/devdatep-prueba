import { FaGlobeAmericas, FaFistRaised, FaInfoCircle, FaSave } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMissionForm } from "../hooks/useMissionForm";
import CustomSelect from "../../../components/ui/CustomSelect";
import Skeleton from "../../../components/ui/Skeleton";

const MissionForm = ({ onSubmit, characters = [], initialData = null, isEditing = false }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    countries,
    loadingCountries,
    currentDifficulty,
    currentCharacter,
    currentCountry,
    onFormSubmit,
  } = useMissionForm({ onSubmit, initialData, isEditing });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-red_dark p-8 rounded-3xl border-2 border-red_light/20 shadow-2xl space-y-6 text-cream_light">
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 font-bold mb-2 text-sm">
            <FaInfoCircle className="text-orange_base" /> Título de la Misión
          </label>
          <input
            {...register("title")}
            placeholder="Ej: Defensa de la Tierra"
            className={`w-full bg-red_base border-2 p-4 rounded-2xl focus:outline-none transition-all font-bold ${
              errors.title ? "border-red-500" : "border-red_light/10 focus:border-orange_base"
            }`}
          />
          {errors.title && <p className="text-red-400 text-xs mt-1 ml-1">{errors.title.message}</p>}
        </div>

        <CustomSelect 
          label="Guerrero Asignado"
          icon={FaFistRaised}
          options={characters}
          value={currentCharacter}
          onChange={(val) => setValue("assignedCharacter", val, { shouldValidate: true })}
          placeholder="Selecciona un guerrero..."
          isLoading={characters.length === 0}
          error={errors.assignedCharacter?.message}
        />

        <CustomSelect 
          label="País de Despliegue"
          icon={FaGlobeAmericas}
          options={countries}
          value={currentCountry}
          onChange={(val) => setValue("country", val, { shouldValidate: true })}
          placeholder="Selecciona una región..."
          isLoading={loadingCountries}
          error={errors.country?.message}
        />

        <div>
          <label className="font-bold mb-3 block text-sm">Nivel de Amenaza</label>
          <div className="flex gap-2">
            {["Bajo", "Medio", "Alto", "Extremo"].map((lvl) => (
              <label 
                key={lvl}
                className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold ${
                  currentDifficulty === lvl ? "bg-orange_base text-red_dark border-orange_base" : "bg-red_base border-red_light/10 text-cream_light/40"
                }`}
              >
                <input {...register("difficulty")} type="radio" value={lvl} className="hidden" />
                {lvl}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold mb-2 block text-sm">Descripción / Objetivos</label>
          <textarea
            {...register("description")}
            rows="3"
            placeholder="Detalles de la operación..."
            className="w-full bg-red_base border-2 border-red_light/10 p-4 rounded-2xl focus:border-orange_base outline-none transition-all font-bold placeholder:text-cream_light/20 resize-none"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1 ml-1">{errors.description.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange_base text-red_dark font-extrabold py-5 rounded-2xl hover:bg-orange_light transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95"
      >
        <FaSave className="group-hover:scale-125 transition-transform" />
        {isSubmitting ? "GUARDANDO..." : isEditing ? "GUARDAR CAMBIOS" : "INICIAR MISIÓN"}
      </button>
    </form>
  );
};

export default MissionForm;
