"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    const cart = localStorage.getItem("cart")
    const cartItems = cart ? JSON.parse(cart) : []

    const existingItem = cartItems.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cartItems))

    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"))

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button onClick={addToCart} size="lg" className="w-full h-14 text-lg" disabled={added}>
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
