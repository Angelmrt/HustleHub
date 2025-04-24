import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updatePassword } from 'firebase/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  newPassword = '';
  error = '';
  success = '';
  isGoogleUser = false;

  constructor(private afAuth: Auth, public activeModal: NgbActiveModal) {}

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    this.isGoogleUser = user?.providerData[0]?.providerId === 'google.com';
  }

  async changePassword() {
    if (!this.newPassword || this.newPassword.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      const user = await this.afAuth.currentUser;

      if (!user) {
        this.error = 'No se ha encontrado un usuario activo.';
        return;
      }

      await updatePassword(user, this.newPassword);
      this.success = 'Contraseña actualizada con éxito.';
      this.error = '';
      this.activeModal.close();
    } catch (err: any) {
      this.error = 'Error al cambiar contraseña: ' + err.message;
    }
  }

  close() {
    this.activeModal.close();
  }
}
