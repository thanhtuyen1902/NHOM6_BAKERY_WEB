"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { OrderStatusBadge } from "./order-status-badge"
import { useState } from "react"

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

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  onUpdateStatus: (orderId: string, newStatus: string, notes?: string) => void
}

export function OrderDetailModal({ isOpen, onClose, order, onUpdateStatus }: OrderDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("")
  const [notes, setNotes] = useState("")

  if (!order) return null

  const handleUpdateStatus = () => {
    if (selectedStatus) {
      onUpdateStatus(order.id, selectedStatus, notes)
      setSelectedStatus("")
      setNotes("")
      onClose()
    }
  }

  const statusOptions = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "preparing", label: "Đang chuẩn bị" },
    { value: "ready", label: "Sẵn sàng" },
    { value: "delivering", label: "Đang giao" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Order Info */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Tên:</span> {order.customerName}
                </p>
                <p>
                  <span className="font-medium">SĐT:</span> {order.customerPhone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span> {order.customerAddress}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Thông tin đơn hàng</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Mã đơn:</span> {order.id}
                </p>
                <p>
                  <span className="font-medium">Ngày đặt:</span> {order.date}
                </p>
                <p>
                  <span className="font-medium">Trạng thái:</span> <OrderStatusBadge status={order.status} />
                </p>
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  <span className="text-lg font-bold text-blue-600">{order.total.toLocaleString("vi-VN")}đ</span>
                </p>
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Cập nhật trạng thái</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Trạng thái mới</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Ghi chú</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Nhập ghi chú (tùy chọn)"
                    rows={3}
                  />
                </div>
                <Button onClick={handleUpdateStatus} disabled={!selectedStatus} className="w-full">
                  Cập nhật trạng thái
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Items */}
          <div>
            <h3 className="font-semibold mb-4">Chi tiết sản phẩm</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Đơn giá: {item.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-xl font-bold text-blue-600">{order.total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
