import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AboutComponent } from './features/about/about.component';
import { CategoryDetailComponent } from './features/category-detail/category-detail.component';
import { EventDetailComponent } from './features/event-detail/event-detail.component';
import { InactividadComponent } from './shared/inactividad/inactividad.component';
import { HotEventsComponent } from './features/hotevents/hotevents.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'hot', component: HotEventsComponent },
  { path: 'inactividad' , component : InactividadComponent},
  { 
    path: 'categories/:categoryId', 
    component: CategoryDetailComponent,
    children: [
      { 
        path: ':eventId', 
        component: EventDetailComponent 
      }
    ]
  },
    { path: 'event/:category/:id', component: EventDetailComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
