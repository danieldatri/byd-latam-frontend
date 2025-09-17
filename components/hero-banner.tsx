"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const heroMessages = [
  "Tu fuente confiable de noticias sobre BYD en Latinoamérica. Mantente al día con los últimos lanzamientos, análisis y novedades.",
  "Descubre las últimas innovaciones en movilidad eléctrica de BYD en toda la región latinoamericana.",
  "Cobertura exclusiva de lanzamientos, análisis de mercado y tendencias de BYD en América Latina.",
  "La información más actualizada sobre la expansión de BYD en México, Brasil, Argentina, Chile y más países.",
  "Noticias, reviews y análisis profundos sobre los vehículos eléctricos que están transformando Latinoamérica.",
]

export function HeroBanner() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
            src="/banner-byd-latam-news.png"
          alt="BYD Latam News - Vehículos BYD"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-center pb-16">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="min-h-[80px] md:min-h-[60px] flex items-center justify-center">
            <p
              key={currentMessageIndex}
              className="text-lg md:text-xl text-white font-medium max-w-3xl mx-auto text-pretty leading-relaxed animate-in fade-in duration-1000 drop-shadow-lg"
            >
              {heroMessages[currentMessageIndex]}
            </p>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroMessages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMessageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentMessageIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir al mensaje ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
