import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cửa hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Tên cửa hàng</Label>
              <Input id="storeName" defaultValue="Bakery" />
            </div>
            <div>
              <Label htmlFor="storeAddress">Địa chỉ</Label>
              <Input id="storeAddress" placeholder="Nhập địa chỉ cửa hàng" />
            </div>
            <div>
              <Label htmlFor="storePhone">Số điện thoại</Label>
              <Input id="storePhone" placeholder="Nhập số điện thoại" />
            </div>
            <div>
              <Label htmlFor="storeEmail">Email</Label>
              <Input id="storeEmail" type="email" placeholder="Nhập email" />
            </div>
            <Button>Lưu thay đổi</Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt hệ thống</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Thông báo email</Label>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">Sao lưu tự động</Label>
              <Switch id="autoBackup" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Chế độ tối</Label>
              <Switch id="darkMode" />
            </div>
            <div>
              <Label htmlFor="currency">Đơn vị tiền tệ</Label>
              <Input id="currency" defaultValue="VND" />
            </div>
            <Button>Lưu cài đặt</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
