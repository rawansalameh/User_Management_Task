import { Component, OnInit } from '@angular/core';
import { group } from 'console';
import { User } from '../user.model';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Group, groupObject } from '../group.model';
import { UserGroups } from '../user-groups.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  isAdmin: number;
  systemUser: number;
  adminCompanyID: number;

  public companies: Company[];
  public groups: groupObject[];
  public groupIDs: number[];
  public companyName: string;

  public user: User;
  public userGroups: UserGroups;
  public Name: string;
  public Username: string;
  public Email: string;
  public Password: string;
  public UsertType: number;
  public PhoneNumber: string;
  public Birthdate: Date;
  public companyID: number;
  public PasswordCreationDate: Date;
  public PasswordExpiryDate: Date;



  constructor(private companyService: CompanyService, private userService: UserService) {
    this.companies = [];
    this.groups = [];
    this.groupIDs = [];
    this.userGroups = new UserGroups;
    this.user = new User;
 
  }

  ngOnInit() {
   
    this.isAdmin = Number(localStorage.getItem("IsAdmin"));
    this.systemUser = Number(localStorage.getItem("SystemUser"));
    this.adminCompanyID = Number(localStorage.getItem("companyId"));


    this.companyService.getAllCompanies().subscribe((res: Company[]) => {
      this.companies = res
      if (this.systemUser == 1) {
        for (let company of res) {
          if (company.company.companyId == this.adminCompanyID) {
            this.companyName = company.company.name;
        }
      }
      }
    });

    if (this.systemUser == 1) {

        this.companyService.GetCompanyGroups(this.adminCompanyID).subscribe((res: groupObject[]) => {
          this.groups = res
        });

     
    }
  }

  async onCodeChange($event) {
    let groupsResult =  await this.companyService.GetCompanyGroups($event.target.value).toPromise();
    this.groups = groupsResult as groupObject[];
    //  .then((res: any) => {
    //  this.groups = res;
    //})
  }

  CreateUser() {
    this.userGroups.GroupIDs = this.groupIDs;
    this.user.name = this.Name;
    this.userGroups.user = this.user;
    this.userGroups.user.name = this.Name;
    this.userGroups.user.userName = this.Username;
    this.userGroups.user.email = this.Email;
    this.userGroups.user.password = this.Password;

    if (this.UsertType == 2) {
      this.userGroups.user.isAdmin = 1;
      this.userGroups.user.systemUser = 1;
    }
   
    else if (this.UsertType == 1) {
      this.userGroups.user.isAdmin = 0;
      this.userGroups.user.systemUser = 1;
    }

    this.userGroups.user.userStatus = 1;

    this.userGroups.user.phoneNumber = this.PhoneNumber;
    this.userGroups.user.birthdate = this.Birthdate;
    if (this.systemUser == 1) { this.userGroups.user.companyId = this.adminCompanyID; }
    else { this.userGroups.user.companyId = this.companyID; }
    this.userGroups.user.passwordCreationDate = new Date(Date.now());
    this.userGroups.user.passwordExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + 2));

    this.userService.createUser(this.userGroups).subscribe(
      null,
      error => { alert("Error occured while trying to create user"); },
      () => {
        alert("Successfully created");
        location.reload();
      });
  }
}

