import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordData } from './password-data.module';
import { UserGroups } from './user-groups.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllUsersUrl: string = "https://localhost:44363/api/User/GetAllUsers";

  editUserUrl: string = "https://localhost:44363/api/User/EditUser";

  createUserUrl: string = "https://localhost:44363/api/User/CreateUser";

  findUserUrl: string = "https://localhost:44363/api/User/FindUserByUserName?username=";

  findUserByIDUrl: string = "https://localhost:44363/api/User/FindUser?userID=";

  finduserGroups: string = "https://localhost:44363/api/User/GetUserGroups?userID=";

  changePasswordUrl: string = "https://localhost:44363/api/User/ChangePassword";

  resetPasswordUrl: string = "https://localhost:44363/api/User/ResetPassword?email=";

  getNormalUsersUrl: string = "https://localhost:44363/api/User/GetNormalUsers?companyID=";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.getAllUsersUrl);
  }

  createUser(userGroups: UserGroups) {
    return this.http.post(this.createUserUrl, userGroups);
  }

  editUser(userGroups: UserGroups) {
    return this.http.post(this.editUserUrl, userGroups);
  }

  FindUserByUserName(username: string) {
    return this.http.get(this.findUserUrl + "" +username);
  }

  FindUserByID(userID: number) {
    return this.http.get(this.findUserByIDUrl + "" + userID);
  }

  FindUserGroups(userID: number) {
    return this.http.get(this.finduserGroups + "" + userID);
  }

  ChangePassword(passwordData: PasswordData) {
    return this.http.post(this.changePasswordUrl, passwordData);
  }

  ResetPassword(email: string) {
    return this.http.get(this.resetPasswordUrl+""+ email);
  }

  getNormalUsers(companyID: number) {
    return this.http.get(this.getNormalUsersUrl + "" + companyID);

  }
}
