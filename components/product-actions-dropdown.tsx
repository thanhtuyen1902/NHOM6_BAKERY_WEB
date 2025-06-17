"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2, EyeOff } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  quantity: number
  description: string
  image: string
  status: "active" | "hidden"
}

interface ProductActionsDropdownProps {
  product: Product
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onToggleStatus: (product: Product) => void
}

export function ProductActionsDropdown({
  product,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: ProductActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(product)}>
          <Eye className="w-4 h-4 mr-2" />
          Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(product)}>
          <Edit className="w-4 h-4 mr-2" />
          Chỉnh sửa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus(product)}>
          <EyeOff className="w-4 h-4 mr-2" />
          {product.status === "active" ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(product)} className="text-red-600 focus:text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Xóa sản phẩm
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
