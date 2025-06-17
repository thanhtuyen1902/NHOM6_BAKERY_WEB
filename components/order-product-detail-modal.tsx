"use client"

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Có thể cần nếu bạn dùng label cho các input
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderProduct {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
  status: string;
  notes?: string;
  outOfStock?: boolean;
  customerCancelRequest?: boolean;
}

interface OrderProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderProduct: OrderProduct | null;
  onUpdateStatus: (orderProductId: string, newStatus: string, reason?: string) => void;
}

export function OrderProductDetailModal({
  isOpen,
  onClose,
  orderProduct,
  onUpdateStatus,
}: OrderProductDetailModalProps) {
  const [reason, setReason] = useState("");
  const [showPreparingOptions, setShowPreparingOptions] = useState(false); // Điều khiển hiển thị lựa chọn Đang giao/Trì hoãn
  const [selectedNextStatus, setSelectedNextStatus] = useState<string | null>(null); // Trạng thái tiếp theo được chọn trong dropdown

  // Reset state khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setShowPreparingOptions(false);
      setSelectedNextStatus(null);
    }
  }, [isOpen]);

  if (!orderProduct) {
    return null;
  }

  // --- Các hàm xử lý sự kiện trong Modal ---

  const handleConfirmOrder = () => {
    // Chuyển từ 'pending' sang 'preparing'
    onUpdateStatus(orderProduct.id, "preparing");
    onClose(); // Đóng modal sau khi cập nhật
  };

  const handleUpdatePreparingStatus = () => {
    if (!selectedNextStatus) {
      alert("Vui lòng chọn trạng thái tiếp theo.");
      return;
    }

    if (selectedNextStatus === "delayed" && !reason.trim()) {
      alert("Vui lòng nhập lý do trì hoãn.");
      return;
    }

    onUpdateStatus(orderProduct.id, selectedNextStatus, reason);
    onClose(); // Đóng modal sau khi cập nhật
  };

  const handleCompleteDelivery = () => {
    // Chuyển từ 'delivering' sang 'completed'
    onUpdateStatus(orderProduct.id, "completed");
    onClose(); // Đóng modal sau khi cập nhật
  };

  const handleCancelOrder = () => {
    if (!reason.trim()) {
        alert("Vui lòng nhập lý do hủy đơn hàng.");
        return;
    }
    onUpdateStatus(orderProduct.id, "cancelled", reason);
    onClose(); // Đóng modal sau khi cập nhật
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{orderProduct.orderId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Thông tin chi tiết đơn hàng */}
          <p><strong>Sản phẩm:</strong> {orderProduct.productName}</p>
          <p><strong>Số lượng:</strong> {orderProduct.quantity}</p>
          <p><strong>Giá:</strong> {orderProduct.price.toLocaleString("vi-VN")} VNĐ</p>
          <p><strong>Trạng thái:</strong> {orderProduct.status}</p> {/* Hiển thị trạng thái hiện tại */}
          <p><strong>Khách hàng:</strong> {orderProduct.customerName}</p>
          <p><strong>Điện thoại:</strong> {orderProduct.customerPhone}</p>
          <p><strong>Địa chỉ:</strong> {orderProduct.customerAddress}</p>
          <p><strong>Ngày đặt:</strong> {orderProduct.orderDate}</p>
          {orderProduct.notes && <p><strong>Ghi chú:</strong> {orderProduct.notes}</p>}
          {orderProduct.outOfStock && <p className="text-red-500"><strong>Tình trạng:</strong> Hết hàng</p>}
          {orderProduct.customerCancelRequest && <p className="text-orange-500"><strong>Yêu cầu:</strong> Hủy từ khách hàng</p>}

          <hr className="my-2" />

          {/* Các nút hành động dựa trên trạng thái hiện tại của đơn hàng */}

          {orderProduct.status === "pending" && (
            <Button onClick={handleConfirmOrder} className="bg-green-500 hover:bg-green-600 text-white w-full">
              Xác nhận đơn hàng
            </Button>
          )}

          {orderProduct.status === "preparing" && (
            <div>
              {!showPreparingOptions && (
                <Button onClick={() => setShowPreparingOptions(true)} className="w-full">
                  Cập nhật trạng thái
                </Button>
              )}
              {showPreparingOptions && (
                <div className="mt-4 space-y-2">
                  <Select onValueChange={(value) => {
                    setSelectedNextStatus(value);
                    if (value !== "delayed") setReason(""); // Clear reason if not delayed
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái tiếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivering">Đang giao</SelectItem>
                      <SelectItem value="delayed">Trì hoãn</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedNextStatus === "delayed" && (
                    <Textarea
                      placeholder="Nhập lý do trì hoãn..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-2"
                    />
                  )}
                  {selectedNextStatus && (
                    <Button onClick={handleUpdatePreparingStatus} className="w-full mt-2">
                      Xác nhận
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {orderProduct.status === "delivering" && (
            <Button onClick={handleCompleteDelivery} className="bg-blue-500 hover:bg-blue-600 text-white w-full">
              Xác nhận giao hàng thành công
            </Button>
          )}

          {/* Nút Hủy đơn hàng - hiển thị nếu chưa hoàn thành hoặc chưa bị hủy */}
          {(orderProduct.status !== "completed" && orderProduct.status !== "cancelled") && (
            <div className="space-y-2 mt-4 pt-4 border-t"> {/* Thêm border-t để phân tách */}
                <Textarea
                    placeholder="Nhập lý do hủy đơn hàng (bắt buộc)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <Button onClick={handleCancelOrder} className="bg-red-500 hover:bg-red-600 text-white w-full">
                    Hủy đơn hàng
                </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}