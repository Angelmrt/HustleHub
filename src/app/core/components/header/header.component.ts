import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service'; 
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { CategoriesService } from '../../services/categories.service'; // ✅ sin Category

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('modalHost') modalHost!: GenericModalComponent;
  categories: string[] = []; // ✅ usamos string[]

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    private offcanvasService: NgbOffcanvas,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoriesService.getCategoryKeys(); // ✅ usamos getCategoryKeys
  }

  openmodal(): void {
    this.modalService.open(LoginComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
      keyboard: true,
      windowClass: 'no-border-modal'
    });
  }

  openUserPanel(): void {
    const ref: NgbOffcanvasRef = this.offcanvasService.open(UserPanelComponent, {
      position: 'end'
    });
    ref.componentInstance.offcanvasRef = ref;
  }
}
