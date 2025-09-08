import Link from "next/link"
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@bydlatamnews",
      handle: "@bydlatamnews",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/bydlatamnews",
      handle: "@bydlatamnews",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/bydlatamnews",
      handle: "@bydlatamnews",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: "https://x.com/bydlatamnews",
      handle: "@bydlatamnews",
    },
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

  return (
    <footer className="footer-component border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <img src="/logo-byd-latam-news.png" alt="BYD Latam News" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-header-footer-text max-w-md">
              Tu fuente confiable de noticias sobre BYD en Latinoamérica. Mantente informado sobre los últimos
              lanzamientos, novedades y análisis de BYD en toda la región.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-header-footer-text">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/noticias"
                  className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4 text-header-footer-text">Síguenos</h3>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-header-footer-text/80 hover:text-header-footer-text transition-colors group"
                  >
                    <IconComponent />
                    <div className="text-sm">
                      <div className="font-medium">{social.name}</div>
                      <div className="text-xs text-header-footer-text/60">{social.handle}</div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-header-footer-text/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-header-footer-text/80">
          <p>&copy; 2024 BYD Latam News. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacidad" className="hover:text-header-footer-text transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-header-footer-text transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
