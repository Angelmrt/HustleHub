import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent implements OnInit {
  icons: string[] = [];

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  constructor(private categoriesService: CategoriesService) {}

  async ngOnInit(): Promise<void> {
    this.icons = await this.categoriesService.getCategoryIcons();
  }

  onMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.slider.nativeElement.classList.add('dragging');
    this.startX = e.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  };

  onMouseUp = (): void => {
    this.isDragging = false;
    this.slider.nativeElement.classList.remove('dragging');
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  // Touch support
  onTouchStart(e: TouchEvent): void {
    this.isDragging = true;
    this.startX = e.touches[0].pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    const x = e.touches[0].pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  onTouchEnd(): void {
    this.isDragging = false;
  }
}
