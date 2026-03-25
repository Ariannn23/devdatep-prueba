import { FaGlobeAmericas, FaFistRaised, FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const MissionCard = forwardRef(({ mission, onEdit, onDelete }, ref) => {
  const getDifficultyStyles = (lvl) => {
    switch (lvl) {
      case "Bajo": return {
        badge: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/40 shadow-[0_0_10px_rgba(74,222,128,0.2)]",
        border: "border-t-[#4ade80]",
        glow: "from-[#4ade80]/10",
        icon: "text-[#4ade80]"
      };
      case "Medio": return {
        badge: "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/40 shadow-[0_0_10px_rgba(250,204,21,0.2)]",
        border: "border-t-[#facc15]",
        glow: "from-[#facc15]/10",
        icon: "text-[#facc15]"
      };
      case "Alto": return {
        badge: "text-[#2563eb] bg-[#2563eb]/10 border-[#2563eb]/40 shadow-[0_0_15px_rgba(37,99,235,0.3)]",
        border: "border-t-[#2563eb]",
        glow: "from-[#2563eb]/15",
        icon: "text-[#2563eb]"
      };
      case "Extremo": return {
        badge: "text-[#a855f7] bg-[#a855f7]/20 border-[#a855f7] animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.5)]",
        border: "border-t-[#a855f7]",
        glow: "from-[#a855f7]/20 via-[#a855f7]/5",
        icon: "text-[#a855f7]"
      };
      default: return {
        badge: "text-cream_light bg-white/5 border-white/10",
        border: "border-t-red_light/20",
        glow: "from-white/5",
        icon: "text-orange_base"
      };
    }
  };

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
