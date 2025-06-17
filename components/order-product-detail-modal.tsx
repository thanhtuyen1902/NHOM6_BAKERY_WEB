"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface OrderProduct {
  id: string
  orderId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  customerName: string
  customerPhone: string
  customerAddress: string
  orderDate: string
  status: string
  notes?: string
}

interface OrderProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  orderProduct: OrderProduct | null
  onUpdateStatus: (orderProductId: string, newStatus: string, notes?: string) => void
}

export function OrderProductDetailModal({
  isOpen,
  onClose,
  orderProduct,
  onUpdateStatus,
}: OrderProductDetailModalProps) {
  const [notes, setNotes] = useState("")

  if (!orderProduct) return null

  const statusTabs = [
    { key: "pending", label: "Chờ xác nhận", color: "bg-orange-500" },
    { key: "confirmed", label: "Đang chuẩn bị", color: "bg-blue-500" },
    { key: "preparing", label: "Đang giao", color: "bg-purple-500" },
    { key: "delivering", label: "Hoàn thành", color: "bg-green-500" },
    { key: "completed", label: "Trì hoãn", color: "bg-yellow-500" },
    { key: "cancelled", label: "Đã hủy", color: "bg-red-500" },
  ]

  const handleStatusUpdate = (newStatus: string) => {
    onUpdateStatus(orderProduct.id, newStatus, notes)
    setNotes("")
    onClose()
  }

  const handleCancel = () => {
    setNotes("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Status Tabs Header */}
        <div className="bg-blue-600 text-white p-4 -m-6 mb-6 rounded-t-lg">
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleStatusUpdate(tab.key)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  orderProduct.status === tab.key
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 hover:bg-blue-400 text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Info */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <img
                src={orderProduct.productImage || "/placeholder.svg"}
                alt={orderProduct.productName}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{orderProduct.productName}</h2>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Số lượng:</span> {orderProduct.quantity}
                  </p>
                  <p>
                    <span className="font-medium">Giá tiền:</span> {orderProduct.price.toLocaleString("vi-VN")}đ
                  </p>
                  <p className="text-gray-600">
                    Nguyên liệu: Bơ, 3 quả trứng gà, 200ml cream fresh, 48g bột cà phê đen hòa tan, 250 g phô mai
                    Mascarpone, 70g đường, 300ml whipping cream, bánh savoiardi, bột ca cao.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">
                Tổng tiền: {(orderProduct.quantity * orderProduct.price).toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>

          {/* Right Column - Order Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <span className="font-medium">Tên khách hàng:</span> {orderProduct.customerName}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span> {orderProduct.customerPhone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ nhận hàng:</span> {orderProduct.customerAddress}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="orderNotes">Ghi chú đơn hàng</Label>
              <Textarea
                id="orderNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Nhập ghi chú cho đơn hàng này..."
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button onClick={() => handleStatusUpdate("confirmed")} className="bg-blue-600 hover:bg-blue-700">
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
