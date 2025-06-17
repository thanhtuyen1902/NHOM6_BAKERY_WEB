"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface CustomerFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (customer: Omit<Customer, "id"> | Customer) => void
  customer?: Customer | null
  mode: "add" | "edit"
}

export function CustomerFormModal({ isOpen, onClose, onSave, customer, mode }: CustomerFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "regular" as const,
    status: "active" as const,
  })

  useEffect(() => {
    if (customer && mode === "edit") {
      setFormData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        type: customer.type,
        status: customer.status,
      })
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        type: "regular",
        status: "active",
      })
    }
  }, [customer, mode, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const customerData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      type: formData.type,
      status: formData.status,
      joinDate: customer?.joinDate || new Date().toLocaleDateString("vi-VN"),
      totalOrders: customer?.totalOrders || 0,
      totalSpent: customer?.totalSpent || 0,
      lastOrderDate: customer?.lastOrderDate || "",
    }

    if (mode === "edit" && customer) {
      onSave({ ...customerData, id: customer.id })
    } else {
      onSave(customerData)
    }

    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      type: "regular",
      status: "active",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <div className="bg-blue-600 text-white p-4 -m-6 mb-6 rounded-t-lg">
          <h2 className="text-xl font-bold">
            {mode === "add" ? "Thêm khách hàng mới" : "Chỉnh sửa thông tin khách hàng"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập tên khách hàng"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">SĐT *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Nhập email"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Nhập địa chỉ"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">Loại khách hàng</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "regular" | "vip") => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Thường</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "add" ? "Thêm khách hàng" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
