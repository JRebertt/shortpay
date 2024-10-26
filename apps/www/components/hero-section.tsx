"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Search, Trash2, Archive, Clock, Users, ShoppingBag, Bell, MoreVertical } from "lucide-react"

interface Transaction {
  id: number
  amount: string
  date: string
}

const generateTransactions = (): Transaction[] => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    amount: (Math.floor(Math.random() * 100000) / 100).toFixed(2),
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export function HeroSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setTransactions(generateTransactions())
  }, [])

  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <BackgroundBeams />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-300 dark:to-zinc-100"
            >
              <TextGenerateEffect words="Simplifique Pagamentos com ShortPay" />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Integre múltiplos gateways de pagamento em uma única plataforma e gerencie pagamentos Pix com facilidade.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button size="lg" className="w-full sm:w-auto bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
                Comece agora
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-800 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800">
                Agende uma demo
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            {/* Imagem do Hero 
            Descomente e ajuste o src conforme necessário
            <div className="relative w-full h-[600px]">
              <Image
                src="/path-to-your-image.jpg"
                alt="ShortPay Dashboard Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-xl"
              />
            </div>
            */}
            
            {/* Interface de Transações */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
              <div className="flex border-b border-zinc-200 dark:border-zinc-700">
                <div className="w-64 bg-zinc-100 dark:bg-zinc-900 p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 mr-2"></div>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">ShortPay</span>
                  </div>
                  <nav>
                    <ul className="space-y-2">
                      <li className="flex items-center text-zinc-900 dark:text-zinc-100 font-medium">
                        <Trash2 className="w-5 h-5 mr-2" /> Transações
                      </li>
                      <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <Archive className="w-5 h-5 mr-2" /> Relatórios
                      </li>
                      <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <Clock className="w-5 h-5 mr-2" /> Histórico
                      </li>
                      <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <Users className="w-5 h-5 mr-2" /> Clientes
                      </li>
                      <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <ShoppingBag className="w-5 h-5 mr-2" /> Produtos
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Transações</h2>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                        <Bell className="w-5 h-5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Buscar transações"
                      className="pl-10 w-full bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                    />
                  </div>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-600 mr-3"></div>
                        <div>
                          <p className="font-medium text-zinc-800 dark:text-zinc-200">Pagamento #00{transaction.id}</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            R$ {transaction.amount} - {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection