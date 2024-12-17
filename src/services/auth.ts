import api from './api';
import { User } from '../types/auth';
import { SessionService } from './session';
import { generateCSRFToken } from './csrf';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      const csrf = generateCSRFToken();
      const response = await api.post('/auth/login', {
        email,
        password,
        csrf
      });

      const { user, token } = response.data;
      SessionService.createSession(user.id, token);
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  }

  static async register(email: string, password: string, name: string): Promise<User> {
    try {
      const csrf = generateCSRFToken();
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        csrf
      });

      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  }

  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const csrf = generateCSRFToken();
      await api.post('/auth/forgot-password', { email, csrf });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const csrf = generateCSRFToken();
      await api.post('/auth/reset-password', {
        token,
        newPassword,
        csrf
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }

  static async verifyEmail(token: string): Promise<void> {
    try {
      const csrf = generateCSRFToken();
      await api.post('/auth/verify-email', { token, csrf });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify email');
    }
  }

  static logout(): void {
    SessionService.clearSession();
  }
}