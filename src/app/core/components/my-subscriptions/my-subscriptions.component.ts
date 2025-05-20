import { Component, Input, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent implements OnInit {
  @Input() userId!: string;

  eventsByCategory: Record<string, any[]> = {};
  isLoading = true;
  isError = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private db: Database,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.userId) {
      this.isError = true;
      this.isLoading = false;
      return;
    }

    try {
      const subscriptions = await this.subscriptionService.getUserSubscriptions(this.userId);

      for (const category of Object.keys(subscriptions)) {
        const eventIds = subscriptions[category];
        const categoryEvents: any[] = [];

        const itemsSnap = await get(ref(this.db, `events/${category}/items`));

        if (itemsSnap.exists()) {
          const items = Object.values(itemsSnap.val());

          for (const eventId of eventIds) {
            const match = items.find((event: any) => event.id === eventId);
            if (match) {
              categoryEvents.push({ ...match, category });
            }
          }
        }

        if (categoryEvents.length > 0) {
          this.eventsByCategory[category] = categoryEvents;
        }
      }

    } catch (error) {
      console.error('Error cargando suscripciones:', error);
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  navigateToEvent(category: string, id: string): void {
    this.activeModal.close();
    this.router.navigate(['/event', category, id]);
  }
}
