import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { BrowserProvider } from 'ethers';

interface WalletButtonProps {
  onConnect: (address: string) => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet!');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      onConnect(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wallet size={18} />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;