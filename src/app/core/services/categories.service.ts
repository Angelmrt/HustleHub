import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';

export interface CategoryIcon {
  category: string;
  icon: string;
}

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

  async getCategoryIcons(): Promise<CategoryIcon[]> {
    const keys = await this.getCategoryKeys();
    return keys.map((key) => ({
      category: key,
      icon: this.iconMap[key.toLowerCase()] || 'fas fa-tag'
    }));
  }

  async getAllEvents(): Promise<any[]> {
    const snapshot = await get(child(ref(this.db), 'events'));
    if (!snapshot.exists()) return [];

    const allEventsObj = snapshot.val();

    return Object.entries(allEventsObj).flatMap(
      ([categoryKey, category]: any) =>
        category.items
          ? Object.values(category.items).map((item: any) => ({ ...item, category: categoryKey }))
          : []
    );
  }
  
  async getEventsByCategory(categoryId: string): Promise<any[]> {
    const snapshot = await get(child(ref(this.db), `events/${categoryId}/items`));
    if (!snapshot.exists()) return [];

    return Object.values(snapshot.val()).map((item: any) => ({ ...item, category: categoryId }));
  }
  async getTopSubscribedEvents(limit: number = 10): Promise<any[]> {
    const snapshot = await get(child(ref(this.db), 'events'));
  
    if (!snapshot.exists()) return [];
  
    const eventsData = snapshot.val();
  
    const allEvents: any[] = Object.entries(eventsData).flatMap(
      ([categoryId, category]: any) => 
        category.items 
          ? Object.values(category.items).map((item: any) => ({ ...item, category: categoryId }))
          : []
    );
  
    return allEvents
      .sort((a, b) => (b.subscriptions || 0) - (a.subscriptions || 0))
      .slice(0, limit);
  }
  
}
