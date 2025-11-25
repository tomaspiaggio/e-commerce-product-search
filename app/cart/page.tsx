"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCartItems(JSON.parse(cart))
    }
  }, [])

  const updateQuantity = (id: number, change: number) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const removeItem = (id: number) => {
    const newCart = cartItems.filter((item) => item.id !== id)
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0 // Free shipping
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Link href="/search">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                  <div className="w-24 h-24 bg-secondary/30 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={`/.jpg?height=96&width=96&query=${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
                    <p className="text-xl font-bold mb-3">${item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>
                      ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>
                      ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <Button className="w-full h-12 text-base" size="lg">
                  Proceed to Checkout
                </Button>

                <Link href="/search">
                  <Button variant="ghost" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
