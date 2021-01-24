import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordData } from '../password-data.module';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public passwordData: PasswordData;
  public username  : string;
  public oldPassword  : string;
  public newPassword: string;

  constructor(private userServices: UserService, private router: Router) {
    this.passwordData = new PasswordData();
  }

  ngOnInit() {
  }

  ChangePassword() {
    this.passwordData.username = this.username;
    this.passwordData.oldPassword = this.oldPassword;
    this.passwordData.newPassword = this.newPassword;

    this.userServices.ChangePassword(this.passwordData).subscribe(
      null,
      error => { alert("Error occured while trying to change password"); },
      () => {
        alert("Password Changed Successfully");
        this.router.navigate(["/"]);
      });
  }
}
