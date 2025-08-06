import React, { useState } from 'react';
import BuyCoffeeForm from './components/BuyCoffeeForm';
import CoffeeHeader from './components/CoffeeHeader';
import CoffeeFooter from './components/CoffeeFooter';
import { ethers } from "ethers";
import ThankYouMessage from './components/ThankYouMessage';


import { getContract } from 'thirdweb';
import { baseSepolia } from 'thirdweb/chains';
import { useReadContract } from 'thirdweb/react';
import abi from './utils/BuyMeACoffee.mts';
// import WalletButton from './components/WalletButton';
import { CoffeeFormData } from './types';
// import { client } from "./utils/client";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from 'thirdweb/react';
import sdk from "@farcaster/miniapp-sdk";
import { Contract } from 'ethers';


function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<CoffeeFormData | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [memos, setMemos] = useState<any[]>([]);
  
  const contractAddress = "0xD5Cdc282BE2e7762Ce9f13684B9430910a38357e"
  // connect to wallet
  const client = createThirdwebClient({ clientId: "3c6a69bb85a86dd4ca5cd90f80a58b9c " });
// contract instance

// Read all the tips from the smart contract
// Farcaster Implementation
sdk.actions.ready();
const getTips = async () => {
  try {
    if (!window.ethereum) {
      console.error("Wallet address is not connected");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const BuyMeCoffee = new ethers.Contract(contractAddress, abi, signer);
    const memos = await BuyMeCoffee.getMemos();
    setMemos(memos);
    console.log("Fetched memos:", memos);

  }catch (error) {
    console.error("Error fetching memos:", error);
  }
}

  const handleSubmit = (data: CoffeeFormData) => {
    // In a real app, we would process the payment here
    console.log('Processing payment:', data);
    
    // Simulate processing delay
    setTimeout(() => {
      setFormData(data);
      setSubmitted(true);
    }, 800);
  };
  
  const handleReset = () => {
    setSubmitted(false);
    setFormData(null);
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        <CoffeeHeader />
        
        <div className="flex justify-center mb-8">
          {walletAddress ? (
            <div className="bg-amber-100 text-amber-800 py-2 px-4 rounded-lg font-mono text-sm">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            // <WalletButton onConnect={handleWalletConnect} />
            // <div className="flex items-center gap-2 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <ConnectButton
                
               client={client}
                />
            // </div>
          )}
        </div>
        
        {submitted && formData ? (
          <ThankYouMessage data={formData} onReset={handleReset} />
        ) : (
          <BuyCoffeeForm onSubmit={handleSubmit} />
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Latest Tip Messages</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <button
              onClick={getTips}
              className="bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-all mb-4"
            >
              Fetch Tips
            </button>
            {memos && memos.map((memo, index) => (
              <div key={index} className="mb-4 p-4 border-b last:border-b-0">
                <p className="text-sm text-gray-600">{memo.message}</p>
                <p className="text-xs text-gray-400">From: {memo.from.slice(0, 6)}...{memo.from.slice(-4)}</p>
                <p className="text-xs text-gray-400">At: {new Date(Number(memo.timestamp) * 1000).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        
        <CoffeeFooter />
      </div>
    </div>
  );
}

export default App;
