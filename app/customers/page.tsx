"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { CustomerDetailModal } from "@/components/customer-detail-modal";
import { CustomerFormModal } from "@/components/customer-form-modal";
import { CustomerDeleteModal } from "@/components/customer-delete-modal";
import { CustomerActionsDropdown } from "@/components/customer-actions-dropdown";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: "regular" | "vip";
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "inactive";
}

const initialCustomers: Customer[] = [
  {
    id: "KH001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@email.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    type: "vip",
    joinDate: "15/01/2024",
    totalOrders: 12,
    totalSpent: 2500000,
    lastOrderDate: "20/01/2024",
    status: "active",
  },
  {
    id: "KH002",
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@email.com",
    address: "456 Đường DEF, Quận 2, TP.HCM",
    type: "regular",
    joinDate: "10/01/2024",
    totalOrders: 5,
    totalSpent: 800000,
    lastOrderDate: "18/01/2024",
    status: "active",
  },
  {
    id: "KH003",
    name: "Lê Văn C",
    phone: "0923456789",
    email: "levanc@email.com",
    address: "789 Đường GHI, Quận 3, TP.HCM",
    type: "vip",
    joinDate: "05/01/2024",
    totalOrders: 18,
    totalSpent: 4200000,
    lastOrderDate: "19/01/2024",
    status: "active",
  },
  {
    id: "KH004",
    name: "Phạm Thị D",
    phone: "0934567890",
    email: "phamthid@email.com",
    address: "321 Đường JKL, Quận 4, TP.HCM",
    type: "regular",
    joinDate: "08/01/2024",
    totalOrders: 3,
    totalSpent: 450000,
    lastOrderDate: "16/01/2024",
    status: "inactive",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("customers");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCustomerId = () => {
    const maxId = customers.reduce((max, customer) => {
      const num = Number.parseInt(customer.id.replace("KH", ""));
      return num > max ? num : max;
    }, 0);
    return `KH${String(maxId + 1).padStart(3, "0")}`;
  };

  // Unified save handler that works for both add and edit
  const handleSave = (customerData: Customer | Omit<Customer, "id">) => {
    if (formMode === "add") {
      // Adding new customer - customerData should be Omit<Customer, "id">
      const newCustomer: Customer = {
        ...customerData,
        id: generateCustomerId(),
      };
      setCustomers((prev) => [...prev, newCustomer]);
      toast({
        title: "Thành công",
        description: "Đã thêm khách hàng mới",
      });
    } else {
      // Editing existing customer - customerData should be Customer
      const updatedCustomer = customerData as Customer;
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin khách hàng",
      });
    }
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== selectedCustomer.id)
      );
      toast({
        title: "Thành công",
        description: `Đã xóa khách hàng "${selectedCustomer.name}"`,
      });
      setShowDeleteModal(false);
      setSelectedCustomer(null);
    }
  };

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormMode("edit");
    setShowFormModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleCall = (customer: Customer) => {
    toast({
      title: "Thông báo",
      description: `Đang gọi cho ${customer.name} - ${customer.phone}`,
    });
  };

  const handleEmail = (customer: Customer) => {
    toast({
      title: "Thông báo",
      description: `Đang soạn email cho ${customer.name} - ${customer.email}`,
    });
  };

  const getCustomerStats = () => {
    return {
      total: customers.length,
      vip: customers.filter((c) => c.type === "vip").length,
      active: customers.filter((c) => c.status === "active").length,
      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    };
  };

  const stats = getCustomerStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger
            value="customers"
            className="bg-blue-600 text-white data-[state=active]:bg-blue-700"
          >
            Khách hàng
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    +{stats.total.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Tổng khách hàng</p>
                  <p className="text-xs text-green-600 mt-1">
                    +180 khách tháng này
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.vip}</div>
                  <p className="text-sm text-gray-600 mt-1">Khách hàng VIP</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mua trên 1 tr đồng
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.active}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Khách hàng hoạt động
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mua hàng trong 30 ngày qua
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {stats.totalRevenue.toLocaleString("vi-VN")}đ
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Tổng doanh thu</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Từ tất cả khách hàng
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Danh sách khách hàng</CardTitle>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setFormMode("add");
                    setSelectedCustomer(null);
                    setShowFormModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm khách hàng
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-3">Khách hàng</th>
                      <th className="p-3">SĐT</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Ngày tham gia</th>
                      <th className="p-3">Tổng đơn hàng</th>
                      <th className="p-3">Tổng chi tiêu</th>
                      <th className="p-3">Loại</th>
                      <th className="p-3">Trạng thái</th>
                      <th className="p-3">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{customer.name}</td>
                        <td className="p-3">{customer.phone}</td>
                        <td className="p-3">{customer.email}</td>
                        <td className="p-3">{customer.joinDate}</td>
                        <td className="p-3">{customer.totalOrders}</td>
                        <td className="p-3">
                          {customer.totalSpent.toLocaleString("vi-VN")}đ
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              customer.type === "vip" ? "default" : "secondary"
                            }
                          >
                            {customer.type === "vip" ? "VIP" : "Thường"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              customer.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {customer.status === "active"
                              ? "Hoạt động"
                              : "Không hoạt động"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <CustomerActionsDropdown
                            customer={customer}
                            onViewDetail={handleViewDetail}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onCall={handleCall}
                            onEmail={handleEmail}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <p>Trang tổng quan - Nội dung sẽ được cập nhật</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardContent className="p-6">
              <p>Trang đơn hàng - Nội dung sẽ được cập nhật</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CustomerDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onEdit={(customer) => {
          setShowDetailModal(false);
          handleEdit(customer);
        }}
        onDelete={(customer) => {
          setShowDetailModal(false);
          handleDelete(customer);
        }}
      />

      <CustomerFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSave}
        customer={selectedCustomer}
        mode={formMode}
      />

      <CustomerDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDeleteCustomer}
        customer={selectedCustomer}
      />
    </div>
  );
}
