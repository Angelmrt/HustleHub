import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HeroComponent } from '../core/components/hero/hero.component';
import { CategorySliderComponent } from '../core/components/category-slider/category-slider.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    CategorySliderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
