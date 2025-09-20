"use client"

import Link from "next/link"
import Image from "next/image"
import {Menu, X} from "lucide-react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {NavMenu} from "./nav-menu"
import {menuItems} from "@/data/menus"
import {Globe} from "lucide-react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [countries, setCountries] = useState([])


  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("/api/countries")
      if (!res.ok) return setCountries([])
      const result = await res.json()
      setCountries(result)
    }
    fetchCountries()
  }, [])

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    window.location.href = `/region/${value}`
  }

  return (
    <div className="header-component w-full border-b opacity-85">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-byd-latam-news.png"
              alt="BYD Latam News"
              width={210}
              height={100}
              className="h-16 w-auto"
            />
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavMenu menuItems={menuItems} className="flex items-center space-x-6" variant="desktop" />
          </div>

          {/* Country select + Mobile menu button */}
          <div className="flex items-center md:w-auto space-x-2">
            {/* Country select with world icon - Desktop */}
            <div className="hidden md:flex items-center">
              <Globe className="mr-2 h-5 w-5 text-header-footer-text" />
              <select
                aria-label="Seleccionar país"
                onChange={handleCountrySelect}
                className="rounded-md border border-gray-600 px-3 py-2 text-sm bg-header-footer-bg text-header-footer-text focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
                defaultValue=""
                style={{ minWidth: 160 }}
              >
                <option value="" disabled className="text-gray-400 bg-header-footer-bg">
                  Selecciona país
                </option>
                {countries.map((country: any) => (
                  <option key={country._id} value={country.slug.current} className="bg-header-footer-bg text-header-footer-text">
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Mobile menu button only, aligned right */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-header-footer-text"
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />

          <div className="md:hidden bg-header-footer-bg text-header-footer-text opacity-85 border-t z-50 relative pointer-events-auto">
            <div className="container mx-auto px-4 py-3 space-y-4">
              {/* Mobile region select inside dropdown */}
              <div className="flex items-center w-full mb-2">
                <Globe className="mr-2 h-5 w-5 text-header-footer-text" />
                <select
                  aria-label="Seleccionar país"
                  onChange={handleCountrySelect}
                  className="rounded-md border border-gray-600 px-3 py-3 text-base bg-header-footer-bg text-header-footer-text focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors w-full"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-400 bg-header-footer-bg">
                    Todas las Regiones
                  </option>
                  {countries.map((country: any) => (
                    <option key={country._id} value={country.slug.current} className="bg-header-footer-bg text-header-footer-text">
                      {country.emoji ? `${country.emoji} ` : ""}{country.name}
                    </option>
                  ))}
                </select>
              </div>
              <NavMenu menuItems={menuItems} variant="mobile" onLinkClick={() => setMenuOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}