import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "./useDashboard";
import type { Holding } from "@shared/schema";

export default function Dashboard() {
  const { holdings, portfolio, isLoading, handleStockClick } = useDashboard();

  const calculatePnL = (holding: Holding) => {
    const currentValue = parseFloat(holding.ltp) * holding.quantity;
    const investedValue = parseFloat(holding.avgPrice) * holding.quantity;
    const pnl = currentValue - investedValue;
    const pnlPercent = (pnl / investedValue) * 100;

    return {
      pnl: pnl.toFixed(2),
      pnlPercent: pnlPercent.toFixed(2),
      currentValue: currentValue.toFixed(2),
    };
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
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
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ₹{portfolio?.totalValue || "0"}
              </div>
              <div className="text-sm text-gray-500">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ₹{portfolio?.totalInvested || "0"}
              </div>
              <div className="text-sm text-gray-500">Invested</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  parseFloat(portfolio?.totalPnL || "0") >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(portfolio?.totalPnL || "0") >= 0 ? "+" : ""}₹
                {portfolio?.totalPnL || "0"}
              </div>
              <div className="text-sm text-gray-500">Total P&L</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  parseFloat(portfolio?.pnlPercentage || "0") >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(portfolio?.pnlPercentage || "0") >= 0 ? "+" : ""}
                {portfolio?.pnlPercentage || "0"}%
              </div>
              <div className="text-sm text-gray-500">Returns</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
          <p className="text-sm text-gray-500">Long-term investments</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {holdings.map((holding, index) => {
            const { pnl, pnlPercent, currentValue } = calculatePnL(holding);
            const isProfitable = parseFloat(pnl) >= 0;

            return (
              <div
                key={holding.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm cursor-pointer transition-all"
                onClick={() =>
                  handleStockClick(
                    holding.symbol,
                    parseFloat(holding.ltp),
                    holding.companyName
                  )
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">
                        {holding.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {holding.symbol}
                      </div>
                      <div className="text-sm text-gray-500">
                        {holding.companyName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {holding.quantity} shares
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ₹{holding.ltp}
                    </div>
                    <div
                      className={`text-sm ${
                        isProfitable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isProfitable ? "+" : ""}
                      {pnlPercent}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Avg. Price</div>
                    <div className="font-medium">₹{holding.avgPrice}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">P&L</div>
                    <div
                      className={`font-medium ${
                        isProfitable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isProfitable ? "+" : ""}₹{pnl}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current Value</div>
                    <div className="font-medium">₹{currentValue}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {holdings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No holdings found. Start investing to see your portfolio.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
