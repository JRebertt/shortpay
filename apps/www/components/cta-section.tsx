import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Pronto para simplificar seus pagamentos?</h2>
        <p className="text-xl mb-8">Junte-se a milhares de empresas que usam o ShortPay para gerenciar seus pagamentos Pix de forma eficiente.</p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full  md:w-64 bg-primary-foreground text-primary"
          />
          <Button size="lg" className="w-full md:w-auto bg-background text-foreground hover:bg-muted">
            Comece Agora
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection