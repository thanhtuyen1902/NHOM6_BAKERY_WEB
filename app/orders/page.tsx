"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { OrderProductCard } from "@/components/order-product-card"
import { OrderProductDetailModal } from "@/components/order-product-detail-modal"
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
}

const initialOrderProducts: OrderProduct[] = [
  {
    id: "OP001",
    orderId: "DH001",
    productName: "Bánh Tiramisu Chocolate",
    productImage: "/placeholder.svg?height=100&width=100",
    quantity: 2,
    price: 100000,
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
    orderDate: "15/01/2024",
    status: "pending",
    notes: "Giao hàng trước 5h chiều",
  },
  {
    id: "OP002",
    orderId: "DH002",
    productName: "Bánh Chocolate và dâu tây",
    productImage: "/placeholder.svg?height=100&width=100",
    quantity: 1,
    price: 200000,
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    customerAddress: "456 Đường DEF, Quận 2, TP.HCM",
    orderDate: "16/01/2024",
    status: "confirmed",
  },
  {
    id: "OP003",
    orderId: "DH003",
    productName: "Bánh Tart trái cây",
    productImage: "/placeholder.svg?height=100&width=100",
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
    productImage: "/placeholder.svg?height=100&width=100",
    quantity: 2,
    price: 60000,
    customerName: "Phạm Thị D",
    customerPhone: "0934567890",
    customerAddress: "321 Đường JKL, Quận 4, TP.HCM",
    orderDate: "18/01/2024",
    status: "ready",
  },
  {
    id: "OP005",
    orderId: "DH005",
    productName: "Bánh Cupcake Socola",
    productImage: "/placeholder.svg?height=100&width=100",
    quantity: 6,
    price: 30000,
    customerName: "Hoàng Văn E",
    customerPhone: "0945678901",
    customerAddress: "654 Đường MNO, Quận 5, TP.HCM",
    orderDate: "19/01/2024",
    status: "delivering",
  },
]

export default function OrdersPage() {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(initialOrderProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrderProduct, setSelectedOrderProduct] = useState<OrderProduct | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const { toast } = useToast()

  const filteredOrderProducts = orderProducts.filter((orderProduct) => {
    const matchesSearch =
      orderProduct.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderProduct.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderProduct.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderProduct.customerPhone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || orderProduct.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewDetail = (orderProduct: OrderProduct) => {
    setSelectedOrderProduct(orderProduct)
    setShowDetailModal(true)
  }

  const handleUpdateStatus = (orderProductId: string, newStatus: string, notes?: string) => {
    setOrderProducts((prev) =>
      prev.map((op) => (op.id === orderProductId ? { ...op, status: newStatus, notes: notes || op.notes } : op)),
    )

    const statusText =
      {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        preparing: "Đang chuẩn bị",
        ready: "Sẵn sàng",
        delivering: "Đang giao",
        completed: "Hoàn thành",
        cancelled: "Đã hủy",
      }[newStatus] || newStatus

    toast({
      title: "Thành công",
      description: `Đã cập nhật trạng thái thành "${statusText}"`,
    })
  }

  const getStatusStats = () => {
    return {
      all: orderProducts.length,
      pending: orderProducts.filter((op) => op.status === "pending").length,
      confirmed: orderProducts.filter((op) => op.status === "confirmed").length,
      preparing: orderProducts.filter((op) => op.status === "preparing").length,
      ready: orderProducts.filter((op) => op.status === "ready").length,
      delivering: orderProducts.filter((op) => op.status === "delivering").length,
      completed: orderProducts.filter((op) => op.status === "completed").length,
      cancelled: orderProducts.filter((op) => op.status === "cancelled").length,
    }
  }

  const stats = getStatusStats()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Quản lý hóa đơn</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("all")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold">{stats.all}</div>
              <div className="text-xs text-gray-600">Tất cả</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("pending")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-xs text-gray-600">Chờ xác nhận</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("confirmed")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{stats.confirmed}</div>
              <div className="text-xs text-gray-600">Đã xác nhận</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("preparing")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-purple-600">{stats.preparing}</div>
              <div className="text-xs text-gray-600">Đang chuẩn bị</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("ready")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.ready}</div>
              <div className="text-xs text-gray-600">Sẵn sàng</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("delivering")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-indigo-600">{stats.delivering}</div>
              <div className="text-xs text-gray-600">Đang giao</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("completed")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-600">Hoàn thành</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter("cancelled")}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-xs text-gray-600">Đã hủy</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên sản phẩm, khách hàng, mã đơn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                <SelectItem value="ready">Sẵn sàng</SelectItem>
                <SelectItem value="delivering">Đang giao</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order Products List */}
      <div>
        {filteredOrderProducts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <p>Không tìm thấy đơn hàng nào phù hợp</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrderProducts.map((orderProduct) => (
            <OrderProductCard key={orderProduct.id} orderProduct={orderProduct} onViewDetail={handleViewDetail} />
          ))
        )}
      </div>

      {/* Detail Modal */}
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
