import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionSchema } from "../schemas/missionSchema";
import { countryService } from "../services/countryService";

export const useMissionForm = ({ onSubmit, initialData, isEditing }) => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(missionSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      country: "",
      assignedCharacter: "",
      difficulty: "Bajo",
    },
  });

  const currentDifficulty = watch("difficulty");
  const currentCharacter = watch("assignedCharacter");
  const currentCountry = watch("country");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryService.getAll();
        const sorted = data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
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
      Object.keys(initialData).forEach((key) => setValue(key, initialData[key]));
    }
  }, [initialData, setValue]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    if (!isEditing) reset();
  };

  return {
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
  };
};
