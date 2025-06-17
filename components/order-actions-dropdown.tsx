"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Printer, Phone } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  date: string
  status: string
  total: number
  items: OrderItem[]
  notes?: string
}

interface OrderActionsDropdownProps {
  order: Order
  onViewDetail: (order: Order) => void
  onEdit: (order: Order) => void
  onPrint: (order: Order) => void
  onCall: (order: Order) => void
}

export function OrderActionsDropdown({ order, onViewDetail, onEdit, onPrint, onCall }: OrderActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetail(order)}>
          <Eye className="w-4 h-4 mr-2" />
          Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(order)}>
          <Edit className="w-4 h-4 mr-2" />
          Chỉnh sửa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPrint(order)}>
          <Printer className="w-4 h-4 mr-2" />
          In hóa đơn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCall(order)}>
          <Phone className="w-4 h-4 mr-2" />
          Gọi khách hàng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
