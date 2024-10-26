"use client"

import React from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import DashboardPreview from "@/components/dashboard-preview"
import FeaturesSection from "@/components/features-section"
import CTASection from "@/components/cta-section"
import TestimonialSection from "@/components/testimonial-section"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <DashboardPreview />
      <FeaturesSection />
      <TestimonialSection />
      {/* <CTASection /> */}
      <Footer />
    </div>
  )
}
