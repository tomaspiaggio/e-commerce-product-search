import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import { CartCount } from "./cart-count"

export function Header() {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-foreground flex-shrink-0">
            TechStore
          </Link>

          <form action="/search" method="GET" className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" name="q" placeholder="Search products..." className="pl-9 bg-card" />
            </div>
          </form>

          <nav className="flex items-center gap-2">
            <Link href="/search" className="hidden md:inline-flex">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <CartCount />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
