import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  email = '';
  password = '';
  error = '';

constructor(private authService: AuthService) {}
 onLogin() {
  this.authService.login(this.email, this.password)
    .catch(err => this.error = err.message);
}

onLoginGoogle() {
  this.authService.loginWithGoogle()
    .catch(err => this.error = err.message);
}
onRegister() {
  this.authService.register(this.email, this.password)
    .then(() => this.error = '')
    .catch(err => this.error = err.message);
}
}
