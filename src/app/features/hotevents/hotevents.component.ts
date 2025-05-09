import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-hot-events',
  templateUrl: './hotevents.component.html',
  styleUrls: ['./hotevents.component.scss']
})
export class HotEventsComponent implements OnInit {
  topEvents: any[] = [];
  pagedEvents: any[] = [];

  title: string = "Hot Events";
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getTopSubscribedEvents(10).then(events => { // ✅ Solo 10 eventos
      this.topEvents = events;
      this.totalPages = Math.ceil(this.topEvents.length / this.itemsPerPage); // ✅ Máximo 2 páginas
      this.updatePagedEvents();
    });
  }

  updatePagedEvents(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedEvents = this.topEvents.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedEvents();
    }
  }
}
