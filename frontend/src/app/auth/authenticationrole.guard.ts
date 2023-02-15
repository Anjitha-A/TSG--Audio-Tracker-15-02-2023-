import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationroleGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate():  boolean  {
    if(JSON.parse(sessionStorage.getItem("credentials")|| "").usertype===1){
      return true;
    }
    this.router.navigate([''])
    return false;
   
  }
  
}




