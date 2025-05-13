import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timer: any;
  private readonly timeout = 2 * 60 * 1000; 
  private auth = inject(Auth); 

  constructor(private router: Router, private zone: NgZone) {
    this.resetTimer();
    this.initListeners();
  }

  private initListeners(): void {
    ['click', 'keypress', 'scroll'].forEach(event => {
      this.router.navigate(['/']);
      document.addEventListener(event, () => this.resetTimer());
    });
  }

  private resetTimer(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.logout(), this.timeout);
  }

  private async logout(): Promise<void> {
    this.zone.run(async () => {
      try {
        await signOut(this.auth);
        this.router.navigate(['/inactividad']);
        console.log('Sesión cerrada por inactividad.');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
