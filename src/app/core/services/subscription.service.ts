import { Injectable } from '@angular/core';
import { Database, ref, set, remove, get } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  constructor(private db: Database) {}

  async subscribeToEvent(userId: string, eventId: string, category: string): Promise<void> {
    const subRef = ref(this.db, `subscriptions/${userId}/${category}/${eventId}`);
    return set(subRef, true);
  }

  async unsubscribeFromEvent(userId: string, eventId: string, category: string): Promise<void> {
    const subRef = ref(this.db, `subscriptions/${userId}/${category}/${eventId}`);
    return remove(subRef);
  }

  async getUserSubscriptions(userId: string): Promise<Record<string, string[]>> {
    const snapshot = await get(ref(this.db, `subscriptions/${userId}`));
    const result: Record<string, string[]> = {};
    if (!snapshot.exists()) return result;

    const rawData = snapshot.val();
    for (const category of Object.keys(rawData)) {
      result[category] = Object.keys(rawData[category] || {});
    }

    return result;
  }
}
