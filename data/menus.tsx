export const links = [
  { name: "Inicio", href: "/", showInHeader: true, showInFooter: false },
  { name: "Artículos", href: "/articles", showInHeader: true, showInFooter: true },
  { name: "Reviews", href: "/reviews", showInHeader: false, showInFooter: false },
  { name: "Contacto", href: "/contacto", showInHeader: false, showInFooter: true },
  { name: "Sobre Nosotros", href: "/sobre-nosotros", showInHeader: false, showInFooter: true },
]

export const menuItems = links.filter((l) => l.showInHeader).map(({ name, href }) => ({ name, href }))

export const quickLinks = links.filter((l) => l.showInFooter).map(({ name, href }) => ({ name, href }))

export const socialLinks = [
  { name: "YouTube", icon: 'Youtube', url: "https://youtube.com/@bydlatamnews", handle: "@bydlatamnews" },
  { name: "Instagram", icon: 'Instagram', url: "https://instagram.com/bydlatamnews", handle: "@bydlatamnews" },
  { name: "Facebook", icon: 'Facebook', url: "https://facebook.com/bydlatamnews", handle: "@bydlatamnews" },
  { name: "X (Twitter)", icon: 'X', url: "https://x.com/bydlatamnews", handle: "@bydlatamnews" },
  { name: "TikTok", icon: 'TikTok', url: "https://tiktok.com/@bydlatamnews", handle: "@bydlatamnews" },
]

export type MenuItem = typeof menuItems[number]
export type QuickLink = typeof quickLinks[number]
export type SocialLink = typeof socialLinks[number]

export const __menuTypeCheck: { menu: MenuItem[]; quick: QuickLink[]; social: SocialLink[] } = {
  menu: menuItems,
  quick: quickLinks,
  social: socialLinks,
}
