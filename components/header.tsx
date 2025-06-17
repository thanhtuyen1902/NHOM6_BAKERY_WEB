"use client"

import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">🧁</span>
        </div>
        <span className="font-bold text-lg">Bakery</span>
        <button className="ml-4 p-1">
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Input placeholder="Tìm kiếm..." className="bg-white text-gray-900 pl-4 pr-10" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-blue-700 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Thanh Tuyến</span>
        </div>
      </div>
    </header>
  )
}
