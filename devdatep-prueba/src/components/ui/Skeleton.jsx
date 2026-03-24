import { motion } from "framer-motion"

const Skeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-red_base rounded-lg shadow-lg p-4 border-2 border-red_light"
    >
      <div className="w-full h-48 bg-red_dark animate-pulse rounded-lg" />

      <div className="flex items-center mt-2">
        <div className="h-7 w-3/4 bg-red_dark animate-pulse rounded-md" />
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div className="w-4 h-4 bg-red_dark animate-pulse rounded-sm shrink-0" />
        <div className="h-6 w-1/2 bg-red_dark animate-pulse rounded-md" />
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div className="w-4 h-4 bg-red_dark animate-pulse rounded-sm shrink-0" />
        <div className="h-6 w-2/3 bg-red_dark animate-pulse rounded-md" />
      </div>
    </motion.div>
  )
}

export default Skeleton