import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";

interface DraggableFABProps {
  onQuickBuy: () => void;
  onQuickSell: () => void;
}

export function DraggableFAB({ onQuickBuy, onQuickSell }: DraggableFABProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });
  const fabRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!fabRef.current) return;
    
    setIsDragging(true);
    const rect = fabRef.current.getBoundingClientRect();
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: rect.left,
      initialY: rect.top,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    const newX = dragRef.current.initialX + deltaX;
    const newY = dragRef.current.initialY + deltaY;
    
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;
    
    const constrainedX = Math.max(16, Math.min(newX, maxX));
    const constrainedY = Math.max(16, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!fabRef.current) return;
    
    setIsDragging(true);
    const rect = fabRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: rect.left,
      initialY: rect.top,
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragRef.current.startX;
    const deltaY = touch.clientY - dragRef.current.startY;
    
    const newX = dragRef.current.initialX + deltaX;
    const newY = dragRef.current.initialY + deltaY;
    
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;
    
    const constrainedX = Math.max(16, Math.min(newX, maxX));
    const constrainedY = Math.max(16, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleFABClick = () => {
    if (!isDragging) {
      setShowOptions(!showOptions);
    }
  };

  const handleQuickAction = (action: () => void) => {
    action();
    setShowOptions(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fabStyle = position.x !== 0 || position.y !== 0 
    ? { 
        position: 'fixed' as const, 
        left: position.x, 
        top: position.y,
        right: 'auto',
        bottom: 'auto'
      }
    : {};

  return (
    <div 
      ref={fabRef}
      className="fixed bottom-6 right-6 z-40"
      style={fabStyle}
    >
      <Button
        size="lg"
        className="w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 bg-primary hover:bg-primary/90"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleFABClick}
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      {showOptions && (
        <div className="absolute bottom-20 right-0 space-y-3">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 bg-green-500 hover:bg-green-600"
            onClick={() => handleQuickAction(onQuickBuy)}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 bg-red-500 hover:bg-red-600"
            onClick={() => handleQuickAction(onQuickSell)}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
