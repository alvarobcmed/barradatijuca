import React, { useState } from 'react';
import { stripePromise, STRIPE_PRICES } from '../../config/stripe';
import { useAuth } from '../../contexts/AuthContext';
import { createCheckoutSession } from '../../services/stripe/checkout';
import toast from 'react-hot-toast';

interface CheckoutButtonProps {
  priceType: keyof typeof STRIPE_PRICES;
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({ 
  priceType, 
  variant = 'primary',
  className = '', 
  children 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      // Check if we have registration info
      const email = localStorage.getItem('registration_email');
      const name = localStorage.getItem('registration_name');
      
      if (email && name) {
        // User just registered, proceed with checkout
        localStorage.removeItem('registration_email');
        localStorage.removeItem('registration_name');
      } else {
        toast.error('Por favor, faça login para continuar');
        window.location.href = '/login';
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error } = await createCheckoutSession(
        priceType, 
        user?.uid,
        user?.email || localStorage.getItem('registration_email')
      );

      if (error) {
        throw new Error(error);
      }
    } catch (err) {
      console.error('Erro no checkout:', err);
      toast.error('Erro ao iniciar checkout. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`
        relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-medium
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white hover:opacity-90'
          : 'bg-white text-[#6B0F6C] hover:bg-gray-50 border-[#6B0F6C]'
        }
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      ) : null}
      <span className={isLoading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
}