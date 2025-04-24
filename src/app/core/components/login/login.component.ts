import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal
  ) { }
  onLogin() {
    this.authService.login(this.email, this.password)
      .then(() => this.activeModal.close()) 
      .catch(err => this.error = err.message);
  }

  onRegister() {
    this.authService.register(this.email, this.password)
      .then(() => this.activeModal.close()) 
      .catch(err => this.error = err.message);
  }

  onLoginGoogle() {
    this.authService.loginWithGoogle()
      .then(() => this.activeModal.close())
      .catch(err => this.error = err.message);
  }
}
