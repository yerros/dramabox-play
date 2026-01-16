"use client"

import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavMenu } from "@/components/nav-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Header() {
  const router = useRouter()

  const handleSearchClick = () => {
    router.push("/search")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            DramaBox
          </h1>
        </Link>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex">
          <NavMenu />
        </div>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari drama..."
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              onFocus={handleSearchClick}
              onClick={handleSearchClick}
              readOnly
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
            onClick={handleSearchClick}
            asChild
          >
            <Link href="/search">
              <Search className="size-5" />
            </Link>
          </Button>

          {/* Mobile Menu Button with NavMenu */}
          <div className="md:hidden">
            <NavMenu />
          </div>

          {/* Desktop Menu Button (optional, bisa dihapus jika tidak perlu) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            aria-label="Menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

