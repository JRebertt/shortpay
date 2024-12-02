'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CheckoutForm({ currentStep, onStepComplete }) {
  const [stepData, setStepData] = useState({})

  function handleInputChange(event) {
    setStepData({ ...stepData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onStepComplete(stepData)
    setStepData({})
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.3 },
    }),
  }

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>
            <div className="space-y-4">
              {['cpf', 'name', 'email'].map((field, index) => (
                <motion.div key={field} variants={inputVariants} custom={index}>
                  <Label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </motion.div>
              ))}
            </div>
          </>
        )
      case 1:
        return (
          <>
            <h2 className="mb-6 text-2xl font-bold">Address</h2>
            <div className="space-y-4">
              {[
                'cep',
                'street',
                'number',
                'complement',
                'neighborhood',
                'city',
                'state',
              ].map((field, index) => (
                <motion.div key={field} variants={inputVariants} custom={index}>
                  <Label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    onChange={handleInputChange}
                    required={field !== 'complement'}
                    className="mt-1"
                  />
                </motion.div>
              ))}
            </div>
          </>
        )
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {renderStep()}
      <motion.div variants={inputVariants} custom={8}>
        <Button type="submit" className="mt-6 w-full">
          {currentStep === 1 ? 'Generate QR Code' : 'Next'}
        </Button>
      </motion.div>
    </motion.form>
  )
}
