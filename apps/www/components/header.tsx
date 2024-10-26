"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span className="hidden font-bold sm:inline-block">
              ShortPay
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
              Recursos
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">
              Preços
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">
              Sobre
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contact">
              Contato
            </a>
          </nav>
        </div>
       
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <ModeToggle />
          <nav className="flex items-center">
            <Button variant="ghost" className="mr-2">
              Entrar
            </Button>
            <Button>Cadastrar</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

