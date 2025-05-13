import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HeroComponent } from '../core/components/hero/hero.component';
import { CategorySliderComponent } from '../core/components/category-slider/category-slider.component';
import { RandomEventsComponent } from '../core/components/random-events/random-events.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CatheroComponent } from '../core/components/cathero/cathero.component';
import { RouterModule } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { HotEventsComponent } from './hotevents/hotevents.component';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    CatheroComponent,
    CategorySliderComponent,
    RandomEventsComponent,
    CategoryDetailComponent,
    EventDetailComponent,
    HotEventsComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule

  ]
})
export class FeaturesModule { }
