import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { MaterialModule } from 'main/core/material.module';
import { SharedModule } from 'main/core/shared.module';

@NgModule({
  declarations: [
    FormPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule {}
