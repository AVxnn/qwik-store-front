import { apiClient } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  storeName?: string;
  phoneNumber?: string;
tariff?: string;
  telegramUsername?: string;
  avatar?: string;
  avatarUrl?: string;
  primaryShopId?: string;
  primaryShop?: {
    description: string;
    id: string;
    imageUrl: string;
    isActive: boolean;
    name: string;
    adminUsername: string;
    createdAt: string;
    minOrderAmount: string;
    ownerId: string;
    telegramBotToken: string;
  }
  settings?: {
    id: string;
    userId: string;
    telegramNotifications: boolean;
    dashboardNotifications: boolean;
    emailNotifications: boolean;
    language: string;
    timezone: string;
  }
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
  isActive?: boolean;
  storeName?: string;
  phoneNumber?: string;
  telegramUsername?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message: string;
  error?: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message: string;
  error?: string;
  token: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data as AuthResponse;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return response as LoginResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/me');
      return response.data!;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  static async uploadAvatar(userId: string, file: File): Promise<{ data: {avatar: string} }> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiClient.post<{ data: {avatar: string} }>(`/users/${userId}/avatar`, formData);
      return response.data!;
    } catch (error) {
      console.error('Upload avatar error:', error);
      throw error;
    }
  }

  static async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
    try {
      const response = await apiClient.put<User>(`/users/${userId}`, userData);
      return response.data!;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
}
