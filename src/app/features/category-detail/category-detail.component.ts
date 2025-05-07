import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  categoryId: string = '';
  events: any[] = [];
  pagedEvents: any[] = [];
  page: number = 1;
  itemsPerPage: number = 5;

  // Exponer Math al template
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      this.categoryId = params.get('categoryId') || '';
      this.events = await this.categoriesService.getEventsByCategory(this.categoryId);
      this.updatePagedEvents();
    });
  }

  updatePagedEvents(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.updatePagedEvents();
  }
}
