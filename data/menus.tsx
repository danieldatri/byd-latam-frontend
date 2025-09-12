import { Youtube, Instagram, Facebook, X } from "lucide-react"

export const links = [
  { name: "Inicio", href: "/", showInHeader: true, showInFooter: false },
  { name: "News", href: "/news", showInHeader: true, showInFooter: true },
  { name: "Reviews", href: "/reviews", showInHeader: true, showInFooter: true },
  { name: "Contacto", href: "/contacto", showInHeader: false, showInFooter: true },
  { name: "Sobre Nosotros", href: "/sobre-nosotros", showInHeader: false, showInFooter: true },
]

export const menuItems = links.filter((l) => l.showInHeader).map(({ name, href }) => ({ name, href }))

export const quickLinks = links.filter((l) => l.showInFooter).map(({ name, href }) => ({ name, href }))

export const socialLinks = [
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@bydlatamnews", handle: "@bydlatamnews" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/bydlatamnews", handle: "@bydlatamnews" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/bydlatamnews", handle: "@bydlatamnews" },
  { name: "X (Twitter)", icon: X, url: "https://x.com/bydlatamnews", handle: "@bydlatamnews" },
  {
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    url: "https://tiktok.com/@bydlatamnews",
    handle: "@bydlatamnews",
  },
]

export type MenuItem = typeof menuItems[number]
export type QuickLink = typeof quickLinks[number]
export type SocialLink = typeof socialLinks[number]
