import { apiClient } from "@/lib/api";

// Типы для магазина
export interface ShopOwner {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ShopCounts {
  products: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  telegramBotToken: string;
  adminUsername: string;
  minOrderAmount: number;
  imageUrl: string;
  owner: ShopOwner;
  _count: ShopCounts;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopData {
  name: string;
  description: string;
  telegramBotToken: string;
  adminUsername: string;
  minOrderAmount: number;
  imageUrl?: string;
}

export interface UploadImageResponse {
  success: boolean;
  imageUrl: string;

  message: string;
  error: string;
}

export interface CreateShopResponse {
  success: boolean;
  data: {
    shop: Shop;
  };
  message: string;
  error: string;
}

export class ShopService {
  // Загрузка изображения
  static async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("shopImage", file);

      const response = await apiClient.post<UploadImageResponse>(
        "/upload/shop",
        formData
      );
      console.log("imageUrl", response);
      return response?.data?.imageUrl || "";
    } catch (error) {
      console.error("Upload image error:", error);
      throw error;
    }
  }

  // Создание нового магазина
  static async createShop(shopData: CreateShopData): Promise<Shop> {
    try {
      const response = await apiClient.post<CreateShopResponse>(
        "/shops",
        shopData
      );
      return response.data!.data.shop;
    } catch (error) {
      console.error("Create shop error:", error);
      throw error;
    }
  }
  // Получение всех магазинов пользователя
  static async getUserShops(): Promise<Shop[]> {
    try {
      const response = await apiClient.get<Shop[]>("/shops");
      return response.data || [];
    } catch (error) {
      console.error("Get user shops error:", error);
      throw error;
    }
  }

  // Получение магазина по ID
  static async getShopById(shopId: string): Promise<Shop> {
    try {
      const response = await apiClient.get<{ data: Shop }>(`/shops/${shopId}`);
      return response.data!.data;
    } catch (error) {
      console.error("Get shop error:", error);
      throw error;
    }
  }

  // Обновление магазина
  static async updateShop(
    shopId: string,
    shopData: Partial<CreateShopData>
  ): Promise<Shop> {
    try {
      const response = await apiClient.put<{ data: Shop }>(
        `/shops/${shopId}`,
        shopData
      );
      return response.data!.data;
    } catch (error) {
      console.error("Update shop error:", error);
      throw error;
    }
  }

  // Удаление магазина
  static async deleteShop(shopId: string): Promise<void> {
    try {
      await apiClient.delete(`/shops/${shopId}`);
    } catch (error) {
      console.error("Delete shop error:", error);
      throw error;
    }
  }
}
