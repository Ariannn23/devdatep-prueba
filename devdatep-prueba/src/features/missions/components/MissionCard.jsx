import { FaGlobeAmericas, FaFistRaised, FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { getDifficultyStyles } from "../utils/missionStyles";

const MissionCard = forwardRef(({ mission, onEdit, onDelete }, ref) => {
  const styles = getDifficultyStyles(mission.difficulty);

  return (
    <motion.div 
      ref={ref}
      whileHover={{ 
        y: -8,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
        transition: { duration: 0.3 }
      }}
      className={`relative group bg-[#8b3030] border border-white/5 ${styles.border} border-t-4 rounded-[2rem] p-7 transition-all h-full flex flex-col overflow-hidden shadow-xl`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className={`px-4 py-1 rounded-full text-[11px] font-black border-2 tracking-widest ${styles.badge}`}>
          {mission.difficulty.toUpperCase()}
        </span>
        <div className="flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <button 
            type="button"
            onClick={() => onEdit(mission)}
            className="p-3 bg-orange_base text-red_dark rounded-xl hover:scale-110 hover:shadow-[0_0_15px_rgba(245,166,35,0.4)] transition-all shadow-lg active:scale-90"
          >
            <FaEdit size={16} />
          </button>
          <button 
            type="button"
            onClick={() => onDelete(mission.id)}
            className="p-3 bg-cream_light text-red_base rounded-xl hover:scale-110 hover:shadow-[0_0_15px_rgba(245,240,220,0.4)] transition-all shadow-lg active:scale-90"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-title font-black text-cream_light mb-2 relative z-10 group-hover:text-cream_base transition-colors duration-300">
        {mission.title}
      </h3>

      <p className="text-cream_light/50 text-xs font-body mb-8 line-clamp-2 italic relative z-10 leading-relaxed">
        "{mission.description}"
      </p>

      <div className="flex flex-wrap gap-3 mt-auto relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold text-cream_light/80 border border-white/5 group-hover:bg-white/10 transition-all">
          <FaFistRaised className={styles.icon} /> <span>{mission.assignedCharacter}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold text-cream_light/80 border border-white/5 group-hover:bg-white/10 transition-all">
          <FaGlobeAmericas className="text-blue-400" /> <span>{mission.country}</span>
        </div>
      </div>
    </motion.div>
  );
});

export default MissionCard;
