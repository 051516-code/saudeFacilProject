import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { SplashComponent } from './components/splash/splash.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    SplashComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()

  ],
  exports : [
    SplashComponent,
    LoadingComponent,
    CommonModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
