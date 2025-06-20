
// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Upload, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// export default function EditProductPage() {
//     const router = useRouter()
//     const params = useParams()
//     const { toast } = useToast()
//     const id = Array.isArray(params.id) ? params.id[0] : params.id

//     const [formData, setFormData] = useState({
//         id: "",
//         name: "",
//         category: "",
//         quantity: "",
//         price: "",
//         description: "",
//         image: "/placeholder.svg?height=200&width=200",
//         status: "active" as const,
//     })
//     const [imagePreview, setImagePreview] = useState("")
//     const [loading, setLoading] = useState(true)
//     const [productNotFound, setProductNotFound] = useState(false)

//     useEffect(() => {
//         if (typeof window !== "undefined" && id) {
//             const stored = localStorage.getItem("products")
//             if (stored) {
//                 const products = JSON.parse(stored)
//                 const existing = products.find((p: any) => p.id === id)
//                 if (existing) {
//                     setFormData({
//                         id: existing.id,
//                         name: existing.name,
//                         category: existing.category,
//                         quantity: existing.quantity.toString(),
//                         price: existing.price.toString(),
//                         description: existing.description,
//                         image: existing.image,
//                         status: existing.status,
//                     })
//                     setImagePreview(existing.image)
//                     setLoading(false)
//                 } else {
//                     setProductNotFound(true)
//                     setLoading(false)
//                 }
//             } else {
//                 setProductNotFound(true)
//                 setLoading(false)
//             }
//         }
//     }, [id])

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (file) {
//             const reader = new FileReader()
//             reader.onload = (e) => {
//                 const result = e.target?.result as string
//                 setImagePreview(result)
//                 setFormData((prev) => ({ ...prev, image: result }))
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         const stored = localStorage.getItem("products")
//         if (!stored) {
//             toast({
//                 title: "Lỗi",
//                 description: "Không tìm thấy dữ liệu sản phẩm",
//                 variant: "destructive",
//             })
//             return
//         }

//         const products = JSON.parse(stored)
//         const updated = products.map((p: any) =>
//             p.id === formData.id
//                 ? {
//                     ...formData,
//                     price: Number.parseFloat(formData.price),
//                     quantity: Number.parseInt(formData.quantity),
//                 }
//                 : p,
//         )

//         localStorage.setItem("products", JSON.stringify(updated))

//         // Dispatch custom event để thông báo trang chính cập nhật
//         window.dispatchEvent(new Event("productsUpdated"))

//         toast({
//             title: "Thành công",
//             description: `Đã cập nhật sản phẩm "${formData.name}"`,
//         })

//         router.push("/products")
//     }

//     if (loading) {
//         return (
//             <div className="p-6 flex justify-center items-center min-h-[400px]">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p>Đang tải thông tin sản phẩm...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (productNotFound) {
//         return (
//             <div className="p-6 text-center">
//                 <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sản phẩm</h1>
//                 <p className="text-gray-600 mb-4">Sản phẩm với ID "{id}" không tồn tại.</p>
//                 <Button onClick={() => router.push("/products")}>Quay lại danh sách sản phẩm</Button>
//             </div>
//         )
//     }

//     return (
//         <div className="p-6 space-y-6">
//             <div className="text-sm text-gray-600 space-x-1">
//                 <span>Trang chủ</span>
//                 <span>›</span>
//                 <span>Quản lý sản phẩm</span>
//                 <span>›</span>
//                 <span className="text-gray-900 font-semibold">Sửa sản phẩm</span>
//             </div>

//             <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h1>

//             <div>
//                 <Label>Hình ảnh sản phẩm</Label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mt-2 max-w-md mx-auto">
//                     {imagePreview ? (
//                         <div className="relative inline-block">
//                             <Image
//                                 src={imagePreview || "/placeholder.svg"}
//                                 alt="Preview"
//                                 width={300}
//                                 height={200}
//                                 className="rounded-lg object-cover mx-auto"
//                             />
//                             <Button
//                                 type="button"
//                                 variant="destructive"
//                                 size="sm"
//                                 className="absolute top-2 right-2"
//                                 onClick={() => {
//                                     setImagePreview("")
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         image: "/placeholder.svg?height=200&width=200",
//                                     }))
//                                 }}
//                             >
//                                 <X className="w-4 h-4" />
//                             </Button>
//                         </div>
//                     ) : (
//                         <div className="py-8">
//                             <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                             <p className="text-gray-500 mb-2">Kéo thả ảnh vào đây hoặc</p>
//                             <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
//                                 Chọn ảnh
//                             </Button>
//                         </div>
//                     )}
//                     <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
//                 <div>
//                     <Label htmlFor="name">Tên bánh *</Label>
//                     <Input
//                         id="name"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <Label htmlFor="category">Loại bánh *</Label>
//                     <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Chọn loại bánh" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="Bánh nướng">Bánh nướng</SelectItem>
//                             <SelectItem value="Bánh ngọt">Bánh ngọt</SelectItem>
//                             <SelectItem value="Bánh kem">Bánh kem</SelectItem>
//                             <SelectItem value="Bánh tart">Bánh tart</SelectItem>
//                             <SelectItem value="Bánh mì">Bánh mì</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <Label htmlFor="quantity">Số lượng *</Label>
//                         <Input
//                             id="quantity"
//                             type="number"
//                             value={formData.quantity}
//                             onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                             required
//                             min="0"
//                         />
//                     </div>
//                     <div>
//                         <Label htmlFor="price">Giá bán *</Label>
//                         <Input
//                             id="price"
//                             type="number"
//                             value={formData.price}
//                             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                             required
//                             min="0"
//                             step="1000"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <Label htmlFor="description">Mô tả</Label>
//                     <Textarea
//                         id="description"
//                         rows={3}
//                         value={formData.description}
//                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         placeholder="Nhập mô tả sản phẩm..."
//                     />
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
//                     <Button type="button" variant="outline" onClick={() => router.push("/products")}>
//                         Hủy
//                     </Button>
//                     <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//                         Lưu thay đổi
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     )
// }
// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"

