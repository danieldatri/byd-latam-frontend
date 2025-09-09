import Link from "next/link"
import Image from "next/image"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="header-component sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-byd-latam-news.png"
              alt="BYD Latam News"
              width={210}
              height={100}
              className="h-25 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-header-footer-text hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link
              href="/news"
              className="text-sm font-medium text-header-footer-text hover:text-primary transition-colors"
            >
              News
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-header-footer-text hover:text-primary transition-colors"
            >
              Reviews
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar noticias..." className="pl-10 w-64 bg-input text-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden text-header-footer-text hover:text-primary">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
