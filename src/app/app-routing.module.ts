import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { APP_ROUTES } from './app-routes.constant';
import { SplashComponent } from './shared/components/splash/splash.component';

const routes: Routes = [
  {
    path : '',
   component: SplashComponent
  },
  {
    path : APP_ROUTES.AUTH,
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule)
  },
  
  {
    path: '**',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
