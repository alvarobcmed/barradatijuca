import { FirebaseError } from 'firebase/app';

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: FirebaseError
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return new AuthError('Email inválido', error.code, error);
      case 'auth/user-disabled':
        return new AuthError('Usuário desativado', error.code, error);
      case 'auth/user-not-found':
        return new AuthError('Usuário não encontrado', error.code, error);
      case 'auth/wrong-password':
        return new AuthError('Senha incorreta', error.code, error);
      case 'auth/email-already-in-use':
        return new AuthError('Este email já está em uso', error.code, error);
      case 'auth/weak-password':
        return new AuthError('A senha deve ter pelo menos 6 caracteres', error.code, error);
      case 'auth/operation-not-allowed':
        return new AuthError('Operação não permitida', error.code, error);
      default:
        return new AuthError('Erro na autenticação', error.code, error);
    }
  }
  return new AuthError('Erro inesperado na autenticação', 'unknown');
}