// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { AlertTriangle } from "lucide-react"

// interface DeleteConfirmationModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
//   productName: string
// }

// export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }: DeleteConfirmationModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle className="flex items-center space-x-2">
//             <AlertTriangle className="w-5 h-5 text-red-500" />
//             <span>Xác nhận xóa sản phẩm</span>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="py-4">
//           <p className="text-gray-600">
//             Bạn có chắc chắn muốn xóa sản phẩm <strong>"{productName}"</strong> không?
//           </p>
//           <p className="text-sm text-red-500 mt-2">Hành động này không thể hoàn tác!</p>
//         </div>

//         <div className="flex justify-end space-x-4">
//           <Button variant="outline" onClick={onClose}>
//             Hủy
//           </Button>
//           <Button variant="destructive" onClick={onConfirm}>
//             Xóa sản phẩm
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 rounded-none">
        {/* Hidden DialogTitle for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
        </VisuallyHidden>

        {/* Header với background xanh */}
        <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
          <h2 className="text-base font-medium">Xác nhận xóa sản phẩm</h2>
          <button onClick={onClose} className="text-white hover:text-white/80 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Nội dung */}
        <div className="px-6 py-6">
          <p className="text-gray-800 text-sm leading-relaxed">
            Bạn có chắc chắn muốn xóa sản phẩm <span className="font-medium">"{productName}"</span> khỏi danh sách?
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-4 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-sm"
          >
            Hủy
          </Button>
          <Button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-sm">
            Xóa sản phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
