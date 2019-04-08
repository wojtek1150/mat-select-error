import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainHomeModule } from 'main/modules/home/home.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { effects } from '../../store/effects';
import { reducers } from '../../store/reducers';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    MainHomeModule,
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class HomeModule {}
