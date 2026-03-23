import { FaUser, FaDragon } from "react-icons/fa"
import { motion } from "framer-motion"

const CharacterCard = ({ character, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(250, 212, 139, 0.5)" }}
      className="bg-red_base rounded-lg shadow-lg p-4 border-2 border-red_light hover:shadow-2xl cursor-pointer"
    >
      <img src={character.image} alt={character.name} className="w-full h-48 object-contain rounded-lg" />
      <div className="flex items-center gap-2 mt-2">
        <FaUser className="text-cream_base" />
        <h2 className="text-lg font-bold font-body text-cream_light">{character.name}</h2>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <FaDragon className="text-cream_base" />
        <p className="font-body text-cream_base">{character.race}</p>
      </div>
    </motion.div>
  )
}

export default CharacterCard