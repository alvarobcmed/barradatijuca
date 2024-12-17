import React, { useState } from 'react';
import { Logo } from '../../Logo/Logo';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <Logo variant="light" size="lg" />
            <div className="max-w-sm">
              <h4 className="text-xl font-semibold mb-4">
                Receba novidades e atualizações
              </h4>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu email"
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0A7B] text-white placeholder-white/50"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/70 hover:text-white">Recursos</a></li>
              <li><a href="#pricing" className="text-white/70 hover:text-white">Preços</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/70 hover:text-white">Stories</a></li>
              <li><a href="#features" className="text-white/70 hover:text-white">Analytics</a></li>
              <li><a href="#features" className="text-white/70 hover:text-white">Personalização</a></li>
              <li><a href="#features" className="text-white/70 hover:text-white">Integrações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contato@stry.live" className="text-white/70 hover:text-white">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>© 2024 Stry Live. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}