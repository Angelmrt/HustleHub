import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ref, get } from 'firebase/database';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { Auth } from '@angular/fire/auth';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  isFavorite = false;
  isSubscribed = false;

  event: any = null;
  eventId: string | null = null;
  category: string | null = null;

  userId: string = '';
  isLoading = true;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private subscriptionService: SubscriptionService,
    private favoriteService: FavoriteService,
    private auth: Auth
  ) {}

  async ngOnInit(): Promise<void> {
    this.category = this.route.snapshot.paramMap.get('category');
    this.eventId = this.route.snapshot.paramMap.get('id');

    const user = this.auth.currentUser;
    this.userId = user?.uid || '';

    if (this.category && this.eventId) {
      await this.getEventDetails(this.category, this.eventId);
      await this.checkSubscription();
      await this.checkFavorite();
    } else {
      this.isError = true;
      this.isLoading = false;
    }
  }

  async toggleFavorite(): Promise<void> {
    if (!this.userId || !this.eventId || !this.category) return;
  
    if (this.isFavorite) {
      await this.favoriteService.removeFromFavorites(this.userId, this.eventId, this.category);
    } else {
      await this.favoriteService.addToFavorites(this.userId, this.eventId, this.category);
    }
  
    this.isFavorite = !this.isFavorite;
  }
  
  private async checkFavorite(): Promise<void> {
    if (!this.userId || !this.eventId || !this.category) return;
  
    const favorites = await this.favoriteService.getUserFavorites(this.userId);
    this.isFavorite = favorites[this.category]?.includes(this.eventId) || false;
  }

  async toggleSubscription(): Promise<void> {
    if (!this.userId || !this.eventId || !this.category) return;

    if (this.isSubscribed) {
      await this.subscriptionService.unsubscribeFromEvent(this.userId, this.eventId, this.category);
    } else {
      await this.subscriptionService.subscribeToEvent(this.userId, this.eventId, this.category);
    }

    this.isSubscribed = !this.isSubscribed;
  }

  private async checkSubscription(): Promise<void> {
    if (!this.userId || !this.eventId || !this.category) return;

    const subscriptions = await this.subscriptionService.getUserSubscriptions(this.userId);
    this.isSubscribed = subscriptions[this.category]?.includes(this.eventId) || false;
  }

  private async getEventDetails(category: string, id: string): Promise<void> {
    const db = this.firebaseService.getDatabaseInstance();
    const eventRef = ref(db, `events/${category}/items`);

    try {
      const snapshot = await get(eventRef);
      if (snapshot.exists()) {
        const items = snapshot.val();
        const found = Object.values(items).find((event: any) => event.id === id);
        if (found) {
          this.event = found;
        } else {
          this.isError = true;
        }
      } else {
        this.isError = true;
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
