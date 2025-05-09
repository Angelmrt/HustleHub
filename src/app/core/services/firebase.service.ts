import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private db: Database;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(this.app);
  }

  getDatabaseInstance(): Database {
    return this.db;
  }
}
