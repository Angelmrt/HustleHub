import { Component, Input } from '@angular/core';
import { NgbOffcanvasRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CreateEventComponent } from '../create-event/create-event.component';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  @Input() offcanvasRef!: NgbOffcanvasRef;

  user$ = this.authService.currentUser$;
  
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    
  ) {}

  logout() {
    this.authService.logout();
    this.offcanvasRef.close();
  }

  openProfile() {
    this.modalService.open(UserProfileComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
      keyboard: true
    });
  }
  openChangePassword() {
    this.modalService.open(ChangePasswordComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
      keyboard: true
    });
  }
  openCreateEventModal(): void {
    this.modalService.open(CreateEventComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }
}
