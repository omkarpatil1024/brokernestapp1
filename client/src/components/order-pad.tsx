// import { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowUp, ArrowDown, X, Loader2 } from "lucide-react";
// import { useTrading } from "@/hooks/use-trading";
// import { useToast } from "@/hooks/use-toast";
// import type { OrderFormData } from "@/types/trading";

// interface OrderPadProps {
//   isOpen: boolean;
//   onClose: () => void;
//   stock: {
//     symbol: string;
//     ltp: number;
//     companyName?: string;
//   } | null;
//   defaultOrderType?: 'BUY' | 'SELL';
// }

// export function OrderPad({ isOpen, onClose, stock, defaultOrderType = 'BUY' }: OrderPadProps) {
//   const [orderType, setOrderType] = useState<'BUY' | 'SELL'>(defaultOrderType);
//   const [formData, setFormData] = useState<Partial<OrderFormData>>({
//     orderMode: 'MARKET',
//     product: 'CNC',
//     quantity: 1,
//     validity: 'DAY',
//   });

//   const { placeOrder, isPlacingOrder } = useTrading();
//   const { toast } = useToast();

//   const handleOrderTypeChange = (type: 'BUY' | 'SELL') => {
//     setOrderType(type);
//   };

//   const handleFormChange = (field: keyof OrderFormData, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handlePlaceOrder = async () => {
//     if (!stock || !formData.quantity) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     const orderData: OrderFormData = {
//       symbol: stock.symbol,
//       orderType,
//       orderMode: formData.orderMode || 'MARKET',
//       product: formData.product || 'CNC',
//       quantity: formData.quantity,
//       price: formData.orderMode === 'MARKET' ? stock.ltp : formData.price,
//       validity: formData.validity || 'DAY',
//     };

//     try {
//       await placeOrder(orderData);
//       toast({
//         title: "Success",
//         description: `${orderType} order placed successfully!`,
//       });
//       onClose();
//       setFormData({
//         orderMode: 'MARKET',
//         product: 'CNC',
//         quantity: 1,
//         validity: 'DAY',
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to place order",
//         variant: "destructive",
//       });
//     }
//   };

//   const totalAmount = stock && formData.quantity 
//     ? (formData.orderMode === 'MARKET' 
//         ? stock.ltp * formData.quantity 
//         : (formData.price || stock.ltp) * formData.quantity
//       ).toFixed(2)
//     : "0.00";

//   if (!stock) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <div className="border-b border-gray-200 pb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
//                 <span className="text-gray-600 font-bold">{stock.symbol.slice(0, 2)}</span>
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-gray-900">{stock.symbol}</div>
//                 <div className="text-sm text-gray-500">₹{stock.ltp.toFixed(2)}</div>
//               </div>
//             </div>
//             <Button variant="ghost" size="sm" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="flex bg-gray-100 rounded-xl p-1">
//             <Button
//               variant={orderType === 'BUY' ? 'default' : 'ghost'}
//               className={`flex-1 ${
//                 orderType === 'BUY'
//                   ? 'bg-green-500 hover:bg-green-600 text-white'
//                   : 'text-gray-600'
//               }`}
//               onClick={() => handleOrderTypeChange('BUY')}
//             >
//               <ArrowUp className="mr-2 h-4 w-4" />
//               BUY
//             </Button>
//             <Button
//               variant={orderType === 'SELL' ? 'default' : 'ghost'}
//               className={`flex-1 ${
//                 orderType === 'SELL'
//                   ? 'bg-red-500 hover:bg-red-600 text-white'
//                   : 'text-gray-600'
//               }`}
//               onClick={() => handleOrderTypeChange('SELL')}
//             >
//               <ArrowDown className="mr-2 h-4 w-4" />
//               SELL
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-sm font-medium text-gray-700">Order Type</Label>
//               <Select
//                 value={formData.orderMode}
//                 onValueChange={(value) => handleFormChange('orderMode', value)}
//               >
//                 <SelectTrigger className="mt-2">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="MARKET">Market</SelectItem>
//                   <SelectItem value="LIMIT">Limit</SelectItem>
//                   <SelectItem value="SL">SL</SelectItem>
//                   <SelectItem value="SL-M">SL-M</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label className="text-sm font-medium text-gray-700">Product</Label>
//               <Select
//                 value={formData.product}
//                 onValueChange={(value) => handleFormChange('product', value)}
//               >
//                 <SelectTrigger className="mt-2">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="CNC">CNC</SelectItem>
//                   <SelectItem value="MIS">MIS</SelectItem>
//                   <SelectItem value="NRML">NRML</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-sm font-medium text-gray-700">Quantity</Label>
//               <Input
//                 type="number"
//                 min="1"
//                 placeholder="0"
//                 value={formData.quantity || ''}
//                 onChange={(e) => handleFormChange('quantity', parseInt(e.target.value) || 0)}
//                 className="mt-2"
//               />
//             </div>
//             <div>
//               <Label className="text-sm font-medium text-gray-700">Price</Label>
//               <Input
//                 type="number"
//                 step="0.05"
//                 placeholder="0.00"
//                 value={formData.price || ''}
//                 onChange={(e) => handleFormChange('price', parseFloat(e.target.value) || 0)}
//                 disabled={formData.orderMode === 'MARKET'}
//                 className="mt-2"
//               />
//             </div>
//           </div>

//           <div>
//             <Label className="text-sm font-medium text-gray-700">Validity</Label>
//             <Select
//               value={formData.validity}
//               onValueChange={(value) => handleFormChange('validity', value)}
//             >
//               <SelectTrigger className="mt-2">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="DAY">DAY</SelectItem>
//                 <SelectItem value="IOC">IOC</SelectItem>
//                 <SelectItem value="GTT">GTT</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-gray-50 rounded-xl p-4">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">Total Amount</span>
//               <span className="font-bold text-lg">₹{totalAmount}</span>
//             </div>
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>Available Margin</span>
//               <span>₹1,25,000</span>
//             </div>
//           </div>

//           {/* Place Order Button */}
//           <Button
//             className={`w-full py-4 text-lg font-semibold ${
//               orderType === 'BUY'
//                 ? 'bg-green-500 hover:bg-green-600'
//                 : 'bg-red-500 hover:bg-red-600'
//             }`}
//             onClick={handlePlaceOrder}
//             disabled={isPlacingOrder || !formData.quantity}
//           >
//             {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             {isPlacingOrder ? "Placing..." : orderType}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
