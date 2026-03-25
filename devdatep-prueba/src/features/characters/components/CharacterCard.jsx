import { FaDragon, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`} className="block">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 5px 5px rgba(131, 28, 28, 0.5)",
        }}
        className="bg-red_base rounded-lg shadow-lg p-4 border-2 border-red_light hover:shadow-2xl cursor-pointer flex flex-col h-full"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-contain rounded-lg"
        />
        <div className="flex items-center gap-2 mt-2">
          <h2 className="text-xl font-bold font-body text-cream_light leading-tight">
            {character.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-4">
          <div className="flex items-center gap-2">
            <FaDragon className="text-cream_base" />
            <p className="font-body text-cream_base text-sm">{character.race}</p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <FaBolt className="text-cream_base" />
            <p className="font-body text-cream_base text-sm">{character.ki}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CharacterCard;
