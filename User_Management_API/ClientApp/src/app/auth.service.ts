import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from './LoginUser';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject<LoginUser>(new LoginUser());

  constructor(private http: HttpClient, private router: Router) {
  }

  //to invoke the Login API method to validate the user details
  login(userDetails) {
    return this.http.post<any>('/api/Login', userDetails)
      .pipe(map(response => {  // If we get an OK response from the API, we will store the JWT in the local storage
        localStorage.setItem('authToken', response.token);
        this.setUserDetails();
        return response;  
      }));
  }

  //to extract the payload data from JWT and store it in a BehaviorSubject object called userData
  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new LoginUser();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));

      userDetails.userName = decodeUserDetails.sub;
      userDetails.name = decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;

      this.userData.next(userDetails);
    }
  }

  //to clear the local storage and navigate the user back to the login page
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
    this.userData.next(new LoginUser());
  }

}
