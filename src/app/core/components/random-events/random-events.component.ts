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
    // Ya devuelve un array con la categoría inyectada en cada evento
    const allEvents = await this.categoriesService.getAllEvents();

    if (allEvents && Array.isArray(allEvents) && allEvents.length > 0) {
      this.randomEvents = this.shuffleArray(allEvents).slice(0, 5);
    } else {
      console.warn('No se encontraron eventos.');
    }
  }

  private shuffleArray(array: any[]): any[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
