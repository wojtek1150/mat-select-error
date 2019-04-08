import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormPageComponent } from './pages/form-page/form-page.component';


const routes: Routes = [
  {
    path: 'form',
    component: FormPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
