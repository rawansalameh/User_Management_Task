import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginUser } from '../LoginUser';
import { UserRole } from '../UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
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
    if (this.userData.role === UserRole.eskaUser || this.userData.role === UserRole.adminUser || this.userData.role === UserRole.normalUser) {
      return true;
    }

    this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}

