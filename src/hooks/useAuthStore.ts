import { useSnapshot } from 'valtio';
import { authStore, authActions } from '@/stores/authStore';

export const useAuthStore = () => {
  const snapshot = useSnapshot(authStore);

  return {
    // Состояние
    user: snapshot.user,
    isLoading: snapshot.isLoading,
    isAuthenticated: snapshot.isAuthenticated,
    error: snapshot.error,

    // Действия
    register: authActions.register,
    login: authActions.login,
    logout: authActions.logout,
    clearUser: authActions.clearUser,
    setError: authActions.setError,
    clearError: authActions.clearError,
    checkAuth: authActions.checkAuth,
    updateUser: authActions.updateUser,
    updateProfile: authActions.updateProfile,
    uploadAvatar: authActions.uploadAvatar,
  };
};
