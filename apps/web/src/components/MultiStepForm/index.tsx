/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { AddressForm, type AddressFormData } from './address-form'
import {
  PersonalInfoForm,
  type PersonalInfoFormData,
} from './personal-info-form'
import { PixGeneration } from './pix-generation'
import { ProgressBar } from './progress-bar'

interface FormData {
  personalInfo: PersonalInfoFormData
  address: AddressFormData
  pix: null | string
}

const steps = [
  {
    title: 'Informações Pessoais',
    description: 'Preencha seus dados pessoais',
  },
  { title: 'Endereço', description: 'Informe seu endereço' },
  { title: 'Geração de PIX', description: 'Gere seu código PIX' },
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      email: '',
      name: '',
      cpf: '',
    },
    address: {
      number: '',
      cep: '',
      street: '',
      complement: '',
    },
    pix: null,
  })

  const handleNextStep = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFormData((prev) => ({
      ...prev,
      [Object.keys(data)[0]]: data[Object.keys(data)[0]],
    }))
    setCurrentStep((prev) => prev + 1)
    setIsLoading(false)
  }

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            switch (currentStep) {
              case 0:
                return <PersonalInfoForm onSubmit={handleNextStep} />
              case 1:
                return <AddressForm onSubmit={handleNextStep} />
              case 2:
                return <PixGeneration pixData={formData} />
              default:
                return null
            }
          })()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg p-6 shadow-lg">
      <ProgressBar steps={steps} currentStep={currentStep} />
      <h2 className="mb-2 text-2xl font-bold">{steps[currentStep].title}</h2>
      <p className="mb-6 text-gray-600">{steps[currentStep].description}</p>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        renderStep()
      )}
    </div>
  )
}
