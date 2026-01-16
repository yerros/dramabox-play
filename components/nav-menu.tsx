"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Film, Star, TrendingUp, Sparkles, Shuffle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MenuItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
}

const menuItems: MenuItem[] = [
  {
    label: "VIP",
    href: "/category/vip",
    icon: <Star className="size-4" />,
    description: "Halaman VIP",
  },
  {
    label: "Dubindo",
    href: "/category/dubindo",
    icon: <Film className="size-4" />,
    description: "Ambil list drama dub indo",
  },
  {
    label: "Random Drama",
    href: "/category/random",
    icon: <Shuffle className="size-4" />,
    description: "Random Drama Video",
  },
  {
    label: "For You",
    href: "/category/foryou",
    icon: <Sparkles className="size-4" />,
    description: "For You (Untukmu)",
  },
  {
    label: "Terbaru",
    href: "/category/latest",
    icon: <TrendingUp className="size-4" />,
    description: "Drama Terbaru",
  },
  {
    label: "Trending",
    href: "/category/trending",
    icon: <TrendingUp className="size-4" />,
    description: "Trending Drama",
  },
  {
    label: "Pencarian Populer",
    href: "/category/popular-search",
    icon: <Search className="size-4" />,
    description: "Pencarian Populer",
  },
]

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Kategori
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg">
            <div className="p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="mt-0.5 shrink-0 text-muted-foreground">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