// export default function EditProductPage() {
//     const router = useRouter()
//     const params = useParams()
//     const { toast } = useToast()
//     const id = Array.isArray(params.id) ? params.id[0] : params.id

//     const [formData, setFormData] = useState({
//         id: "",
//         name: "",
//         category: "",
//         quantity: "",
//         price: "",
//         description: "",
//         image: "/placeholder.svg?height=200&width=200",
//         status: "active" as const,
//     })
//     const [loading, setLoading] = useState(true)
//     const [productNotFound, setProductNotFound] = useState(false)

//     useEffect(() => {
//         if (typeof window !== "undefined" && id) {
//             const stored = localStorage.getItem("products")
//             if (stored) {
//                 const products = JSON.parse(stored)
//                 const existing = products.find((p: any) => p.id === id)
//                 if (existing) {
//                     setFormData({
//                         id: existing.id,
//                         name: existing.name,
//                         category: existing.category,
//                         quantity: existing.quantity.toString(),
//                         price: existing.price.toString(),
//                         description: existing.description,
//                         image: existing.image,
//                         status: existing.status,
//                     })
//                     setLoading(false)
//                 } else {
//                     setProductNotFound(true)
//                     setLoading(false)
//                 }
//             } else {
//                 setProductNotFound(true)
//                 setLoading(false)
//             }
//         }
//     }, [id])

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         const stored = localStorage.getItem("products")
//         if (!stored) {
//             toast({
//                 title: "Lỗi",
//                 description: "Không tìm thấy dữ liệu sản phẩm",
//                 variant: "destructive",
//             })
//             return
//         }

//         const products = JSON.parse(stored)
//         const updated = products.map((p: any) =>
//             p.id === formData.id
//                 ? {
//                     ...formData,
//                     price: Number.parseFloat(formData.price),
//                     quantity: Number.parseInt(formData.quantity),
//                 }
//                 : p,
//         )

//         localStorage.setItem("products", JSON.stringify(updated))
//         window.dispatchEvent(new Event("productsUpdated"))

//         toast({
//             title: "Thành công",
//             description: `Đã cập nhật sản phẩm "${formData.name}"`,
//         })

//         router.push("/products")
//     }

//     if (loading) {
//         return (
//             <div className="p-6 flex justify-center items-center min-h-[400px]">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p>Đang tải thông tin sản phẩm...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (productNotFound) {
//         return (
//             <div className="p-6 text-center">
//                 <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sản phẩm</h1>
//                 <p className="text-gray-600 mb-4">Sản phẩm với ID "{id}" không tồn tại.</p>
//                 <Button onClick={() => router.push("/products")}>Quay lại danh sách sản phẩm</Button>
//             </div>
//         )
//     }

//     return (
//         <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
//             {/* Breadcrumb */}
//             <div className="flex items-center space-x-2 text-base text-gray-600">
//                 <span>Trang chủ</span>
//                 <span>»</span>
//                 <span>Quản lý sản phẩm</span>
//                 <span>»</span>
//                 <span className="text-gray-900 font-medium">Sửa sản phẩm</span>
//             </div>

//             {/* Main Content */}
//             <div className="bg-white rounded-lg shadow-sm p-8">
//                 <h1 className="text-2xl font-bold text-blue-600 mb-8">Sửa thông tin sản phẩm</h1>

