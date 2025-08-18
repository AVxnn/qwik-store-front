import { proxy, subscribe } from 'valtio';
import { AuthService, User, RegisterData } from '@/services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Создаем прокси-объект для состояния
export const authStore = proxy<AuthState>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
});

// Вычисляемое свойство для проверки аутентификации
authStore.isAuthenticated = !!authStore.user;

// Действия для работы с аутентификацией
export const authActions = {
  // Регистрация пользователя
  async register(data: RegisterData) {
    try {
      authStore.isLoading = true;
      authStore.error = null;
      
      const response = await AuthService.register(data);
      
      // @ts-expect-error - token is needed from response
      localStorage.setItem('authToken', response?.token as string);
      
      const user = await AuthService.getCurrentUser();
      authStore.user = user;
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при регистрации';
      authStore.error = errorMessage;
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  },

  // Вход пользователя
  async login(email: string, password: string) {
    try {
      authStore.isLoading = true;
      authStore.error = null;
      
      const response = await AuthService.login(email, password);
      
      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', response?.data?.token as string);
      
      // Получаем данные пользователя после успешного логина
      const user = await AuthService.getCurrentUser();
      authStore.user = user;
      authStore.isAuthenticated = true;
      
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при входе';
      authStore.error = errorMessage;
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  },

  // Выход пользователя
  async logout() {
    try {
      await AuthService.logout();
      authStore.isAuthenticated = false;
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authStore.user = null;
      authStore.error = null;
      localStorage.removeItem('authToken');
    }
  },

  // Очистка пользователя (без запроса к серверу)
  clearUser() {
    authStore.user = null;
    authStore.error = null;
    localStorage.removeItem('authToken');
  },

  // Установка ошибки
  setError(error: string | null) {
    authStore.error = error;
  },

  // Очистка ошибки
  clearError() {
    authStore.error = null;
  },

  // Проверка токена при загрузке приложения
  async checkAuth() {
    const token = localStorage.getItem('authToken');
    console.log('token', token)
    if (token) {
      try {
        authStore.isLoading = true;
        console.log("work")
        const user = await AuthService.getCurrentUser();
        console.log('work', user)
        authStore.user = user;
        authStore.isAuthenticated = true;
      } catch (error) {
        console.log("no work")
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        authStore.user = null;
      } finally {
        authStore.isLoading = false;
      }
    } else {
      console.log('no token')
      authStore.isLoading = false;
    }
  },

  // Обновление данных пользователя (локальное)
  updateUser(userData: Partial<User>) {
    if (authStore.user) {
      authStore.user = { ...authStore.user, ...userData };
    }
  },

  // Обновление профиля на сервере
  async updateProfile(userData: Partial<User>) {
    try {
      if (!authStore.user?.id) {
        throw new Error('User ID not found');
      }

      const updatedUser = await AuthService.updateUser(authStore.user.id, userData);
      authStore.user = updatedUser;
      
      return updatedUser;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при обновлении профиля';
      authStore.error = errorMessage;
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  },

  // Загрузка аватара
  async uploadAvatar(file: File) {
    try {
      const response = await AuthService.uploadAvatar(authStore?.user?.id as string, file);
      
      if (authStore.user) {
        // @ts-expect-error - user is needed from response
        authStore.user = { ...authStore.user, avatarUrl: response?.user?.avatarUrl };
      }
      
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при загрузке аватара';
      authStore.error = errorMessage;
      throw error;
    } finally {
      authStore.isLoading = false;
    }
  },
};

// Подписываемся на изменения состояния для сохранения в localStorage
subscribe(authStore, () => {
  // Можно добавить дополнительную логику при изменении состояния
  console.log('Auth state changed:', authStore);
});

// Инициализация при загрузке модуля
if (typeof window !== 'undefined') {
  authActions.checkAuth();
}
