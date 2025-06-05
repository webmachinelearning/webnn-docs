import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tag } from "./tag"
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link)

export function DemoCard({ title, description, imageUrl, demoUrl, codeUrl, tags, framework }) {
  let viewDemo = 'View Demo';
  let viewCode = 'View Code';
  const pathname = usePathname();
  if (pathname.indexOf("/zh") >-1) {
    viewDemo = '查看示例';
    viewCode = '查看代码';
  }

  return (
    <motion.div
      className="demo-card rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="relative flex flex-wrap gap-2 top-[-2.1rem] justify-end pr-2">
          <motion.span className="inline-block backdrop-blur-sm border-[1px] border-[#ffffff33] border-solid px-2 py-1 rounded-full text-xs text-white" whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>{framework}</motion.span>
          {tags.map((tag) => (
            <Tag key={tag} type={tag} />
          ))}
      </div>
      <div className="p-4 mt-[-1.5rem]">
        <h3 className="text-xl light-color font-title mb-2 mt-0">{title}</h3>
        <p className="text-gray-600 mb-4 min-h-12 text-[16px] !leading-none">{description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <MotionLink
            href={demoUrl}
            className="text-sm view-demo inline-block bg-[#03045e] text-white text-center px-1 py-1 rounded-full hover:bg-[#03045e] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {viewDemo}
          </MotionLink>
          <MotionLink
            href={codeUrl}
            className="text-sm view-code inline-block border-[1px] border-solid border-[#03045e] text-[#03045e] text-center px-1 py-1 rounded-full hover:bg-[#03045e] hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {viewCode}
          </MotionLink>
        </div>
      </div>
    </motion.div>
  )
}
