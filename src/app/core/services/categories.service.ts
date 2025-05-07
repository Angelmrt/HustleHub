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
    // añade más según tu JSON
  };

  constructor(private db: Database) {}

  // 🟢 Método principal: obtener nombres (claves de "events")
  async getCategoryKeys(): Promise<string[]> {
    const snapshot = await get(child(ref(this.db), 'events'));
    return snapshot.exists() ? Object.keys(snapshot.val()) : [];
  }

  // 🟡 Método derivado: solo iconos, basados en las claves
  async getCategoryIcons(): Promise<string[]> {
    const keys = await this.getCategoryKeys();
    return keys.map((key) => this.iconMap[key.toLowerCase()] || 'fas fa-tag');
  }
}
