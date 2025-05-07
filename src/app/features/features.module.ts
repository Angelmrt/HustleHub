import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HeroComponent } from '../core/components/hero/hero.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
