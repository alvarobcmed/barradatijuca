import { useState, useEffect } from 'react';
import { SubAccount } from '../types/auth';

const SUB_ACCOUNTS_KEY = 'sub_accounts';

export function useSubAccounts() {
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAccounts = localStorage.getItem(SUB_ACCOUNTS_KEY);
    if (savedAccounts) {
      setSubAccounts(JSON.parse(savedAccounts));
    }
    setIsLoading(false);
  }, []);

  const addSubAccount = (account: Omit<SubAccount, 'id' | 'createdAt' | 'lastLoginAt'>) => {
    const newAccount: SubAccount = {
      ...account,
      id: Date.now().toString(),
      createdAt: Date.now(),
      lastLoginAt: Date.now()
    };
    
    const updatedAccounts = [...subAccounts, newAccount];
    setSubAccounts(updatedAccounts);
    localStorage.setItem(SUB_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    return newAccount;
  };

  const updateSubAccount = (id: string, updates: Partial<SubAccount>) => {
    const updatedAccounts = subAccounts.map(account =>
      account.id === id ? { ...account, ...updates } : account
    );
    setSubAccounts(updatedAccounts);
    localStorage.setItem(SUB_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  };

  const removeSubAccount = (id: string) => {
    const updatedAccounts = subAccounts.filter(account => account.id !== id);
    setSubAccounts(updatedAccounts);
    localStorage.setItem(SUB_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  };

  return {
    subAccounts,
    addSubAccount,
    updateSubAccount,
    removeSubAccount,
    isLoading
  };
}