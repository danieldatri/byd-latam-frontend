"use client"

import Link from "next/link"
import Image from "next/image"
import {Menu, X} from "lucide-react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {NavMenu} from "./nav-menu"
import {menuItems} from "@/data/menus"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
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

          {/* Search + Mobile menu button */}
          <div className="flex items-center space-x-2">
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
            <div className="container mx-auto px-4 py-3">
              <NavMenu menuItems={menuItems} variant="mobile" onLinkClick={() => setMenuOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}