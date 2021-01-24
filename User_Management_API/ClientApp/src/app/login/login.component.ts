import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
                    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  //to return the form controls of the login form
  get loginFormControl() { return this.loginForm.controls; }    

  onSubmit() {
    
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    //invoking the login method of the AuthService class
    this.authService.login(this.loginForm.value)
      .subscribe(
        (res) => {
          console.log(new Date(Date.now()));


          if (res.userDetails.userStatus == 0) {
            this.loading = false;
            this.loginForm.reset();
            this.loginForm.setErrors({
              ActiveLogin: true
            });
          }
          else if (new Date(res.userDetails.passwordExpiryDate) < new Date(Date.now())) {
            this.loading = false;
            this.loginForm.reset();
            this.loginForm.setErrors({
              ExpierdLogin: true
            });
          }

          //success : redirect the user to home page or the returnURL
          else {
            this.router.navigate(["mainMenu/Profile"]);

            localStorage.setItem("UserID", res.userDetails.userId);
            localStorage.setItem("Username", res.userDetails.username);
            localStorage.setItem("Name", res.userDetails.name);
            localStorage.setItem("Email", res.userDetails.email);
            localStorage.setItem("PhoneNumber", res.userDetails.phoneNumber);
            localStorage.setItem("Birthdate", res.userDetails.birthdate);
            localStorage.setItem("IsAdmin", res.userDetails.isAdmin);
            localStorage.setItem("SystemUser", res.userDetails.systemUser);
          
              localStorage.setItem("companyId", res.userDetails.companyId);
            localStorage.setItem("Groups", JSON.stringify(res.crsUsersGroups));
          }
        },
        (error) => {
          //fail : reset the form and also set the form error
          this.loading = false;
          this.loginForm.reset();
          this.loginForm.setErrors({
            invalidLogin: true
          });
        });     
    //this.router.navigate(['/mainMenu']);
  }
}


