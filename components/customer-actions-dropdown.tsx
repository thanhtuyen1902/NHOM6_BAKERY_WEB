"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2, Phone, Mail } from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  type: "regular" | "vip"
  joinDate: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: "active" | "inactive"
}

interface CustomerActionsDropdownProps {
  customer: Customer
  onViewDetail: (customer: Customer) => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
  onCall: (customer: Customer) => void
  onEmail: (customer: Customer) => void
}

export function CustomerActionsDropdown({
  customer,
  onViewDetail,
  onEdit,
  onDelete,
  onCall,
  onEmail,
}: CustomerActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetail(customer)}>
          <Eye className="w-4 h-4 mr-2" />
          Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(customer)}>
          <Edit className="w-4 h-4 mr-2" />
          Chỉnh sửa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCall(customer)}>
          <Phone className="w-4 h-4 mr-2" />
          Gọi điện
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEmail(customer)}>
          <Mail className="w-4 h-4 mr-2" />
          Gửi email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(customer)} className="text-red-600 focus:text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Xóa khách hàng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
