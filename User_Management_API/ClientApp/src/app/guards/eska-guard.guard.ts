import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginUser } from '../LoginUser';
import { UserRole } from '../UserRole';

@Injectable({
  providedIn: 'root'
})
export class EskaGuardGuard implements CanActivate {
  userDataSubscription: any;
  userData = new LoginUser();
  constructor(private router: Router, private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userData.role === UserRole.eskaUser) {
      return true;
    }

    this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}

