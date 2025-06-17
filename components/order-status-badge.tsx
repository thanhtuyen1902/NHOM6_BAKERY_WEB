"use client"

import { Badge } from "@/components/ui/badge"

interface OrderStatusBadgeProps {
  status: string
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Chờ xác nhận", variant: "secondary" as const }
      case "confirmed":
        return { label: "Đã xác nhận", variant: "default" as const }
      case "preparing":
        return { label: "Đang chuẩn bị", variant: "secondary" as const }
      case "ready":
        return { label: "Sẵn sàng", variant: "default" as const }
      case "delivering":
        return { label: "Đang giao", variant: "secondary" as const }
      case "completed":
        return { label: "Hoàn thành", variant: "default" as const }
      case "cancelled":
        return { label: "Đã hủy", variant: "destructive" as const }
      default:
        return { label: status, variant: "secondary" as const }
    }
  }

  const config = getStatusConfig(status)
  return <Badge variant={config.variant}>{config.label}</Badge>
}
