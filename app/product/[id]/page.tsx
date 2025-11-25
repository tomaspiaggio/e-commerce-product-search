import { Header } from "@/components/header"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Star, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

const PRODUCTS = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    category: "Laptop",
    price: 2499,
    image: "/images/macbook-pro.jpg",
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro or M3 Max chip — with up to an 18-core CPU and up to a 40-core GPU — MacBook Pro delivers exceptional performance for demanding workflows.",
    features: [
      "Apple M3 Pro or M3 Max chip",
      "16.2-inch Liquid Retina XDR display",
      "Up to 128GB unified memory",
      "Up to 8TB SSD storage",
      "Up to 22 hours battery life",
      "1080p FaceTime HD camera",
    ],
    specs: [
      { label: "Display", value: "16.2-inch Liquid Retina XDR" },
      { label: "Chip", value: "Apple M3 Pro" },
      { label: "Memory", value: "36GB unified memory" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Weight", value: "4.7 pounds" },
      { label: "Battery", value: "Up to 22 hours" },
    ],
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: 'MacBook Air 13"',
    category: "Laptop",
    price: 1199,
    image: "/images/macbook-air.jpg",
    description:
      "MacBook Air with M2 chip. Supercharged by the next-generation M2 chip, the redesigned MacBook Air combines incredible performance and up to 18 hours of battery life into its strikingly thin aluminum enclosure.",
    features: [
      "Apple M2 chip",
      "13.6-inch Liquid Retina display",
      "Up to 24GB unified memory",
      "Up to 2TB SSD storage",
      "Up to 18 hours battery life",
      "Fanless design",
    ],
    specs: [
      { label: "Display", value: "13.6-inch Liquid Retina" },
      { label: "Chip", value: "Apple M2" },
      { label: "Memory", value: "8GB unified memory" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Weight", value: "2.7 pounds" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    rating: 4.9,
    reviews: 523,
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    price: 1199,
    image: "/images/iphone-15-pro-max.jpg",
    description:
      "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    features: [
      "A17 Pro chip with 6-core GPU",
      "6.7-inch Super Retina XDR display",
      "Pro camera system with 5x Telephoto",
      "Titanium design",
      "Action button",
      "USB-C connector",
    ],
    specs: [
      { label: "Display", value: "6.7-inch Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP Main | 12MP Ultra Wide | 12MP Telephoto" },
      { label: "Storage", value: "256GB" },
      { label: "Weight", value: "7.81 ounces" },
      { label: "Battery", value: "Up to 29 hours video playback" },
    ],
    rating: 4.7,
    reviews: 891,
  },
  {
    id: 4,
    name: "iPhone 15",
    category: "Smartphone",
    price: 799,
    image: "/images/iphone-15.jpg",
    description:
      "iPhone 15. A huge leap with Dynamic Island. A transformative new camera for more detail than ever. The powerful A16 Bionic chip. All in an elegant design.",
    features: [
      "A16 Bionic chip",
      "6.1-inch Super Retina XDR display",
      "Advanced dual-camera system",
      "Ceramic Shield front",
      "Emergency SOS via satellite",
      "USB-C connector",
    ],
    specs: [
      { label: "Display", value: "6.1-inch Super Retina XDR" },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Camera", value: "48MP Main | 12MP Ultra Wide" },
      { label: "Storage", value: "128GB" },
      { label: "Weight", value: "6.02 ounces" },
      { label: "Battery", value: "Up to 20 hours video playback" },
    ],
    rating: 4.6,
    reviews: 1247,
  },
  {
    id: 5,
    name: "AirPods Max",
    category: "Headphones",
    price: 549,
    image: "/images/airpods-max.jpg",
    description:
      "AirPods Max reimagine over-ear headphones. Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences.",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio with dynamic head tracking",
      "Computational audio",
      "Premium materials",
      "Up to 20 hours battery life",
    ],
    specs: [
      { label: "Chip", value: "Apple H1" },
      { label: "Audio", value: "High-fidelity audio" },
      { label: "Noise Control", value: "Active Noise Cancellation & Transparency" },
      { label: "Battery", value: "Up to 20 hours" },
      { label: "Weight", value: "13.6 ounces" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
    ],
    rating: 4.5,
    reviews: 445,
  },
  {
    id: 6,
    name: "AirPods Pro",
    category: "Headphones",
    price: 249,
    image: "/images/airpods-pro.jpg",
    description:
      "AirPods Pro feature up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking for immersive sound.",
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Personalized Spatial Audio",
      "MagSafe charging case",
      "Sweat and water resistant",
      "Up to 6 hours listening time",
    ],
    specs: [
      { label: "Chip", value: "Apple H2" },
      { label: "Audio", value: "Adaptive Audio" },
      { label: "Noise Control", value: "Up to 2x Active Noise Cancellation" },
      { label: "Battery", value: "Up to 6 hours (30 with case)" },
      { label: "Weight", value: "0.19 ounces (per earbud)" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
    ],
    rating: 4.8,
    reviews: 2134,
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    category: "Tablet",
    price: 1099,
    image: "/images/ipad-pro.jpg",
    description:
      "iPad Pro features the powerful M2 chip, a stunning Liquid Retina XDR display, and blazing‑fast wireless connectivity. It works with Apple Pencil and Magic Keyboard.",
    features: [
      "Apple M2 chip",
      "12.9-inch Liquid Retina XDR display",
      "ProMotion technology",
      "Pro camera system",
      "Face ID",
      "All-day battery life",
    ],
    specs: [
      { label: "Display", value: "12.9-inch Liquid Retina XDR" },
      { label: "Chip", value: "Apple M2" },
      { label: "Storage", value: "128GB" },
      { label: "Camera", value: "12MP Wide | 10MP Ultra Wide" },
      { label: "Weight", value: "1.5 pounds" },
      { label: "Battery", value: "Up to 10 hours" },
    ],
    rating: 4.7,
    reviews: 678,
  },
  {
    id: 8,
    name: "Apple Watch Ultra",
    category: "Accessories",
    price: 799,
    image: "/images/apple-watch-ultra.jpg",
    description:
      "Apple Watch Ultra is designed for endurance, exploration, and adventure. Featuring a 49mm titanium case, extra-long battery life, and advanced sensors for serious workouts.",
    features: [
      "49mm titanium case",
      "Up to 36 hours battery life",
      "Precision dual-frequency GPS",
      "Depth gauge and water temperature sensor",
      "Action button",
      "Extra-loud siren",
    ],
    specs: [
      { label: "Display", value: "1.92-inch Always-On Retina" },
      { label: "Case", value: "49mm titanium" },
      { label: "Battery", value: "Up to 36 hours" },
      { label: "Water Resistance", value: "100m" },
      { label: "Weight", value: "2.16 ounces" },
      { label: "Connectivity", value: "GPS + Cellular" },
    ],
    rating: 4.9,
    reviews: 512,
  },
  {
    id: 9,
    name: "Magic Keyboard",
    category: "Accessories",
    price: 149,
    image: "/images/magic-keyboard.jpg",
    description:
      "Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features. With an improved scissor mechanism, the keys are more stable.",
    features: [
      "Wireless and rechargeable",
      "Scissor mechanism",
      "Numeric keypad",
      "Stable scissor mechanism",
      "Lightning connector",
      "Works with Mac and iPad",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth" },
      { label: "Battery", value: "Rechargeable (1 month per charge)" },
      { label: "Layout", value: "Full-size with numeric keypad" },
      { label: "Keys", value: "Scissor mechanism" },
      { label: "Weight", value: "0.95 pounds" },
      { label: "Compatibility", value: "Mac and iPad" },
    ],
    rating: 4.6,
    reviews: 893,
  },
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = PRODUCTS.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/search">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/search"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-secondary/30 rounded-lg flex items-center justify-center overflow-hidden sticky top-8">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold mb-4 text-balance">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold mb-6">${product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Features */}
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="space-y-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">Free Shipping</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">2 Year Warranty</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Star className="h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">Top Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
