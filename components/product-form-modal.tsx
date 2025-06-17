"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

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

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id"> | Product) => void
  product?: Product | null
  mode: "add" | "edit"
}

export function ProductFormModal({ isOpen, onClose, onSave, product, mode }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    image: "/placeholder.svg?height=200&width=200",
    status: "active" as const,
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        quantity: product.quantity.toString(),
        description: product.description,
        image: product.image,
        status: product.status,
      })
      setImagePreview(product.image)
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        quantity: "",
        description: "",
        image: "/placeholder.svg?height=200&width=200",
        status: "active",
      })
      setImagePreview("")
    }
  }, [product, mode, isOpen])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      quantity: Number.parseInt(formData.quantity),
      description: formData.description,
      image: formData.image,
      status: formData.status,
    }

    if (mode === "edit" && product) {
      onSave({ ...productData, id: product.id })
    } else {
      onSave(productData)
    }

    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      quantity: "",
      description: "",
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
    })
    setImagePreview("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Thêm sản phẩm mới" : "Sửa thông tin sản phẩm"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Loại sản phẩm *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bánh nướng">Bánh nướng</SelectItem>
                    <SelectItem value="Bánh ngọt">Bánh ngọt</SelectItem>
                    <SelectItem value="Bánh kem">Bánh kem</SelectItem>
                    <SelectItem value="Bánh tart">Bánh tart</SelectItem>
                    <SelectItem value="Bánh mì">Bánh mì</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Giá bán (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Số lượng *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả sản phẩm"
                  rows={3}
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <Label>Hình ảnh sản phẩm</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview("")
                        setFormData((prev) => ({ ...prev, image: "/placeholder.svg?height=200&width=200" }))
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="py-8">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Kéo thả ảnh vào đây hoặc</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Chọn ảnh
                    </Button>
                  </div>
                )}
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "add" ? "Thêm sản phẩm" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
