import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'main/core/material.module';
import { SharedModule } from 'main/core/shared.module';

import { HomePageComponent } from './pages/home-page/home-page.component';

const components = [
  HomePageComponent,
];

const modules = [
  CommonModule,
  MaterialModule,
  SharedModule
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class MainHomeModule {}
