"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

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

interface CustomerDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  customer: Customer | null
}

export function CustomerDeleteModal({ isOpen, onClose, onConfirm, customer }: CustomerDeleteModalProps) {
  if (!customer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="bg-blue-600 text-white p-4 -m-6 mb-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Xóa khách hàng</h2>
        </div>

        <div className="py-4 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Bạn có chắc chắn muốn xóa không?</h3>
          <p className="text-gray-600 mb-4">
            Khách hàng <strong>"{customer.name}"</strong> sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </p>
          <p className="text-sm text-red-500">Hành động này không thể hoàn tác!</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Không
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
