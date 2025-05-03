import React, { useEffect, useState } from 'react';
import { CheckCircle, Coffee } from 'lucide-react';
import { CoffeeFormData } from '../types';
import CoffeeCup from './CoffeeCup';
import { getCoffeeSize } from '../utils/validators';

interface ThankYouMessageProps {
  data: CoffeeFormData;
  onReset: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ data, onReset }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const coffeeSize = getCoffeeSize(data.amount);
  
  return (
    <div className={`w-full max-w-md mx-auto bg-amber-50 rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={36} className="text-green-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Thank You, {data.name}!</h2>
        <p className="text-amber-700 mb-6">
          Your {coffeeSize} coffee donation of ${data.amount} is greatly appreciated.
        </p>
        
        <div className="flex justify-center mb-6">
          <CoffeeCup size={coffeeSize} animate={true} />
        </div>
        
        {data.memo && (
          <div className="bg-white p-4 rounded-lg border border-amber-200 mb-6">
            <p className="text-amber-800 italic">"{data.memo}"</p>
          </div>
        )}
        
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-all"
        >
          <Coffee size={18} />
          Buy Another Coffee
        </button>
      </div>
    </div>
  );
};

export default ThankYouMessage;