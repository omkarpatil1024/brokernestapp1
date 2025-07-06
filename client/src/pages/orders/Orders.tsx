import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { useOrders } from "./useOrders";

export default function Orders() {
  const { orders, portfolio, isLoading, handleStockClick } = useOrders();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* P&L Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>P&L Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                +₹{portfolio?.realizedPnL || "0"}
              </div>
              <div className="text-sm text-green-700">Realized P&L</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                +₹{portfolio?.unrealizedPnL || "0"}
              </div>
              <div className="text-sm text-blue-700">Unrealized P&L</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <p className="text-sm text-gray-500">Past trading orders</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order, index) => {
            const isBuy = order.orderType === "BUY";
            const totalValue = order.price
              ? (parseFloat(order.price) * order.quantity).toFixed(2)
              : "N/A";

            return (
              <div
                key={order.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm cursor-pointer transition-all"
                onClick={() =>
                  handleStockClick(order.symbol, parseFloat(order.price || "0"))
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isBuy ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {isBuy ? (
                        <ArrowUp className={`text-green-600 h-4 w-4`} />
                      ) : (
                        <ArrowDown className={`text-red-600 h-4 w-4`} />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {order.symbol}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.orderType} • {order.orderMode} Order
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      {order.status}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), "MMM dd, h:mm a")}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Quantity</div>
                    <div className="font-medium">{order.quantity} shares</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Price</div>
                    <div className="font-medium">
                      ₹{order.price || "Market"}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total</div>
                    <div className="font-medium">₹{totalValue}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No orders found. Start trading to see your order history.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
