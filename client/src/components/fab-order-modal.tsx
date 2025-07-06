import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { OrderFormData } from "@/types/trading";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FabOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: "BUY" | "SELL";
  stock?: {
    symbol: string;
    ltp: number;
    companyName?: string;
  } | null;
}

const mockStocks = [
  { symbol: "RELIANCE", ltp: 2456.75, companyName: "Reliance Industries Ltd" },
  { symbol: "TCS", ltp: 3567.50, companyName: "Tata Consultancy Services" },
  { symbol: "HDFCBANK", ltp: 1678.30, companyName: "HDFC Bank Ltd" },
  { symbol: "INFY", ltp: 1456.80, companyName: "Infosys Limited" },
  { symbol: "ICICIBANK", ltp: 945.60, companyName: "ICICI Bank Ltd" },
];

export function FabOrderModal({
  isOpen,
  onClose,
  orderType,
  stock = null,
}: FabOrderModalProps) {
  const [selectedStock, setSelectedStock] = useState(stock || mockStocks[0]);
  const [formData, setFormData] = useState<Partial<OrderFormData>>({
    orderMode: "MARKET",
    product: "CNC",
    quantity: 1,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (stock) {
      setSelectedStock(stock);
    }
  }, [stock]);

  const handleFormChange = (field: keyof OrderFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedStock || !formData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const orderData: OrderFormData = {
      symbol: selectedStock.symbol,
      orderType,
      orderMode: formData.orderMode || "MARKET",
      product: formData.product || "CNC",
      quantity: formData.quantity,
      price: formData.orderMode === "MARKET" ? selectedStock.ltp : formData.price,
    };

    try {
      toast({
        title: "Success",
        description: `${orderType} order placed successfully!`,
      });
      onClose();
      setFormData({
        orderMode: "MARKET",
        product: "CNC",
        quantity: 1,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive",
      });
    }
  };

  const totalAmount =
    selectedStock && formData.quantity
      ? (formData.orderMode === "MARKET"
          ? selectedStock.ltp * formData.quantity
          : (formData.price || selectedStock.ltp) * formData.quantity
        ).toFixed(2)
      : "0.00";

  if (!selectedStock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                orderType === "BUY" ? "bg-green-100" : "bg-red-100"
              }`}>
                {orderType === "BUY" ? (
                  <ArrowUp className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowDown className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {orderType} {selectedStock.symbol}
                </div>
                <div className="text-sm text-gray-500">
                  ₹{selectedStock.ltp.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Order Type
              </Label>
              <Select
                value={formData.orderMode}
                onValueChange={(value) => handleFormChange("orderMode", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MARKET">Market</SelectItem>
                  <SelectItem value="LIMIT">Limit</SelectItem>
                  <SelectItem value="SL">SL</SelectItem>
                  <SelectItem value="SL-M">SL-M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Product
              </Label>
              <Select
                value={formData.product}
                onValueChange={(value) => handleFormChange("product", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNC">CNC</SelectItem>
                  <SelectItem value="MIS">MIS</SelectItem>
                  <SelectItem value="NRML">NRML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Quantity
              </Label>
              <Input
                type="number"
                min="1"
                placeholder="0"
                value={formData.quantity || ""}
                onChange={(e) =>
                  handleFormChange("quantity", parseInt(e.target.value) || 0)
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Price</Label>
              <Input
                type="number"
                step="0.05"
                placeholder="0.00"
                value={formData.price || ""}
                onChange={(e) =>
                  handleFormChange("price", parseFloat(e.target.value) || 0)
                }
                disabled={formData.orderMode === "MARKET"}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-lg">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Available Margin</span>
              <span>₹1,25,000</span>
            </div>
          </div>

          <Button
            className={`w-full py-4 text-lg font-semibold ${
              orderType === "BUY"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={handlePlaceOrder}
            disabled={!formData.quantity}
          >
            {orderType} NOW
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
