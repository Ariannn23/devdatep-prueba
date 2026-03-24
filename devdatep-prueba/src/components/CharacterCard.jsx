import { FaDragon, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const CharacterCard = ({ character }) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 5px 5px rgba(131, 28, 28, 0.5)",
      }}
      className="bg-red_base rounded-lg shadow-lg p-4 border-2 border-red_light hover:shadow-2xl cursor-pointer flex flex-col"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-contain rounded-lg"
      />
      <div className="flex items-center gap-2 mt-2">
        <h2 className="text-xl font-bold font-body text-cream_light">
          {character.name}
        </h2>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <FaDragon className="text-cream_base" />
        <p className="font-body text-cream_base">{character.race}</p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <FaBolt className="text-cream_base" />
        <p className="font-body text-cream_base">{character.ki}</p>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
