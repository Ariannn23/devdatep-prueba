import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionSchema } from "../schemas/missionSchema";
import { useEffect, useState, useRef, forwardRef } from "react";
import { FaGlobeAmericas, FaFistRaised, FaInfoCircle, FaSave, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { countryService } from "../services/countryService";
import Skeleton from "../../../components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";

const CustomSelect = forwardRef(({ label, icon: Icon, options, value, onChange, placeholder, isLoading, error }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="flex items-center gap-2 font-bold text-sm">
        <Icon className="text-orange_base" /> {label}
      </label>
      {isLoading ? (
        <Skeleton className="h-12 w-full rounded-xl" />
      ) : (
        <div className="relative">
            <button
              type="button"
              ref={ref}
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full bg-red_dark border-2 rounded-2xl px-5 py-4 flex items-center justify-between font-bold transition-all shadow-lg ${
                isOpen ? 'border-orange_base' : 'border-red_light/20'
              }`}
            >
              <span className={value ? 'text-cream_light' : 'text-cream_light/30 italic text-sm'}>
                {options.find(opt => (opt.id || opt.name) === value || opt.name === value)?.name || placeholder}
              </span>
              <FaChevronDown className={`text-orange_base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-50 w-full mt-2 bg-red_base border-2 border-red_light/20 rounded-2xl shadow-2xl overflow-hidden p-1"
                >
                  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-orange_base p-1 flex flex-col gap-1 pr-1 text-red_dark">
                    {options.map((opt) => (
                      <button
                        key={opt.id || opt.name}
                        type="button"
                        onClick={() => {
                          onChange(opt.name);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 transition-all rounded-xl font-bold flex items-center justify-between group ${
                          value === opt.name ? 'bg-red_light/20' : 'hover:bg-red_light/10 text-cream_light'
                        }`}
                      >
                        <span className={`${value === opt.name ? 'text-orange_base' : 'text-cream_light'}`}>
                          {opt.name}
                        </span>
                        {value === opt.name && <FaChevronRight className="text-orange_base text-xs" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      )}
      {error && <p className="text-red-400 text-xs ml-1">{error}</p>}
    </div>
  );
});

const MissionForm = ({ onSubmit, characters = [], initialData = null, isEditing = false }) => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(missionSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      country: "",
      assignedCharacter: "",
      difficulty: "Bajo"
    }
  });

  const currentDifficulty = watch("difficulty");
  const currentCharacter = watch("assignedCharacter");
  const currentCountry = watch("country");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryService.getAll();
        const sorted = data.map(c => ({ name: c.name.common })).sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
    }
  }, [initialData, setValue]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    if (!isEditing) reset();
  };

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
          label="Región de Despliegue"
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
