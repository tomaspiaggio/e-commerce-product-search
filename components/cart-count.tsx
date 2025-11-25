"use client"

import { useEffect, useState } from "react"

export function CartCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const cart = localStorage.getItem("cart")
      if (cart) {
        const items = JSON.parse(cart)
        const total = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCount(total)
      } else {
        setCount(0)
      }
    }

    updateCount()

    // Listen for cart updates
    window.addEventListener("storage", updateCount)
    window.addEventListener("cartUpdated", updateCount)

    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("cartUpdated", updateCount)
    }
  }, [])

  if (count === 0) return null

  return (
    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {count}
    </span>
  )
}
