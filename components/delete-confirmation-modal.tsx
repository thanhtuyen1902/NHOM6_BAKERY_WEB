"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Xác nhận xóa sản phẩm</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xóa sản phẩm <strong>"{productName}"</strong> không?
          </p>
          <p className="text-sm text-red-500 mt-2">Hành động này không thể hoàn tác!</p>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Xóa sản phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
