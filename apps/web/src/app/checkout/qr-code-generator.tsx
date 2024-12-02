'use client'

import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

export default function QRCodeGenerator({ data }) {
  const [qrCodeData, setQRCodeData] = useState('')

  useEffect(
    function () {
      function generateQRCode() {
        // In a real application, you would make an API call here
        // For this example, we'll just stringify the data
        const qrData = JSON.stringify(data)
        setQRCodeData(qrData)
      }

      generateQRCode()
    },
    [data],
  )

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-2xl font-bold"
      >
        Your QR Code
      </motion.h2>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <QRCodeSVG value={qrCodeData} size={256} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-sm text-gray-600"
      >
        Scan this code to complete your purchase
      </motion.p>
    </div>
  )
}
