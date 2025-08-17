import { useSnapshot } from 'valtio';
import { shopStore, shopActions } from '@/stores/shopStore';

export const useShopStore = () => {
  const snapshot = useSnapshot(shopStore);

  return {
    // Состояние
    shops: snapshot.shops,
    currentShop: snapshot.currentShop,
    isLoading: snapshot.isLoading,
    error: snapshot.error,

    // Действия
    ...shopActions,
  };
};
