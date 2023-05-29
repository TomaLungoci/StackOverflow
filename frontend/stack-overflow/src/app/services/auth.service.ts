import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor() { }

  isAuthenticated(): boolean{
    if(localStorage.getItem('isAuth') == 'true'){
      return true;
    }else{
      return false;
    }
  }
}
