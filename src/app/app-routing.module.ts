import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AboutComponent } from './features/about/about.component';
import { CategoryDetailComponent } from './features/category-detail/category-detail.component';
import { EventDetailComponent } from './features/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'categories/:categoryId', component: CategoryDetailComponent },
  { path: 'event/:category/:id', component: EventDetailComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
