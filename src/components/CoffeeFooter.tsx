import React from 'react';
import { Heart } from 'lucide-react';

const CoffeeFooter: React.FC = () => {
  return (
    <footer className="mt-12 text-center text-amber-700 text-sm">
      <p className="flex items-center justify-center gap-1">
        Made with <Heart size={16} className="text-red-500 animate-pulse" fill="currentColor" /> 
        for coffee lovers everywhere
      </p>
      <p className="mt-2">© {new Date().getFullYear()}Decentracode Coffee Support</p>
    </footer>
  );
};

export default CoffeeFooter;