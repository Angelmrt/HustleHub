import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  
    GenericModalComponent,
        LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
  ]
})
export class CoreModule { }
