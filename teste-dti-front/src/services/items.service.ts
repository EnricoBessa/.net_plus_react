import { AxiosResponse } from 'axios';
import { http } from '../utils/axios';

export class ItemService {
  static async getAllItems(): Promise<AxiosResponse<[{ id: number; name: string }]>> {
    return await http.get('/items');
  }

  static async getItemById(id: number): Promise<AxiosResponse<{ id: number; name: string }>> {
    return await http.get(`/items/${id}`);
  }

  static async createItem(name: string): Promise<AxiosResponse<{ id: number; name: string }>> {
    return await http.post('/items', { name });
  }

  static async updateItem(id: number, name: string): Promise<AxiosResponse<{ id: number; name: string }>> {
    return await http.put(`/items/${id}`, { name });
  }

  static async deleteItem(id: number): Promise<AxiosResponse> {
    return await http.delete(`/items/${id}`);
  }
}