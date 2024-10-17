import { APP_ROUTES } from 'src/app/app-routes.constant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AUTH_ROUTES } from './../../../features/auth/auth-routes.constant';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent  implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() : void {

  }

  goToLogin(){

    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`])
  }


  goToRegister(){
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`])
  }



}
