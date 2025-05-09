import { Component, OnInit } from '@angular/core';
import { IdleService } from './core/services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'HustleHub';

  constructor( private IdleService: IdleService){

  }

  

  

}
;