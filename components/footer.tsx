import Link from "next/link"
import LinksList from "./links-list"
import { quickLinks, socialLinks } from "@/data/menus"

export function Footer() {
  // quickLinks and socialLinks are imported from `@/data/menus`

  return (
    <footer className="footer-component border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 flex flex-col items-center">
            <Link href="/" className="mb-4 w-full flex justify-center">
              <img src="/logo-byd-latam-news.png" alt="BYD Latam News" className="h-50 w-auto mx-auto" />
            </Link>
            <p className="text-sm text-header-footer-text max-w-md">
              Tu fuente confiable de noticias sobre BYD en Latinoamérica. Mantente informado sobre los últimos
              lanzamientos, novedades y análisis de BYD en toda la región.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <LinksList title="Enlaces Rápidos" items={quickLinks} variant="internal" />
          </div>

          {/* Social Media */}
          <div>
            <LinksList title="Síguenos" items={socialLinks} variant="social" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-header-footer-text/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-header-footer-text/80">
          <p>&copy; 2024 BYD Latam News. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-header-footer-text transition-colors">
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
