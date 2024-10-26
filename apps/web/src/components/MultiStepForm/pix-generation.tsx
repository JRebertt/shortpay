import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clipboard, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import type { AddressFormData } from './address-form'
import type { PersonalInfoFormData } from './personal-info-form'

interface PixGenerationProps {
  pixData: {
    personalInfo: PersonalInfoFormData
    address: AddressFormData
  }
}

export function PixGeneration({ pixData }: PixGenerationProps) {
  const [pixCode, setPixCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  console.log(pixData)

  useEffect(() => {
    // Simulate PIX code generation
    setTimeout(() => {
      setPixCode(
        '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000',
      )
      setIsGenerating(false)
    }, 2000)
  }, [])

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (isGenerating) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-semibold">Gerando código PIX...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-6"
    >
      <QRCodeSVG value={pixCode} size={200} />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md rounded-md bg-gray-100 p-4"
      >
        <p className="break-all font-mono text-sm">{pixCode}</p>
      </motion.div>
      <Button
        onClick={handleCopyPixCode}
        className={`w-full max-w-md ${isCopied ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
        disabled={isCopied}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isCopied ? 'copied' : 'copy'}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copiado
              </>
            ) : (
              <>
                <Clipboard className="mr-2 h-4 w-4" />
                Copiar código PIX
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}
