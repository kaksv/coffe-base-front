import React from 'react';
import { CoffeeSize } from '../types';

interface CoffeeCupProps {
  size: CoffeeSize;
  animate?: boolean;
}

const CoffeeCup: React.FC<CoffeeCupProps> = ({ size, animate = false }) => {
  const sizeClasses = {
    small: 'w-16 h-14',
    medium: 'w-20 h-16',
    large: 'w-24 h-20',
  };

  return (
    <div className={`relative ${animate ? 'animate-bounce-gentle' : ''}`}>
      {/* Cup */}
      <div className={`${sizeClasses[size]} mx-auto relative`}>
        <div className="absolute inset-0 bg-amber-100 rounded-b-3xl rounded-t-sm border-2 border-amber-900"></div>
        
        {/* Coffee liquid */}
        <div className="absolute left-0 right-0 bottom-0 bg-amber-800 rounded-b-3xl" style={{ 
          height: size === 'small' ? '65%' : size === 'medium' ? '70%' : '75%' 
        }}></div>
        
        {/* Cup handle */}
        <div className="absolute bg-amber-100 border-2 border-amber-900 rounded-full" style={{
          width: size === 'small' ? '8px' : size === 'medium' ? '10px' : '12px',
          height: size === 'small' ? '20px' : size === 'medium' ? '24px' : '28px',
          right: '-8px',
          top: '25%'
        }}></div>
        
        {/* Steam */}
        <div className="absolute left-1/4 -top-6 opacity-70">
          <div className="h-3 w-1.5 bg-gray-200 rounded-full mb-1 animate-steam delay-100"></div>
        </div>
        <div className="absolute left-1/2 -top-5 opacity-70">
          <div className="h-2 w-1.5 bg-gray-200 rounded-full animate-steam"></div>
        </div>
        <div className="absolute right-1/4 -top-4 opacity-70">
          <div className="h-2.5 w-1.5 bg-gray-200 rounded-full animate-steam delay-200"></div>
        </div>
      </div>
      
      {/* Size label */}
      <div className="text-amber-900 text-center text-xs mt-2 font-medium">
        {size === 'small' ? 'Small' : size === 'medium' ? 'Medium' : 'Large'} Coffee
      </div>
    </div>
  );
};

export default CoffeeCup;