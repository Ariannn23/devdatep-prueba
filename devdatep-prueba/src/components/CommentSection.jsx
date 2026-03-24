import { FaTrash, FaEdit, FaCommentDots, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CommentForm from "./CommentForm";
import { useComments } from "../hooks/useComments";

const CommentSection = ({ characterId }) => {
  const {
    comments,
    editingId,
    addComment,
    updateComment,
    deleteComment,
    startEditing,
    cancelEditing
  } = useComments(characterId);

  return (
    <div className="mt-12 border-t-2 border-red_light/30 pt-12 mb-20">
      <div className="flex items-center gap-4 mb-8">
        <FaCommentDots className="text-cream_light text-3xl" />
        <h2 className="text-4xl font-title font-bold text-cream_light decoration-orange_base/50 underline-offset-8">
          Comentarios del personaje
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-body font-bold text-cream_light mb-4">
            {editingId ? "Editar tu opinión" : "Deja tu opinión"}
          </h3>
          <CommentForm 
            onSubmit={editingId ? updateComment : addComment} 
            isEditing={!!editingId}
            initialData={comments.find(c => c.id === editingId)}
          />
          {editingId && (
            <button 
              onClick={cancelEditing}
              className="mt-2 text-cream_light/50 text-sm hover:text-cream_light transition-colors"
            >
              Cancelar edición
            </button>
          )}
        </div>


        <div className="lg:col-span-3">
          <h3 className="text-xl font-body font-bold text-cream_light mb-4">
            Análisis de la comunidad
          </h3>
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
            {comments.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cream_base/50 font-body italic text-center py-10 border-2 border-dashed border-red_light/20 rounded-2xl"
              >
                No hay comentarios aún. ¡Sé el primero en dejar tu opinión!
              </motion.p>
            ) : (
              comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red_base p-5 rounded-2xl border border-red_light/40 shadow-lg group flex flex-col gap-4 relative"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-orange_base font-body">{comment.author}</h4>
                      <div className="flex text-xs text-yellow-500 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} className={i < comment.rating ? "opacity-100" : "opacity-20"} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-cream_light/30 uppercase tracking-tighter">{comment.date}</span>
                  </div>
                  
                  <p className="text-cream_light font-body text-sm leading-relaxed flex-grow">
                    {comment.text}
                  </p>

                  <div className="flex justify-end gap-3 pt-4 border-t border-red_light/20 mt-2">
                    <button 
                      onClick={() => startEditing(comment.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all text-xs font-bold shadow-md hover:scale-105"
                    >
                      <FaEdit size={12} /> Editar
                    </button>
                    <button 
                      onClick={() => deleteComment(comment.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all text-xs font-bold shadow-md hover:scale-105"
                    >
                      <FaTrash size={12} /> Borrar
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
);
};

export default CommentSection;
