'use client';

import React, { useState } from 'react';
import { FiShare2, FiCheck } from 'react-icons/fi';

const ShareSaveActions = ({ propertyTitle }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle || 'Propiedad',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-medium text-main-100 hover:text-main-200 transition-colors"
      >
        {isCopied ? <FiCheck size={18} className="text-green-600" /> : <FiShare2 size={18} />}
        {isCopied ? 'Enlace copiado' : 'Compartir propiedad'}
      </button>
    </div>
  );
};

export default ShareSaveActions;
