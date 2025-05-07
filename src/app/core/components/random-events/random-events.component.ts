import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-random-events',
  templateUrl: './random-events.component.html',
  styleUrls: ['./random-events.component.scss']
})
export class RandomEventsComponent implements OnInit {
  randomEvents: any[] = [];

  constructor(private categoriesService: CategoriesService) {}

  async ngOnInit(): Promise<void> {
    const allEventsObj = await this.categoriesService.getAllEvents();

    if (allEventsObj && typeof allEventsObj === 'object') {
      const allEvents = Object.values(allEventsObj).flatMap((category: any) =>
        category.items ? category.items : []
      );

      this.randomEvents = this.shuffleArray(allEvents).slice(0, 5);
    } else {
      console.warn('No events found');
    }
  }

  private shuffleArray(array: any[]): any[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
