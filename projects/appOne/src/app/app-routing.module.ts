import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'main/core/guards/auth.guard';
import { LoginPageComponent } from 'main/pages/login-page/login-page.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: '',
    pathMatch: 'full'
  },
  {
    canActivate: [AuthGuard],
    loadChildren: './modules/home/home.module#HomeModule',
    path: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
