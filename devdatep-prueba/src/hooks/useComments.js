import { useState, useEffect } from "react";

/**
 * Custom hook to manage Battle Comments CRUD with localStorage
 */
export const useComments = (characterId) => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load comments
  useEffect(() => {
    const saved = localStorage.getItem(`comments-${characterId}`);
    if (saved) setComments(JSON.parse(saved));
  }, [characterId]);

  // Save/Sync comments
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
  };

  const updateComment = (data) => {
    const newComments = comments.map(c => c.id === editingId ? { ...c, ...data } : c);
    saveComments(newComments);
    setEditingId(null);
  };

  const deleteComment = (id) => {
    const newComments = comments.filter(c => c.id !== id);
    saveComments(newComments);
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
