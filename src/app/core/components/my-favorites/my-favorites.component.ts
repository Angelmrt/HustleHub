import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ref, get } from 'firebase/database';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favoritesByCategory: Record<string, any[]> = {};
  isLoading = true;
  isEmpty = false;
  userId: string = '';

  constructor(
    private auth: Auth,
    private favoriteService: FavoriteService,
    private firebaseService: FirebaseService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.currentUser;
    this.userId = user?.uid || '';

    if (!this.userId) return;

    const favoriteIds = await this.favoriteService.getUserFavorites(this.userId);

    if (Object.keys(favoriteIds).length === 0) {
      this.isEmpty = true;
      this.isLoading = false;
      return;
    }

    for (const category of Object.keys(favoriteIds)) {
      const ids = favoriteIds[category];
      const eventsRef = ref(this.firebaseService.getDatabaseInstance(), `events/${category}/items`);
      const snapshot = await get(eventsRef);

      if (snapshot.exists()) {
        const allItems = snapshot.val();
        const filtered = Object.values(allItems).filter((item: any) => ids.includes(item.id));
        this.favoritesByCategory[category] = filtered;
      }
    }

    this.isLoading = false;
  }

  navigateToEvent(category: string, id: string): void {
    this.activeModal.close();
    this.router.navigate(['/event', category, id]);
  }
}
