import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"

const PRODUCTS = [
  { id: 1, name: 'MacBook Pro 16"', category: "Laptop", price: 2499, image: "/images/macbook-pro.jpg" },
  { id: 2, name: 'MacBook Air 13"', category: "Laptop", price: 1199, image: "/images/macbook-air.jpg" },
  { id: 3, name: "iPhone 15 Pro Max", category: "Smartphone", price: 1199, image: "/images/iphone-15-pro-max.jpg" },
  { id: 4, name: "iPhone 15", category: "Smartphone", price: 799, image: "/images/iphone-15.jpg" },
  { id: 5, name: "AirPods Max", category: "Headphones", price: 549, image: "/images/airpods-max.jpg" },
  { id: 6, name: "AirPods Pro", category: "Headphones", price: 249, image: "/images/airpods-pro.jpg" },
  { id: 7, name: 'iPad Pro 12.9"', category: "Tablet", price: 1099, image: "/images/ipad-pro.jpg" },
  {
    id: 8,
    name: "Apple Watch Ultra",
    category: "Accessories",
    price: 799,
    image: "/images/apple-watch-ultra.jpg",
  },
  {
    id: 9,
    name: "Magic Keyboard",
    category: "Accessories",
    price: 149,
    image: "/images/magic-keyboard.jpg",
  },
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const params = await searchParams
  const query = params.q?.toLowerCase() || ""
  const category = params.category?.toLowerCase()

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery =
      !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)

    const matchesCategory = !category || product.category.toLowerCase() === category

    return matchesQuery && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 space-y-4">
          <form method="GET" action="/search">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search for products..."
                className="pl-12 h-12 bg-card"
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Link href="/search">
              <Button variant={!category ? "default" : "ghost"} size="sm">
                All
              </Button>
            </Link>
            <Link href="/search?category=laptop">
              <Button variant={category === "laptop" ? "default" : "ghost"} size="sm">
                Laptops
              </Button>
            </Link>
            <Link href="/search?category=smartphone">
              <Button variant={category === "smartphone" ? "default" : "ghost"} size="sm">
                Smartphones
              </Button>
            </Link>
            <Link href="/search?category=headphones">
              <Button variant={category === "headphones" ? "default" : "ghost"} size="sm">
                Headphones
              </Button>
            </Link>
            <Link href="/search?category=accessories">
              <Button variant={category === "accessories" ? "default" : "ghost"} size="sm">
                Accessories
              </Button>
            </Link>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{query ? `Search results for "${query}"` : "All Products"}</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group">
                  <div className="aspect-square bg-secondary/30 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-xl font-bold">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
            <Link href="/search">
              <Button className="mt-4">View All Products</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
