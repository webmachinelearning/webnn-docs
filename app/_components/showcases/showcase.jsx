"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DemoCard } from "./democard"

export function Showcase({ demos }) {
  const [filter, setFilter] = useState("All")

  const filteredDemos = filter === "All" ? demos : demos.filter((demo) => demo.tags.includes(filter))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-center space-x-4">
        {["All", "CPU", "GPU", "NPU"].map((tag) => (
          <motion.button
            key={tag}
            className={`hardware-tag px-4 py-1 text-xs rounded-full ${filter === tag ? "bg-gray-100" : "bg-gray-50 text-gray-800"}`}
            onClick={() => setFilter(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence>
          {filteredDemos.map((demo) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DemoCard {...demo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

