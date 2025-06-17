"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi tiết sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">Mã sản phẩm: {product.id}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Giá bán:</span>
                <span className="text-lg font-bold text-blue-600">{product.price.toLocaleString("vi-VN")}đ</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Loại sản phẩm:</span>
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Số lượng:</span>
                <span>{product.quantity}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Trạng thái:</span>
                <Badge variant={product.status === "active" ? "default" : "secondary"}>
                  {product.status === "active" ? "Đang bán" : "Đã ẩn"}
                </Badge>
              </div>
            </div>

            {product.description && (
              <div>
                <span className="font-medium">Mô tả:</span>
                <p className="text-gray-600 mt-1">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
