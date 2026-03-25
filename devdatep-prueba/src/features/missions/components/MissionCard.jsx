import { FaGlobeAmericas, FaFistRaised, FaTrash, FaEdit } from "react-icons/fa";

const MissionCard = ({ mission, onEdit, onDelete }) => {
  const getDifficultyStyles = (lvl) => {
    switch (lvl) {
      case "Bajo": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medio": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Alto": return "text-orange-base bg-orange-base/10 border-orange-base/20";
      case "Extremo": return "text-red-500 bg-red-400/10 border-red-400/20 animate-pulse";
      default: return "";
    }
  };

  return (
    <div className="bg-red_base border-2 border-red_light/20 p-6 rounded-3xl group hover:border-orange_base/30 transition-all shadow-xl h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border-2 ${getDifficultyStyles(mission.difficulty)}`}>
          {mission.difficulty.toUpperCase()}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(mission)}
            className="p-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg"
          >
            <FaEdit size={12} />
          </button>
          <button 
            onClick={() => onDelete(mission.id)}
            className="p-2 bg-red-600/10 text-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-lg"
          >
            <FaTrash size={12} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-title font-bold text-cream_light mb-2">
        {mission.title}
      </h3>

      <p className="text-cream_light/60 text-xs font-body mb-6 line-clamp-2 italic">
        "{mission.description}"
      </p>

      <div className="flex flex-wrap gap-3 mt-auto">
        <div className="flex items-center gap-2 px-3 py-2 bg-red_dark/40 rounded-xl text-[10px] text-cream_light border border-red_light/10">
          <FaFistRaised className="text-orange_base" /> {mission.assignedCharacter}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-red_dark/40 rounded-xl text-[10px] text-cream_light border border-red_light/10">
          <FaGlobeAmericas className="text-blue-400" /> {mission.country}
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
