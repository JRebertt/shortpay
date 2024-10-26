"use client"

import React, { useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"

interface Testimonial {
  name: string
  role: string
  content: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: "Nathan Hill",
    role: "Analista de Investimentos",
    content: "O melhor investimento que fizemos em anos. Não é apenas uma ferramenta; é um divisor de águas que impulsionou nosso negócio.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Sarah Johnson",
    role: "Diretora Criativa & Proprietária",
    content: "Fiz um salto com a ajuda da IA. Foi tão fácil de usar. Estou tão feliz que isso aconteceu porque revolucionou todo o meu modelo de negócios e processo de produção.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Cathy Lee",
    role: "Gerente de Produto",
    content: "Não consigo imaginar voltar a como as coisas eram antes desta IA. Ela não só melhorou minha eficiência no trabalho, mas também minha vida diária.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Grace Hall",
    role: "Especialista em Marketing",
    content: "É incrivelmente intuitivo e fácil de usar. Mesmo aqueles sem experiência técnica podem aproveitar seu poder para melhorar seus fluxos de trabalho.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Quinn Taylor",
    role: "Gerente de Crescimento",
    content: "É um divisor de águas para o nosso negócio. As informações que fornece são inestimáveis e impulsionaram um crescimento substancial para nós.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Frank Moore",
    role: "Gerente de Projetos",
    content: "Uma solução robusta que se encaixa perfeitamente em nosso fluxo de trabalho. Simplificou significativamente nossos processos.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Mia Turner",
    role: "Integradora de Sistemas",
    content: "É simplesmente revolucionário! A maneira como se integra com nossos sistemas existentes e melhora nossa eficiência é notável.",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    name: "Samuel Lee",
    role: "Futurista",
    content: "É o futuro, agora. Adotar esta IA nos colocou anos à frente da concorrência em termos de eficiência operacional e inovação.",
    image: "/placeholder.svg?height=80&width=80"
  },
]

function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section ref={containerRef} className="py-20 bg-gray-50 overflow-hidden">
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">O Que Nossos Clientes Dizem</h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          O ShortPay é usado por milhões de pessoas ao redor do mundo. 
          Nossas APIs têm bases de fãs e as pessoas lutam por nós no twitter.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialColumn testimonials={testimonials.slice(0, 3)} speed={20} />
          <TestimonialColumn testimonials={testimonials.slice(3, 6)} speed={25} initialOffset={100} />
          <TestimonialColumn testimonials={testimonials.slice(6)} speed={15} initialOffset={200} />
        </div>
      </motion.div>
    </section>
  )
}

function TestimonialColumn({ testimonials, speed = 20, initialOffset = 0 }: { 
  testimonials: Testimonial[]; 
  speed?: number;
  initialOffset?: number;
}) {
  const columnRef = useRef<HTMLDivElement>(null)
  const columnControls = useAnimation()

  useEffect(() => {
    const animateColumn = async () => {
      if (columnRef.current) {
        const columnHeight = columnRef.current.scrollHeight / 2
        await columnControls.start({
          y: [-initialOffset, -(columnHeight + initialOffset)],
          transition: {
            duration: columnHeight / speed,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        })
      }
    }

    animateColumn()
  }, [columnControls, speed, initialOffset])

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          ref={columnRef}
          animate={columnControls}
          className="space-y-8"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-start mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm">{testimonial.content}</p>
    </div>
  )
}

export default TestimonialSection