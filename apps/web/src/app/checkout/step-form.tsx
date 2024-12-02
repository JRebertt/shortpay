import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function StepForm({ currentStep, onStepComplete }) {
  const [stepData, setStepData] = useState({})

  function handleInputChange(event) {
    setStepData({ ...stepData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onStepComplete(stepData)
    setStepData({})
  }

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <h2 className="mb-4 text-lg font-semibold">Address</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  name="cep"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  name="street"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  name="number"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h2 className="mb-4 text-lg font-semibold">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="complement">Complement</Label>
                <Input
                  id="complement"
                  name="complement"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {renderStep()}
      <Button type="submit" className="mt-6">
        {currentStep === 2 ? 'Generate QR Code' : 'Next'}
      </Button>
    </form>
  )
}
