import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HeroComponent } from '../core/components/hero/hero.component';
import { CategorySliderComponent } from '../core/components/category-slider/category-slider.component';
import { RandomEventsComponent } from '../core/components/random-events/random-events.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    CategorySliderComponent,
    RandomEventsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
