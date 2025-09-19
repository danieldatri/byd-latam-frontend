"use client"

import Link from "next/link"
import React from "react"
import { Youtube, Instagram, Facebook, X } from "lucide-react"

type InternalLink = {
  name: string
  href: string
}

type SocialLink = {
  name: string
  url: string
  handle?: string
  icon?: string
}

type Props = {
  title?: string
  items: Array<InternalLink | SocialLink>
  variant?: "internal" | "social"
}

function resolveIcon(icon?: string) {
  if (!icon) return null

  switch (icon) {
    case 'Youtube':
      return <Youtube className="h-5 w-5" />
    case 'Instagram':
      return <Instagram className="h-5 w-5" />
    case 'Facebook':
      return <Facebook className="h-5 w-5" />
    case 'X':
      return <X className="h-5 w-5" />
    case 'TikTok':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      )
    default:
      return null
  }
}

export default function LinksList({ title, items, variant = "internal" }: Props) {
  if (variant === "social") {
    return (
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-4 text-header-footer-text text-center">Síguenos @bydlatamnews</h3>
        <div className="flex space-x-4 justify-center">
          {items.map((item) => {
            const social = item as SocialLink
            const IconNode = resolveIcon(social.icon)
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
                aria-label={social.name}
              >
                {IconNode}
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      {title && <h3 className="font-semibold mb-4 text-header-footer-text">{title}</h3>}
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={(item as InternalLink).href}>
            <Link
              href={(item as InternalLink).href}
              className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
            >
              {(item as InternalLink).name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
