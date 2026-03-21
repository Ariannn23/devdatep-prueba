import { motion } from "framer-motion"

const Skeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-red_base animate-pulse rounded-lg shadow-lg p-4 border-2 border-red_light h-72 flex items-center justify-center"
    >
      <p className="font-body text-cream_base">Cargando personajes...</p>
    </motion.div>
  )
}

export default Skeleton