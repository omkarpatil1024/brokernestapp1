import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useLogin } from "./useLogin";



export default function BrokerSelection() {


const { brokers, handleBrokerSelect } = useLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white flex items-center justify-center mx-auto ">
               <img src="../../../public/logo.png" alt="Broker Nest" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Broker Nest
              </h2>
            </div>
            <CardTitle className="text-center text-xl font-bold">
              Select Your Broker
            </CardTitle>
            <CardDescription className="text-center text-sm text-gray-500">
              Connect to your trading account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {brokers.map((broker) => (
                <div
                  key={broker.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary hover:bg-primary/5 flex flex-col h-full`}
                  onClick={() => handleBrokerSelect(broker)}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="w-16 h-16 rounded-lg object-contain mb-3"
                    />
                    <div className="mt-auto">
                      <div className="font-semibold text-gray-900">
                        {broker.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {broker.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
