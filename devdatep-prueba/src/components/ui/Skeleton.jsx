import { motion } from "framer-motion"
import { forwardRef } from "react"

const Skeleton = forwardRef(({ className = "", index = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-red_base_light/20 animate-pulse rounded-lg ${className}`}
    />
  )
})

export default Skeleton;