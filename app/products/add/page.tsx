
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddProductPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: "",
        price: "",
        description: "",
        image: "/placeholder.svg?height=200&width=200",
        status: "active" as const,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const stored = localStorage.getItem("products")
        const current = stored ? JSON.parse(stored) : []

        const maxId = current.reduce((max: number, p: any) => {
            const num = Number.parseInt(p.id?.replace("BA", "") || "0")
            return Math.max(max, num)
        }, 0)

        const newProduct = {
            ...formData,
            id: `BA${String(maxId + 1).padStart(2, "0")}`,
            price: Number.parseFloat(formData.price),
            quantity: Number.parseInt(formData.quantity),
        }

        const updated = [...current, newProduct]
        localStorage.setItem("products", JSON.stringify(updated))
        window.dispatchEvent(new Event("productsUpdated"))

        toast({
            title: "Thành công",
            description: `Đã thêm sản phẩm "${formData.name}"`,
        })

        router.push("/products")
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Trang chủ</span>
                <span>»</span>
                <span>Quản lý sản phẩm</span>
                <span>»</span>
                <span className="text-gray-900 font-medium">Thêm sản phẩm</span>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-xl font-bold text-blue-600 mb-6">Thêm sản phẩm mới</h1>

                {/* Product Image Placeholder - Top */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            {formData.image && formData.image !== "/placeholder.svg?height=200&width=200" ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={formData.image || "/placeholder.svg"}
                                        alt="Product"
                                        width={192}
                                        height={192}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "/placeholder.svg?height=200&width=200" })}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        const result = e.target?.result as string
                                        setFormData((prev) => ({ ...prev, image: result }))
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Form - Below Image */}
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="name" className="w-24 text-gray-700 text-sm">
                                Tên bánh <span className="text-red-500">*</span>:
                            </Label>
                            <div className="flex-1">
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="h-11 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Label htmlFor="category" className="w-24 text-gray-700 text-sm">
                                Loại bánh <span className="text-red-500">*</span>:
                            </Label>
                            <div className="flex-1">
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                >
                                    <SelectTrigger className="h-11 text-sm">
                                        <SelectValue placeholder="Chọn loại bánh" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bánh lạnh" className="text-sm">
                                            Bánh lạnh
                                        </SelectItem>
                                        <SelectItem value="Bánh nướng" className="text-sm">
                                            Bánh nướng
                                        </SelectItem>
                                        <SelectItem value="Bánh ngọt" className="text-sm">
                                            Bánh ngọt
                                        </SelectItem>
                                        <SelectItem value="Bánh kem" className="text-sm">
                                            Bánh kem
                                        </SelectItem>
                                        <SelectItem value="Bánh tart" className="text-sm">
                                            Bánh tart
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Label htmlFor="quantity" className="w-24 text-gray-700 text-sm">
                                Số lượng <span className="text-red-500">*</span>:
                            </Label>
                            <div className="flex-1">
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                    min="0"
                                    className="h-11 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Label htmlFor="price" className="w-24 text-gray-700 text-sm">
                                Giá bán <span className="text-red-500">*</span>:
                            </Label>
                            <div className="flex-1">
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    min="0"
                                    step="1000"
                                    className="h-11 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Label htmlFor="description" className="w-24 text-gray-700 text-sm pt-3">
                                Mô tả:
                            </Label>
                            <div className="flex-1">
                                <Textarea
                                    id="description"
                                    rows={5}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Nhập mô tả sản phẩm..."
                                    className="resize-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/products")}
                                className="px-8 py-2 h-11 text-sm bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                            >
                                Hủy
                            </Button>
                            <Button type="submit" className="px-8 py-2 h-11 text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                Thêm mới
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
