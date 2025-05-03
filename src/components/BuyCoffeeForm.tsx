import React, { useState } from 'react';
import { DollarSign, Send } from 'lucide-react';
import { CoffeeFormData, FormErrors } from '../types';
import { validateForm, getCoffeeSize } from '../utils/validators';
import CoffeeCup from './CoffeeCup';
import { ethers } from 'ethers';
import abi from '../utils/BuyMeACoffee.mts';

interface BuyCoffeeFormProps {
  onSubmit: (data: CoffeeFormData) => void;
}

const BuyCoffeeForm: React.FC<BuyCoffeeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CoffeeFormData>({
    name: '',
    memo: '',
    amount: 0.1
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: string | number = value;
    if (name === 'amount') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      const fieldErrors = validateForm({
        ...formData,
        [name]: parsedValue
      });
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors]
      }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const fieldErrors = validateForm(formData);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormErrors]
    }));
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      memo: true,
      amount: true
    });
    
    // If no errors, submit the form
    if (Object.keys(formErrors).length === 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = "0xD5Cdc282BE2e7762Ce9f13684B9430910a38357e";
      const BuyMeCoffee = new ethers.Contract(contractAddress, abi, signer);
      const signature = await signer.signMessage("Continue to Buy Me Coffee. I appreciate your support!");
      console.log("Signature: ", signature);
      const tx = await BuyMeCoffee.buyMeACoffee(formData.name, formData.memo, {
        value: ethers.parseEther(formData.amount.toString()),
      });
      await tx.wait();
      console.log('Transaction successful:', tx);
      // onSubmit(formData);
    }
  };
  
  const coffeeSize = getCoffeeSize(formData.amount);
  
  return (
    <div className="w-full max-w-md mx-auto bg-amber-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <CoffeeCup size={coffeeSize} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Crypto Punk"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-amber-300 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          {/* Memo Field */}
          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-amber-900 mb-1">
              Message 
            </label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Thanks for your amazing work!"
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.memo ? 'border-red-500 bg-red-50' : 'border-amber-300 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
            />
            {errors.memo && (
              <p className="mt-1 text-sm text-red-600">{errors.memo}</p>
            )}
          </div>
          
          {/* Amount Field */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-amber-900 mb-1">
              Amount (ETH)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <DollarSign size={18} className="text-amber-700" /> */}
                <span className="mx-2 text-amber-700">ETH</span>
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
                step="1"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border mx-4 ${
                  errors.amount ? 'border-red-500 bg-red-50' : 'border-amber-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
            
            {/* Amount Quick Selects */}
            <div className="flex gap-2 mt-2">
              {[0.01, 0.1, 1].map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount }))}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    formData.amount === amount
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
                  }`}
                >
                  ETH  {amount}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <button
          onClick={
             handleSubmit
            // () => 
            // setFormData(prev => ({ ...prev, amount: formData.amount, name: formData.name, memo: formData.memo })
            
          }
            type="submit"
            className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            <Send size={18} />
            Send Coffee
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyCoffeeForm;