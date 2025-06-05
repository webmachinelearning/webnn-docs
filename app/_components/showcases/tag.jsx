import { motion } from "framer-motion"

const tagColors = {
  CPU: "bg-[#4cc9f0aa]",
  GPU: "bg-[#f72684aa]",
  NPU: "bg-[#03045eaa]",
}

export function Tag({ type }) {
  return (
    <motion.span
      className={`inline-block px-2 py-1 border-[1px] backdrop-blur-sm border-[#ffffff33] border-solid rounded-full text-xs text-white ${tagColors[type]}`}
      // whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      {type}
    </motion.span>
  )
}

