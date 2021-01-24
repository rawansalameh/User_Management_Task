import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public email: string;
  public confirmEmail: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  ResetPassword() {
   
    if (this.confirmEmail != this.email) { alert("Please confirm your email"); }
    else {
      this.userService.ResetPassword(this.email).subscribe(
        null,
        error => { alert("Error occured while trying to reset password"); },
        () => {
          alert("Password Successfully sent to your email");
          this.router.navigate(["/"]);
        }
      );
    }
  }
}
