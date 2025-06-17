"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingCart, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Quản lý sản phẩm", href: "/products", icon: Package },
  { name: "Quản lý đơn hàng", href: "/orders", icon: ShoppingCart },
  { name: "Quản lý khách hàng", href: "/customers", icon: Users },
  { name: "Cài đặt", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
