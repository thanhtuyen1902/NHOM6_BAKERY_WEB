"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface Order {
  id: string
  date: string
  total: number
  status: string
  items: number
}

interface CustomerDetailModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function CustomerDetailModal({ isOpen, onClose, customer, onEdit, onDelete }: CustomerDetailModalProps) {
  if (!customer) return null

  // Mock order history data
  const orderHistory: Order[] = [
    { id: "DH001", date: "15/01/2024", total: 250000, status: "completed", items: 3 },
    { id: "DH002", date: "10/01/2024", total: 180000, status: "completed", items: 2 },
    { id: "DH003", date: "05/01/2024", total: 320000, status: "completed", items: 4 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-4 -m-6 mb-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Chi tiết khách hàng</h2>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="stats">Thống kê mua hàng</TabsTrigger>
            <TabsTrigger value="history">Lịch sử đơn hàng</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tên</label>
                      <p className="text-lg font-semibold">{customer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">SĐT</label>
                      <p className="text-lg">{customer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-lg">{customer.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Địa chỉ</label>
                      <p className="text-lg">{customer.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Loại khách hàng</label>
                      <div>
                        <Badge variant={customer.type === "vip" ? "default" : "secondary"}>
                          {customer.type === "vip" ? "VIP" : "Thường"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ngày tham gia</label>
                      <p className="text-lg">{customer.joinDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{customer.totalOrders}</div>
                  <div className="text-sm text-gray-600">Tổng đơn hàng</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {customer.totalSpent.toLocaleString("vi-VN")}đ
                  </div>
                  <div className="text-sm text-gray-600">Tổng chi tiêu</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(customer.totalSpent / customer.totalOrders).toLocaleString("vi-VN")}đ
                  </div>
                  <div className="text-sm text-gray-600">Trung bình/đơn</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{customer.lastOrderDate}</div>
                  <div className="text-sm text-gray-600">Đơn hàng cuối</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Mã đơn</th>
                        <th className="text-left p-3">Ngày đặt</th>
                        <th className="text-left p-3">Số sản phẩm</th>
                        <th className="text-left p-3">Tổng tiền</th>
                        <th className="text-left p-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{order.id}</td>
                          <td className="p-3">{order.date}</td>
                          <td className="p-3">{order.items}</td>
                          <td className="p-3 font-semibold">{order.total.toLocaleString("vi-VN")}đ</td>
                          <td className="p-3">
                            <Badge variant="default">Hoàn thành</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="outline" onClick={() => onEdit(customer)}>
            Chỉnh sửa
          </Button>
          <Button variant="destructive" onClick={() => onDelete(customer)}>
            Xóa khách hàng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
