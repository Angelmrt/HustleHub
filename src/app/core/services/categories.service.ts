import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private iconMap: Record<string, string> = {
    cine: 'fas fa-film',
    viajes: 'fas fa-plane',
    educacion: 'fas fa-graduation-cap',
    videojuegos: 'fas fa-gamepad',
    musica: 'fas fa-music',
    deportes: 'fas fa-futbol',
    arte: 'fas fa-palette',
    comida: 'fas fa-utensils'
    
  };

  constructor(private db: Database) {}

  async getCategoryKeys(): Promise<string[]> {
    const snapshot = await get(child(ref(this.db), 'events'));
    return snapshot.exists() ? Object.keys(snapshot.val()) : [];
  }

  async getCategoryIcons(): Promise<string[]> {
    const keys = await this.getCategoryKeys();
    return keys.map((key) => this.iconMap[key.toLowerCase()] || 'fas fa-tag');
  }
  async getAllEvents(): Promise<any> {
    const snapshot = await get(child(ref(this.db), 'events'));
    return snapshot.exists() ? snapshot.val() : {};
  }
  async getEventsByCategory(categoryId: string): Promise<any[]> {
    const snapshot = await get(child(ref(this.db), `events/${categoryId}/items`));
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }
}
