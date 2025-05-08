import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HeroComponent } from '../core/components/hero/hero.component';
import { CategorySliderComponent } from '../core/components/category-slider/category-slider.component';
import { RandomEventsComponent } from '../core/components/random-events/random-events.component';
import { AboutComponent } from './about/about.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CatheroComponent } from '../core/components/cathero/cathero.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    CatheroComponent,
    CategorySliderComponent,
    RandomEventsComponent,
    AboutComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
