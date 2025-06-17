"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface OrderProductCardProps {
  orderProduct: OrderProduct
  onViewDetail: (orderProduct: OrderProduct) => void
}

export function OrderProductCard({ orderProduct, onViewDetail }: OrderProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-purple-100 text-purple-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "delivering":
        return "bg-indigo-100 text-indigo-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận"
      case "confirmed":
        return "Đã xác nhận"
      case "preparing":
        return "Đang chuẩn bị"
      case "ready":
        return "Sẵn sàng"
      case "delivering":
        return "Đang giao"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={orderProduct.productImage || "/placeholder.svg"}
              alt={orderProduct.productName}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{orderProduct.productName}</h3>
              <Badge className={getStatusColor(orderProduct.status)}>{getStatusText(orderProduct.status)}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
              <div>
                <p>
                  <span className="font-medium">Số lượng:</span> {orderProduct.quantity}
                </p>
                <p>
                  <span className="font-medium">Giá tiền:</span> {orderProduct.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Mã đơn:</span> {orderProduct.orderId}
                </p>
                <p>
                  <span className="font-medium">Ngày đặt:</span> {orderProduct.orderDate}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              <p>
                <span className="font-medium">Khách hàng:</span> {orderProduct.customerName} -{" "}
                {orderProduct.customerPhone}
              </p>
              <p>
                <span className="font-medium">Địa chỉ:</span> {orderProduct.customerAddress}
              </p>
            </div>

            {orderProduct.notes && (
              <div className="text-sm text-gray-600 mb-3">
                <p>
                  <span className="font-medium">Ghi chú:</span> {orderProduct.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={() => onViewDetail(orderProduct)} className="bg-blue-600 hover:bg-blue-700">
                Cho vào nhận...
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
