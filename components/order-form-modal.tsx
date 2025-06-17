"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, X } from "lucide-react"

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

interface OrderFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (order: Omit<Order, "id"> | Order) => void
  order?: Order | null
  mode: "add" | "edit"
  availableProducts: Array<{ id: string; name: string; price: number; image: string }>
}

export function OrderFormModal({ isOpen, onClose, onSave, order, mode, availableProducts }: OrderFormModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    status: "pending",
    notes: "",
  })

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    if (order && mode === "edit") {
      setFormData({
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        status: order.status,
        notes: order.notes || "",
      })
      setOrderItems(order.items)
    } else {
      setFormData({
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        status: "pending",
        notes: "",
      })
      setOrderItems([])
    }
  }, [order, mode, isOpen])

  const addProduct = (productId: string) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (product) {
      const existingItem = orderItems.find((item) => item.id === productId)
      if (existingItem) {
        setOrderItems((items) =>
          items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
        )
      } else {
        setOrderItems((items) => [
          ...items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ])
      }
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems((items) => items.filter((item) => item.id !== productId))
    } else {
      setOrderItems((items) => items.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (productId: string) => {
    setOrderItems((items) => items.filter((item) => item.id !== productId))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const orderData = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerAddress: formData.customerAddress,
      date: new Date().toLocaleDateString("vi-VN"),
      status: formData.status,
      total: calculateTotal(),
      items: orderItems,
      notes: formData.notes,
    }

    if (mode === "edit" && order) {
      onSave({ ...orderData, id: order.id })
    } else {
      onSave(orderData)
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Tạo đơn hàng mới" : "Chỉnh sửa đơn hàng"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Customer Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Thông tin khách hàng</h3>

              <div>
                <Label htmlFor="customerName">Tên khách hàng *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Số điện thoại *</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerAddress">Địa chỉ *</Label>
                <Textarea
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerAddress: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xác nhận</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                    <SelectItem value="ready">Sẵn sàng</SelectItem>
                    <SelectItem value="delivering">Đang giao</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ghi chú đơn hàng"
                />
              </div>
            </div>

            {/* Right Column - Products */}
            <div className="space-y-4">
              <h3 className="font-semibold">Sản phẩm</h3>

              {/* Add Product */}
              <div>
                <Label>Thêm sản phẩm</Label>
                <Select onValueChange={addProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.price.toLocaleString("vi-VN")}đ
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Items */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-2 border rounded">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.price.toLocaleString("vi-VN")}đ</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button type="button" size="sm" variant="outline" onClick={() => removeItem(item.id)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="text-lg font-bold text-blue-600">{calculateTotal().toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={orderItems.length === 0}>
              {mode === "add" ? "Tạo đơn hàng" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
