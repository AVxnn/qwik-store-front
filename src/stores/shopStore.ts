import { proxy } from 'valtio';
import { ShopService, Shop, CreateShopData } from '@/services/shopService';

// Состояние магазинов
interface ShopState {
  shops: Shop[];
  currentShop: Shop | null;
  isLoading: boolean;
  error: string | null;
}

// Действия с магазинами
interface ShopActions {
  // Загрузка магазинов пользователя
  loadUserShops: () => Promise<void>;
  
  // Создание нового магазина
  createShop: (shopData: CreateShopData) => Promise<Shop>;
  
  // Установка текущего магазина
  setCurrentShop: (shop: Shop | null) => void;
  
  // Получение магазина по ID
  getShopById: (shopId: string) => Promise<Shop>;
  
  // Обновление магазина
  updateShop: (shopId: string, shopData: Partial<CreateShopData>) => Promise<Shop>;
  
  // Удаление магазина
  deleteShop: (shopId: string) => Promise<void>;
  
  // Очистка ошибок
  clearError: () => void;
}

// Создаем store
export const shopStore = proxy<ShopState>({
  shops: [],
  currentShop: null,
  isLoading: false,
  error: null,
});

// Создаем действия
export const shopActions: ShopActions = {
  // Загрузка магазинов пользователя
  async loadUserShops() {
    try {
      shopStore.isLoading = true;
      shopStore.error = null;
      
      const shops = await ShopService.getUserShops();
      shopStore.shops = shops;
      
      // Если есть магазины и нет текущего, устанавливаем первый
      if (shops.length > 0 && !shopStore.currentShop) {
        shopStore.currentShop = shops[0];
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при загрузке магазинов';
      shopStore.error = errorMessage;
      throw error;
    } finally {
      shopStore.isLoading = false;
    }
  },

  // Создание нового магазина
  async createShop(shopData: CreateShopData) {
    try {
      shopStore.isLoading = true;
      shopStore.error = null;
      
      const newShop = await ShopService.createShop(shopData);
      
      // Добавляем новый магазин в список
      shopStore.shops.push(newShop);
      
      // Если это первый магазин, устанавливаем его как текущий
      if (shopStore.shops.length === 1) {
        shopStore.currentShop = newShop;
      }
      
      return newShop;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при создании магазина';
      shopStore.error = errorMessage;
      throw error;
    } finally {
      shopStore.isLoading = false;
    }
  },

  // Установка текущего магазина
  setCurrentShop(shop: Shop | null) {
    shopStore.currentShop = shop;
  },

  // Получение магазина по ID
  async getShopById(shopId: string) {
    try {
      shopStore.isLoading = true;
      shopStore.error = null;
      
      const shop = await ShopService.getShopById(shopId);
      
      // Обновляем магазин в списке, если он там есть
      const index = shopStore.shops.findIndex(s => s.id === shopId);
      if (index !== -1) {
        shopStore.shops[index] = shop;
      }
      
      return shop;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при получении магазина';
      shopStore.error = errorMessage;
      throw error;
    } finally {
      shopStore.isLoading = false;
    }
  },

  // Обновление магазина
  async updateShop(shopId: string, shopData: Partial<CreateShopData>) {
    try {
      shopStore.isLoading = true;
      shopStore.error = null;
      
      const updatedShop = await ShopService.updateShop(shopId, shopData);
      
      // Обновляем магазин в списке
      const index = shopStore.shops.findIndex(s => s.id === shopId);
      if (index !== -1) {
        shopStore.shops[index] = updatedShop;
      }
      
      // Если это текущий магазин, обновляем его
      if (shopStore.currentShop?.id === shopId) {
        shopStore.currentShop = updatedShop;
      }
      
      return updatedShop;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при обновлении магазина';
      shopStore.error = errorMessage;
      throw error;
    } finally {
      shopStore.isLoading = false;
    }
  },

  // Удаление магазина
  async deleteShop(shopId: string) {
    try {
      shopStore.isLoading = true;
      shopStore.error = null;
      
      await ShopService.deleteShop(shopId);
      
      // Удаляем магазин из списка
      shopStore.shops = shopStore.shops.filter(s => s.id !== shopId);
      
      // Если удаляемый магазин был текущим, устанавливаем первый из списка
      if (shopStore.currentShop?.id === shopId) {
        shopStore.currentShop = shopStore.shops.length > 0 ? shopStore.shops[0] : null;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при удалении магазина';
      shopStore.error = errorMessage;
      throw error;
    } finally {
      shopStore.isLoading = false;
    }
  },

  // Очистка ошибок
  clearError() {
    shopStore.error = null;
  },
};
