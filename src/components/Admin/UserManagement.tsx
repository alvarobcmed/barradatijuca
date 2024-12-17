import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubAccounts } from '../../hooks/useSubAccounts';
import { Mail, User, Shield, Edit2, Trash2, Plus } from 'lucide-react';
import { SubAccount } from '../../types/auth';
import toast from 'react-hot-toast';

export function UserManagement() {
  const { user } = useAuth();
  const { subAccounts, addSubAccount, updateSubAccount, removeSubAccount, isLoading } = useSubAccounts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SubAccount | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'editor' as 'admin' | 'editor'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAccount) {
        updateSubAccount(editingAccount.id, formData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        addSubAccount({
          ...formData,
          createdBy: user?.id || ''
        });
        toast.success('Usuário adicionado com sucesso!');
      }
      
      setIsFormOpen(false);
      setEditingAccount(null);
      setFormData({ email: '', name: '', role: 'editor' });
    } catch (error) {
      toast.error('Erro ao salvar usuário');
    }
  };

  const handleEdit = (account: SubAccount) => {
    setEditingAccount(account);
    setFormData({
      email: account.email,
      name: account.name,
      role: account.role
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        removeSubAccount(id);
        toast.success('Usuário removido com sucesso!');
      } catch (error) {
        toast.error('Erro ao remover usuário');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingAccount(null);
            setFormData({ email: '', name: '', role: 'editor' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar Usuário
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <h3 className="text-lg font-medium mb-4">
              {editingAccount ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Função
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingAccount(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingAccount ? 'Salvar Alterações' : 'Adicionar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {subAccounts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum usuário adicional cadastrado
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {subAccounts.map((account) => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {account.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {account.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      account.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {account.role === 'admin' ? 'Administrador' : 'Editor'}
                    </span>
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}