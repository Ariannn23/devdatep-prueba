import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
      setIsFormOpen(false);
      setEditingMission(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: missionService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
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
