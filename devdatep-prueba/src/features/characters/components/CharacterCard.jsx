import { forwardRef } from "react";
import { FaDragon, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CharacterCard = forwardRef(({ character, index, isLoading, isFirstMount }, ref) => {
  return (
    <Link to={`/character/${character.id}`} className="block">
      <motion.div
        layout
        initial={(isFirstMount && !isLoading) ? false : { opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { delay: index * 0.05, type: "spring", stiffness: 100 }
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4), 0px 0px 20px rgba(245, 166, 35, 0.2)",
          borderColor: "#f5a623"
        }}
        transition={{ duration: 0.3 }}
        className="bg-red_base rounded-[2.5rem] shadow-xl p-6 border-2 border-red_light/20 cursor-pointer flex flex-col h-full relative overflow-hidden group transition-colors"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange_base/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-56 object-contain rounded-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transition-all duration-500"
        />
        
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-title font-black text-cream_light leading-tight group-hover:text-orange_base transition-colors">
            {character.name}
          </h2>
          
          <div className="flex items-center justify-between pt-2 border-t border-red_light/10">
            <div className="flex items-center gap-2 px-3 py-1 bg-red_dark/40 rounded-full border border-red_light/5">
              <FaDragon className="text-orange_base text-xs" />
              <span className="font-bold text-[10px] text-cream_light uppercase tracking-wider">{character.race}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red_dark/40 rounded-full border border-red_light/5">
              <FaBolt className="text-yellow-400 text-xs animate-pulse" />
              <span className="font-bold text-[10px] text-cream_light uppercase tracking-wider">{character.ki}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

export default CharacterCard;
