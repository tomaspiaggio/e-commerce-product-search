import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              TechStore
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Deals
              </Link>
            </nav>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            The latest tech for teams building the future
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Discover cutting-edge technology products designed to empower your workflow and innovation.
          </p>

          {/* Search Bar */}
          <form action="/search" method="GET" className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Search for products..."
                className="pl-12 h-14 text-lg bg-card"
              />
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/search?q=laptop">
              <Button variant="secondary" size="sm">
                Laptops
              </Button>
            </Link>
            <Link href="/search?q=phone">
              <Button variant="secondary" size="sm">
                Smartphones
              </Button>
            </Link>
            <Link href="/search?q=headphones">
              <Button variant="secondary" size="sm">
                Headphones
              </Button>
            </Link>
            <Link href="/search?q=accessories">
              <Button variant="secondary" size="sm">
                Accessories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'MacBook Pro 16"', category: "Laptop", price: "$2,499", image: "/images/macbook-pro.jpg" },
            { name: "iPhone 15 Pro", category: "Smartphone", price: "$999", image: "/images/iphone-15-pro-max.jpg" },
            { name: "AirPods Max", category: "Headphones", price: "$549", image: "/images/airpods-max.jpg" },
          ].map((product, i) => (
            <Link href={`/product/${i + 1}`} key={i}>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group">
                <div className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl font-bold">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
