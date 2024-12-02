'use client'

import { QRCodeCanvas } from 'qrcode.react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function QRCodeForm() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [qrData, setQrData] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input1 || !input2) {
      console.log({
        title: 'Error',
        description: 'Please fill in both fields.',
        variant: 'destructive',
      })
      return
    }
    setQrData(`${input1} - ${input2}`)
    console.log({
      title: 'QR Code Generated',
      description: 'Your QR code has been created successfully.',
    })
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input1">Input 1</Label>
            <Input
              id="input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter first input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input2">Input 2</Label>
            <Input
              id="input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter second input"
            />
          </div>
          <Button type="submit" className="w-full">
            Generate QR Code
          </Button>
        </form>
        {qrData && (
          <div className="mt-6 flex flex-col items-center">
            <h4 className="mb-2 text-lg font-semibold">QR Code:</h4>
            <QRCodeCanvas value={qrData} size={200} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
