"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Search } from "lucide-react"
import { ProductFormModal } from "@/components/product-form-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { ProductActionsDropdown } from "@/components/product-actions-dropdown"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { useToast } from "@/hooks/use-toast"

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

const initialProducts: Product[] = [
  {
    id: "BA01",
    name: "Bánh Phô Mai Nướng",
    price: 60000,
    category: "Bánh nướng",
    quantity: 20,
    description: "Bánh ngon",
    image: "/placeholder.svg?height=60&width=60",
    status: "active",
  },
  {
    id: "BA02",
    name: "Bánh Cupcake Socola",
    price: 30000,
    category: "Bánh ngọt",
    quantity: 30,
    description: "Cupcake mini vị socola",
    image: "/placeholder.svg?height=60&width=60",
    status: "active",
  },
  {
    id: "BA03",
    name: "Bánh Tiramisu",
    price: 85000,
    category: "Bánh kem",
    quantity: 15,
    description: "Bánh Tiramisu truyền thống",
    image: "/placeholder.svg?height=60&width=60",
    status: "active",
  },
  {
    id: "BA04",
    name: "Bánh Tart Trái Cây",
    price: 45000,
    category: "Bánh tart",
    quantity: 25,
    description: "Tart với trái cây tươi",
    image: "/placeholder.svg?height=60&width=60",
    status: "active",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const generateProductId = () => {
    const maxId = products.reduce((max, product) => {
      const num = Number.parseInt(product.id.replace("BA", ""))
      return num > max ? num : max
    }, 0)
    return `BA${String(maxId + 1).padStart(2, "0")}`
  }

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: generateProductId(),
    }
    setProducts((prev) => [...prev, newProduct])
    toast({
      title: "Thành công",
      description: "Đã thêm sản phẩm mới",
    })
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    toast({
      title: "Thành công",
      description: "Đã cập nhật thông tin sản phẩm",
    })
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id))
      toast({
        title: "Thành công",
        description: `Đã xóa sản phẩm "${selectedProduct.name}"`,
      })
      setShowDeleteModal(false)
      setSelectedProduct(null)
    }
  }

  const handleToggleProductStatus = (product: Product) => {
    const newStatus = product.status === "active" ? "hidden" : "active"
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p)))
    toast({
      title: "Thành công",
      description: `Đã ${newStatus === "hidden" ? "ẩn" : "hiện"} sản phẩm "${product.name}"`,
    })
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowDetailModal(true)
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Trang chủ</span>
        <span>›</span>
        <span className="text-gray-900 font-medium">Quản lý sản phẩm</span>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Tên sản phẩm:</label>
              <Input
                placeholder="Nhập tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Loại sản phẩm:</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Bánh nướng">Bánh nướng</SelectItem>
                  <SelectItem value="Bánh ngọt">Bánh ngọt</SelectItem>
                  <SelectItem value="Bánh kem">Bánh kem</SelectItem>
                  <SelectItem value="Bánh tart">Bánh tart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm mới
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-600">
                <Download className="w-4 h-4 mr-2" />
                Nhập từ excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left p-3">Mã sản phẩm</th>
                  <th className="text-left p-3">Tên sản phẩm</th>
                  <th className="text-left p-3">Giá bán</th>
                  <th className="text-left p-3">Loại bánh</th>
                  <th className="text-left p-3">Số lượng</th>
                  <th className="text-left p-3">Trạng thái</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-3 font-medium">{product.id}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.price.toLocaleString("vi-VN")}đ</td>
                    <td className="p-3">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3">
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status === "active" ? "Đang bán" : "Đã ẩn"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <ProductActionsDropdown
                        product={product}
                        onView={handleViewProduct}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleStatus={handleToggleProductStatus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ProductFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
        mode="add"
      />

      <ProductFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedProduct(null)
        }}
        onSave={handleEditProduct}
        product={selectedProduct}
        mode="edit"
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedProduct(null)
        }}
        onConfirm={handleDeleteProduct}
        productName={selectedProduct?.name || ""}
      />

      <ProductDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct}
      />
    </div>
  )
}
