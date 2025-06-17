"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { OrderProductCard } from "@/components/order-product-card"
import { OrderProductDetailModal } from "@/components/order-product-detail-modal" // Ensure this modal is updated to handle the new flow
import { useToast } from "@/hooks/use-toast"

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
  outOfStock?: boolean
  customerCancelRequest?: boolean
}

const initialOrderProducts: OrderProduct[] = [
  {
    id: "OP001",
    orderId: "DH001",
    productName: "Bánh Tiramisu Chocolate",
    productImage: "/placeholder.svg",
    quantity: 2,
    price: 100000,
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
    orderDate: "15/01/2024",
    status: "pending",
    notes: "Giao hàng trước 5h chiều",
    outOfStock: true,
  },
  {
    id: "OP002",
    orderId: "DH002",
    productName: "Bánh Chocolate và dâu tây",
    productImage: "/placeholder.svg",
    quantity: 1,
    price: 200000,
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    customerAddress: "456 Đường DEF, Quận 2, TP.HCM",
    orderDate: "16/01/2024",
    status: "pending",
    customerCancelRequest: true,
  },
  {
    id: "OP003",
    orderId: "DH003",
    productName: "Bánh Tart trái cây",
    productImage: "/placeholder.svg",
    quantity: 3,
    price: 80000,
    customerName: "Lê Văn C",
    customerPhone: "0923456789",
    customerAddress: "789 Đường GHI, Quận 3, TP.HCM",
    orderDate: "17/01/2024",
    status: "preparing",
  },
  {
    id: "OP004",
    orderId: "DH004",
    productName: "Bánh Phô Mai Nướng",
    productImage: "/placeholder.svg",
    quantity: 2,
    price: 60000,
    customerName: "Phạm Thị D",
    customerPhone: "0934567890",
    customerAddress: "321 Đường JKL, Quận 4, TP.HCM",
    orderDate: "18/01/2024",
    status: "delivering",
  },
  {
    id: "OP005",
    orderId: "DH005",
    productName: "Bánh Cupcake Socola",
    productImage: "/placeholder.svg",
    quantity: 6,
    price: 30000,
    customerName: "Hoàng Văn E",
    customerPhone: "0945678901",
    customerAddress: "654 Đường MNO, Quận 5, TP.HCM",
    orderDate: "19/01/2024",
    status: "completed",
  },
]

export default function OrdersPage() {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(initialOrderProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrderProduct, setSelectedOrderProduct] = useState<OrderProduct | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const { toast } = useToast()

  type StatusKey = "all" | "pending" | "preparing" | "delivering" | "completed" | "cancelled" | "delayed"

  const statusKeys: { key: StatusKey; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "preparing", label: "Đang chuẩn bị" },
    { key: "delivering", label: "Đang giao" },
    { key: "completed", label: "Hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
    { key: "delayed", label: "Trì hoãn" },
  ]

  const getStatusStats = (): Record<StatusKey, number> => ({
    all: orderProducts.length,
    pending: orderProducts.filter((op) => op.status === "pending").length,
    preparing: orderProducts.filter((op) => op.status === "preparing").length,
    delivering: orderProducts.filter((op) => op.status === "delivering").length,
    completed: orderProducts.filter((op) => op.status === "completed").length,
    cancelled: orderProducts.filter((op) => op.status === "cancelled").length,
    delayed: orderProducts.filter((op) => op.status === "delayed").length,
  })

  const stats = getStatusStats()

  const parseDate = (d: string) => {
    const [day, month, year] = d.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  const filteredOrderProducts = orderProducts
    .filter((orderProduct) => {
      const matchesSearch =
        orderProduct.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderProduct.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderProduct.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderProduct.customerPhone.includes(searchTerm)
      const matchesStatus = statusFilter === "all" || orderProduct.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => parseDate(b.orderDate).getTime() - parseDate(a.orderDate).getTime())

  const handleViewDetail = (orderProduct: OrderProduct) => {
    setSelectedOrderProduct(orderProduct)
    setShowDetailModal(true)
  }

  // Hàm handleUpdateStatus được điều chỉnh để xử lý luồng trạng thái
  const handleUpdateStatus = (orderProductId: string, newStatus: string, reason?: string) => {
    setOrderProducts((prev) =>
      prev.map((op) => {
        if (op.id !== orderProductId) return op

        // Logic cập nhật trạng thái dựa trên luồng bạn mô tả
        let updatedStatus = newStatus;
        let updatedNotes = reason || op.notes;
        let updatedOutOfStock = false;
        let updatedCustomerCancelRequest = false;

        // Cập nhật các trường đặc biệt nếu trạng thái mới là 'cancelled' hoặc 'delayed'
        if (newStatus === "cancelled") {
            updatedNotes = reason || op.notes; // Lý do hủy nếu có
            updatedCustomerCancelRequest = false; // Yêu cầu hủy được xử lý
            updatedOutOfStock = false; // Không còn tình trạng hết hàng nếu đã hủy
        } else if (newStatus === "delayed") {
            updatedNotes = reason || op.notes; // Lý do trì hoãn
        }

        return {
          ...op,
          status: updatedStatus,
          notes: updatedNotes,
          outOfStock: updatedOutOfStock,
          customerCancelRequest: updatedCustomerCancelRequest,
        }
      })
    )

    const statusMessage: Record<string, string> = {
        pending: "Chờ xác nhận",
        preparing: "Đơn hàng đang được chuẩn bị",
        delivering: "Đơn hàng đang được giao",
        completed: "Đơn hàng đã giao thành công",
        delayed: "Đơn hàng đã bị trì hoãn",
        cancelled: "Đơn hàng đã bị hủy",
        confirmed: "Đơn hàng đã được xác nhận và đang chuẩn bị", // This state might not be displayed directly but is a logical step
    };

    toast({
      title: "Trạng thái đơn hàng đã được cập nhật",
      description: statusMessage[newStatus] || "Cập nhật thành công",
    });

    // Close the modal after update
    setShowDetailModal(false);
    setSelectedOrderProduct(null);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý hóa đơn</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {statusKeys.map(({ key, label }) => (
          <Card
            key={key}
            className={`cursor-pointer hover:bg-gray-50 ${statusFilter === key ? "border-2 border-pink-400 bg-pink-50" : ""}`}
            onClick={() => setStatusFilter(key)}
          >
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold">{stats[key]}</div>
              <div className="text-xs text-gray-600">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm theo tên, khách, mã đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {statusKeys.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredOrderProducts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            Không tìm thấy đơn hàng phù hợp
          </CardContent>
        </Card>
      ) : (
        filteredOrderProducts.map((orderProduct) => (
          <OrderProductCard
            key={orderProduct.id}
            orderProduct={orderProduct}
            onViewDetail={handleViewDetail}
          />
        ))
      )}

      <OrderProductDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedOrderProduct(null)
        }}
        orderProduct={selectedOrderProduct}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  )
}