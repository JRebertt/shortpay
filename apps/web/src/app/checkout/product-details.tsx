import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProductDetails() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/placeholder.svg"
          alt="Product"
          width={300}
          height={300}
          className="mb-6 rounded-lg shadow-lg"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="mb-2 text-2xl font-bold">Premium Widget</h2>
        <p className="mb-4 text-gray-600">
          High-quality, durable, and efficient
        </p>
        <p className="text-3xl font-bold text-primary">$99.99</p>
      </motion.div>
    </div>
  )
}
