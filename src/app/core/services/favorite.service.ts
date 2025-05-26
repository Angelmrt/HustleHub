import { Injectable } from '@angular/core';
import { Database, ref, set, remove, get } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(private db: Database) {}

  async addToFavorites(userId: string, eventId: string, category: string): Promise<void> {
    const favRef = ref(this.db, `favorites/${userId}/${category}/${eventId}`);
    return set(favRef, true);
  }

  async removeFromFavorites(userId: string, eventId: string, category: string): Promise<void> {
    const favRef = ref(this.db, `favorites/${userId}/${category}/${eventId}`);
    return remove(favRef);
  }

  async getUserFavorites(userId: string): Promise<Record<string, string[]>> {
    const favRef = ref(this.db, `favorites/${userId}`);
    const snapshot = await get(favRef);
    const result: Record<string, string[]> = {};

    if (!snapshot.exists()) return result;

    const rawData = snapshot.val();
    for (const category of Object.keys(rawData)) {
      result[category] = Object.keys(rawData[category]);
    }

    return result;
  }

  async removeFavorite(userId: string, eventId: string, category: string): Promise<void> {
    return this.removeFromFavorites(userId, eventId, category);
  }
}
