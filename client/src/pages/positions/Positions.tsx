import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePositions } from "./usePositions";
import { DraggableFAB } from "@/components/draggable-fab";
import type { Position } from "@shared/schema";

export default function Positions() {
  const { positions, portfolio, isLoading } = usePositions();
  const [orderPadOpen, setOrderPadOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<{
    symbol: string;
    ltp: number;
    companyName: string;
  } | null>(null);
  const [defaultOrderType, setDefaultOrderType] = useState<'BUY' | 'SELL'>('BUY');

  const calculatePnL = (position: Position) => {
    const currentValue = parseFloat(position.ltp) * position.quantity;
    const entryValue = parseFloat(position.entryPrice) * position.quantity;
    
    let pnl: number;
    if (position.positionType === 'LONG') {
      pnl = currentValue - entryValue;
    } else {
      pnl = entryValue - currentValue;
    }
    
    const pnlPercent = (pnl / entryValue) * 100;
    
    return {
      pnl: pnl.toFixed(2),
      pnlPercent: pnlPercent.toFixed(2),
    };
  };

  const handleStockClick = (symbol: string, ltp: number, companyName: string) => {
    setSelectedStock({ symbol, ltp, companyName });
    setOrderPadOpen(true);
  };

  const getFirstStock = () => {
    if (positions.length > 0) {
      const firstPosition = positions[0];
      return {
        symbol: firstPosition.symbol,
        ltp: parseFloat(firstPosition.ltp),
        companyName: firstPosition.companyName
      };
    }
    return { symbol: 'INFY', ltp: 1456.80, companyName: 'Infosys Limited' };
  };

  const handleQuickBuy = () => {
    const stock = getFirstStock();
    setSelectedStock(stock);
    setDefaultOrderType('BUY');
    setOrderPadOpen(true);
  };

  const handleQuickSell = () => {
    const stock = getFirstStock();
    setSelectedStock(stock);
    setDefaultOrderType('SELL');
    setOrderPadOpen(true);
  };

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
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-32" />
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
      {/* Today's P&L Card */}
      <Card>
        <CardHeader>
          <CardTitle>Today's P&L</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                +₹{portfolio?.todaysPnL || '0'}
              </div>
              <div className="text-sm text-green-700">Total Profit</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600">
                -₹{portfolio?.todaysLoss || '0'}
              </div>
              <div className="text-sm text-red-700">Total Loss</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
          <p className="text-sm text-gray-500">Intraday trades</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {positions.map((position, index) => {
            const { pnl, pnlPercent } = calculatePnL(position);
            const isProfitable = parseFloat(pnl) >= 0;
            const changeAmount = parseFloat(position.ltp) - parseFloat(position.entryPrice);
            
            return (
              <div
                key={position.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm cursor-pointer transition-all"
                onClick={() => handleStockClick(position.symbol, parseFloat(position.ltp), position.companyName)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">
                        {position.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{position.symbol}</div>
                      <div className="text-sm text-gray-500">{position.companyName}</div>
                      <div className="text-sm text-gray-500">
                        {position.positionType} • {position.quantity} shares
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{position.ltp}</div>
                    <div className={`text-sm ${changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {changeAmount >= 0 ? '+' : ''}₹{changeAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Entry Price</div>
                    <div className="font-medium">₹{position.entryPrice}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">P&L</div>
                    <div className={`font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                      {isProfitable ? '+' : ''}₹{pnl}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">% Change</div>
                    <div className={`font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                      {isProfitable ? '+' : ''}{pnlPercent}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {positions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No active positions. Start trading to see your positions.
            </div>
          )}
        </CardContent>
      </Card>

     
    </div>
  );
}