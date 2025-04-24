import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user$ = this.authService.currentUser$;

  constructor(private authService: AuthService, public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}

