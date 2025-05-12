import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ref, get } from 'firebase/database';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  isFavorite = false;

  event: any = null;
  eventId: string | null = null;
  isLoading = true;
  isError = false;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (category && this.eventId) {
      this.getEventDetails(category, this.eventId);
    } else {
      this.isError = true;
      this.isLoading = false;
    }
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  private getEventDetails(category: string, id: string): void {
    const db = this.firebaseService.getDatabaseInstance();
    const eventRef = ref(db, `events/${category}/items`);

    get(eventRef)
      .then(snapshot => {
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
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
