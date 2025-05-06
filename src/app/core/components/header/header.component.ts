import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef,NgbOffcanvas,NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service'; 
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { Database, ref, get, child } from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('modalHost') modalHost!: GenericModalComponent;
  categories: string[] = [];


  constructor(
    private modalService: NgbModal,
    public authService: AuthService ,
    private offcanvasService: NgbOffcanvas,
    private db: Database
  ) {}
 

  ngOnInit(): void {
    const dbRef = ref(this.db);
  get(child(dbRef, 'events')).then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      this.categories = Object.keys(data); // <- EXTRAEMOS LAS CLAVES
    } else {
      console.log('No categories found');
    }
  }).catch(error => {
    console.error('Firebase error:', error);
  });
  }
  openmodal() {
    this.modalService.open(LoginComponent, {
      centered: true, 
      size: 'md',     // 'sm' | 'md' | 'lg' | 'xl'
      backdrop: true, 
      keyboard: true,
      windowClass:'no-border-modal'
    });
  }
  openUserPanel() {
    const ref: NgbOffcanvasRef = this.offcanvasService.open(UserPanelComponent, {
      position: 'end'
    });
    ref.componentInstance.offcanvasRef = ref;
  }

}
