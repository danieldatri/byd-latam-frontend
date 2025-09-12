"use client"

import Link from "next/link"

type MenuItem = {
  name: string
  href: string
}

type NavMenuProps = {
  menuItems: MenuItem[]
  className?: string
  onLinkClick?: () => void
  variant?: "desktop" | "mobile"
}

export function NavMenu({ menuItems, className = "", onLinkClick, variant = "desktop" }: NavMenuProps) {
  const baseClass = variant === "desktop" ? "flex items-center space-x-6" : "flex flex-col space-y-2"

  return (
    <nav className={`${baseClass} ${className}`} aria-label="Main navigation">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-header-footer-text hover:text-primary transition-colors"
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
