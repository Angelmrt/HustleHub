import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {
  @Input() userId!: string;

  myEvents: any[] = [];
  isLoading = true;
  isError = false;

  constructor(
    private categoriesService: CategoriesService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;

    if (!user) {
      this.isLoading = false;
      this.isError = true;
      return;
    }

    this.categoriesService.getEventsByUser(user.uid)
      .then(events => {
        this.myEvents = events;
        this.isLoading = false;
      })
      .catch(err => {
        console.error('Error loading events:', err);
        this.isLoading = false;
        this.isError = true;
      });
  }
}
