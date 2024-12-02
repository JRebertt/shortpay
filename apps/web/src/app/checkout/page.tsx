'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import CheckoutForm from './checkout-form'
import ProductDetails from './product-details'
import QRCodeGenerator from './qr-code-generator'

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  function handleStepComplete(stepData) {
    setFormData({ ...formData, ...stepData })
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ProductDetails />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep < 2 ? (
                  <CheckoutForm
                    currentStep={currentStep}
                    onStepComplete={handleStepComplete}
                  />
                ) : (
                  <QRCodeGenerator data={formData} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