//                 <div className="flex gap-8">
//                     {/* Product Image - head Side */}
//                     <div className="w-48 flex-shrink-0">
//                         <div className="w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
//                             <Image
//                                 src={formData.image || "/placeholder.svg"}
//                                 alt="Product"
//                                 width={192}
//                                 height={192}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     </div>
//                     {/* Form - Left Side */}
//                     <div className="flex-1">
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="flex items-center gap-4">
//                                 <Label htmlFor="name" className="w-24 text-gray-700 text-base">
//                                     Tên bánh <span className="text-red-500">*</span>:
//                                 </Label>
//                                 <div className="flex-1">
//                                     <Input
//                                         id="name"
//                                         value={formData.name}
//                                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                         required
//                                         className="h-12 text-base"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Label htmlFor="category" className="w-24 text-gray-700 text-base">
//                                     Loại bánh <span className="text-red-500">*</span>:
//                                 </Label>
//                                 <div className="flex-1">
//                                     <Select
//                                         value={formData.category}
//                                         onValueChange={(value) => setFormData({ ...formData, category: value })}
//                                     >
//                                         <SelectTrigger className="h-12 text-base">
//                                             <SelectValue placeholder="Chọn loại bánh" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="Bánh lạnh">Bánh lạnh</SelectItem>
//                                             <SelectItem value="Bánh nướng">Bánh nướng</SelectItem>
//                                             <SelectItem value="Bánh ngọt">Bánh ngọt</SelectItem>
//                                             <SelectItem value="Bánh kem">Bánh kem</SelectItem>
//                                             <SelectItem value="Bánh tart">Bánh tart</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Label htmlFor="quantity" className="w-24 text-gray-700 text-base">
//                                     Số lượng <span className="text-red-500">*</span>:
//                                 </Label>
//                                 <div className="flex-1">
//                                     <Input
//                                         id="quantity"
//                                         type="number"
//                                         value={formData.quantity}
//                                         onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                                         required
//                                         min="0"
//                                         className="h-12 text-base"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Label htmlFor="price" className="w-24 text-gray-700 text-base">
//                                     Giá bán <span className="text-red-500">*</span>:
//                                 </Label>
//                                 <div className="flex-1">
//                                     <Input
//                                         id="price"
//                                         type="number"
//                                         value={formData.price}
//                                         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                                         required
//                                         min="0"
//                                         step="1000"
//                                         className="h-12 text-base"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex items-start gap-4">
//                                 <Label htmlFor="description" className="w-24 text-gray-700 text-base pt-3">
//                                     Mô tả:
//                                 </Label>
//                                 <div className="flex-1">
//                                     <Textarea
//                                         id="description"
//                                         rows={4}
//                                         value={formData.description}
//                                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                         placeholder="Nhập mô tả sản phẩm..."
//                                         className="resize-none text-base"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex justify-end space-x-4 pt-6">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={() => router.push("/products")}
//                                     className="px-8 py-3 h-12 text-base bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
//                                 >
//                                     Hủy
//                                 </Button>
//                                 <Button type="submit" className="px-8 py-3 h-12 text-base bg-blue-600 hover:bg-blue-700 text-white">
//                                     Lưu thay đổi
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }


"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const { toast } = useToast()
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        quantity: "",
        price: "",
        description: "",
        image: "/placeholder.svg?height=200&width=200",
        status: "active" as const,
    })
    const [loading, setLoading] = useState(true)
    const [productNotFound, setProductNotFound] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            const stored = localStorage.getItem("products")
            if (stored) {
                const products = JSON.parse(stored)
                const existing = products.find((p: any) => p.id === id)
                if (existing) {
                    setFormData({
                        id: existing.id,
                        name: existing.name,
                        category: existing.category,
                        quantity: existing.quantity.toString(),
                        price: existing.price.toString(),
                        description: existing.description,
                        image: existing.image,
                        status: existing.status,
                    })
                    setLoading(false)
                } else {
                    setProductNotFound(true)
                    setLoading(false)
                }
            } else {
                setProductNotFound(true)
                setLoading(false)
            }
        }
    }, [id])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const stored = localStorage.getItem("products")
        if (!stored) {
            toast({
                title: "Lỗi",
                description: "Không tìm thấy dữ liệu sản phẩm",
                variant: "destructive",
            })
            return
        }

        const products = JSON.parse(stored)
        const updated = products.map((p: any) =>
            p.id === formData.id
                ? {
                    ...formData,
                    price: Number.parseFloat(formData.price),
                    quantity: Number.parseInt(formData.quantity),
                }
                : p,
        )

        localStorage.setItem("products", JSON.stringify(updated))
        window.dispatchEvent(new Event("productsUpdated"))

        toast({
            title: "Thành công",
            description: `Đã cập nhật sản phẩm "${formData.name}"`,
        })

        router.push("/products")
    }

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        )
    }

    if (productNotFound) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sản phẩm</h1>
                <p className="text-gray-600 mb-4">Sản phẩm với ID "{id}" không tồn tại.</p>
                <Button onClick={() => router.push("/products")}>Quay lại danh sách sản phẩm</Button>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Trang chủ</span>
                <span>»</span>
                <span>Quản lý sản phẩm</span>
                <span>»</span>
                <span className="text-gray-900 font-medium">Sửa sản phẩm</span>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-xl font-bold text-blue-600 mb-6">Sửa thông tin sản phẩm</h1>

                {/* Product Image - Top */}
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
                                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="text-sm">Thêm ảnh</p>
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
                                    rows={4}
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
                                Lưu thay đổi
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
