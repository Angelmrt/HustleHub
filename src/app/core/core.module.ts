import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
  
    GenericModalComponent,
        LoginComponent,
        UserPanelComponent,
        UserProfileComponent,
        ChangePasswordComponent,
        CreateEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CoreModule { }
