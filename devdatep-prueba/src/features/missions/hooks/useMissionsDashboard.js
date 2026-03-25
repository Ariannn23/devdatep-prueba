import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { missionService } from "../services/missionService";

export const useMissionsDashboard = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  const { data: missions = [], isLoading } = useQuery({
    queryKey: ["missions"],
    queryFn: missionService.getAll,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      editingMission
        ? missionService.update(editingMission.id, data)
        : missionService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
      const message = editingMission 
        ? "Misión actualizada con éxito" 
        : "¡Nueva misión iniciada!";
      toast.success(message, {
        description: `Objetivo: ${data.title}`
      });
      setIsFormOpen(false);
      setEditingMission(null);
    },
    onError: () => {
      toast.error("Error al procesar la misión");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: missionService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
      toast.info("Misión eliminada del radar");
    },
    onError: () => {
      toast.error("No se pudo eliminar la misión");
    }
  });

  const handleEdit = (mission) => {
    setEditingMission(mission);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleForm = () => {
    setEditingMission(null);
    setIsFormOpen(!isFormOpen);
  };

  return {
    missions,
    isLoading,
    isFormOpen,
    editingMission,
    isFirstMount,
    mutation,
    deleteMutation,
    handleEdit,
    toggleForm,
  };
};
