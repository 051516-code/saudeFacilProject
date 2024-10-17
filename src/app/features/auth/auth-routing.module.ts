import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO>  own imports
import { AUTH_ROUTES } from './auth-routes.constant';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : AUTH_ROUTES.LOGIN,
    pathMatch : 'full'
  },
  {
    path : AUTH_ROUTES.LOGIN,
    component: LoginComponent
  },
  {
    path : AUTH_ROUTES.REGISTER,
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
