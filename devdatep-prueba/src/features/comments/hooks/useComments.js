import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useComments = (characterId) => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${characterId}`);
    if (saved) setComments(JSON.parse(saved));
  }, [characterId]);

  const saveComments = (newComments) => {
    setComments(newComments);
    localStorage.setItem(`comments-${characterId}`, JSON.stringify(newComments));
  };

  const addComment = (data) => {
    const newComment = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    saveComments([newComment, ...comments]);
    toast.success("¡Comentario publicado!");
  };

  const updateComment = (data) => {
    const newComments = comments.map(c => c.id === editingId ? { ...c, ...data } : c);
    saveComments(newComments);
    setEditingId(null);
    toast.success("Opinión actualizada");
  };

  const deleteComment = (id) => {
    const newComments = comments.filter(c => c.id !== id);
    saveComments(newComments);
    toast.info("Comentario eliminado");
  };

  const startEditing = (id) => setEditingId(id);
  const cancelEditing = () => setEditingId(null);

  return {
    comments,
    editingId,
    addComment,
    updateComment,
    deleteComment,
    startEditing,
    cancelEditing
  };
};
