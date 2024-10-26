import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <svg
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="text-2xl font-bold">ShortPay</span>
            </div>
            <p className="text-gray-400 mb-4">© copyright ShortPay 2024. All rights reserved.</p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6" />
              <Instagram className="h-6 w-6" />
              <Twitter className="h-6 w-6" />
              <Linkedin className="h-6 w-6" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Páginas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Todos os Produtos</a></li>
              <li><a href="#" className="hover:text-gray-300">Plataforma</a></li>
              <li><a href="#" className="hover:text-gray-300">Clientes</a></li>
              <li><a href="#" className="hover:text-gray-300">Preços</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-gray-300">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-gray-300">Política de Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Registre-se</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Criar Conta</a></li>
              <li><a href="#" className="hover:text-gray-300">Entrar</a></li>
              <li><a href="#" className="hover:text-gray-300">Esqueceu a Senha</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <h3 className="text-lg font-semibold mb-4">Inscreva-se na nossa newsletter</h3>
          <div className="flex max-w-md">
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="bg-gray-800 text-white border-gray-700 focus:border-gray-600"
            />
            <Button className="ml-2">Inscrever</Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[30vw] font-bold text-white opacity-5 select-none">ShortPay</span>
      </div>
    </footer>
  )
}

export default Footer