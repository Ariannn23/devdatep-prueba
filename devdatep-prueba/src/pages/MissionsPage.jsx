import { useMissionsDashboard } from "../features/missions/hooks/useMissionsDashboard";
import { useAllCharacters } from "../features/characters/hooks/useCharacters";
import { motion, AnimatePresence } from "framer-motion";
import MissionForm from "../features/missions/components/MissionForm";
import MissionCard from "../features/missions/components/MissionCard";
import MissionCardSkeleton from "../features/missions/components/MissionCardSkeleton";
import Skeleton from "../components/ui/Skeleton";
import { FaPlus, FaTimes, FaFistRaised, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MissionsPage = () => {
  const {
    missions,
    isLoading,
    isFormOpen,
    editingMission,
    isFirstMount,
    mutation,
    deleteMutation,
    handleEdit,
    toggleForm,
  } = useMissionsDashboard();

  const { data: allCharacters } = useAllCharacters();
  const characters = allCharacters?.items || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-red_dark text-cream_light p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-3 bg-red_base border-2 border-red_light/20 rounded-xl hover:border-orange_base transition-all shadow-lg active:scale-90">
              <FaChevronLeft className="text-cream_light" />
            </Link>
            <h1 className="text-4xl font-title font-black text-cream_light flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <FaFistRaised className="text-cream_light" /> Combates Pendientes
            </h1>
          </div>
          {isLoading && missions.length === 0 ? (
            <Skeleton className="h-12 w-40 rounded-xl" />
          ) : (
            <button 
              onClick={toggleForm}
              className="px-6 py-3 bg-cream_light text-red_dark rounded-xl font-bold flex items-center gap-2 hover:bg-orange_light transition-all shadow-lg active:scale-95 z-10"
            >
              {isFormOpen ? <FaTimes /> : <FaPlus />}
              {isFormOpen ? "CERRAR" : "NUEVA MISIÓN"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <AnimatePresence mode="popLayout">
            {isFormOpen && (
              <motion.div 
                key="form-container"
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="lg:col-span-4"
              >
                  <MissionForm 
                    onSubmit={mutation.mutate}
                    characters={characters}
                    initialData={editingMission}
                    isEditing={!!editingMission}
                  />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            layout
            className={`${isFormOpen ? "lg:col-span-8" : "lg:col-span-12"} grid grid-cols-1 md:grid-cols-2 ${isFormOpen ? "" : "xl:grid-cols-3"} gap-6`}
          >
            <AnimatePresence mode="popLayout">
              {isLoading && missions.length === 0 ? (
                Array.from({ length: 6 }).map((_, i) => <MissionCardSkeleton key={`skeleton-${i}`} index={i} />)
              ) : missions.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center border-2 border-dashed border-red_light/20 rounded-3xl"
                >
                    <p className="text-cream_light/20 font-bold uppercase tracking-widest text-sm">No hay misiones activas en el radar</p>
                </motion.div>
              ) : (
                missions.map((mission, index) => (
                  <motion.div
                    key={mission.id}
                    layout
                    initial={(isFirstMount.current && !isLoading) ? false : { opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { delay: index * 0.1, type: "spring", stiffness: 100 }
                    }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  >
                    <MissionCard 
                      mission={mission}
                      onEdit={handleEdit}
                      onDelete={deleteMutation.mutate}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MissionsPage;
