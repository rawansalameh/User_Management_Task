import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { groupObject } from '../group.model';
import { UserGroups } from '../user-groups.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ID: number;
  Name: string;
  Email: string;
  PhoneNumber: string;
  BirthDate: string;
  CompanyName: string;
  systemUser: number;
  companyName: string;
  groups: string[];

  companyID: number;


  constructor(private companyService: CompanyService, private userService: UserService) {
    this.groups = [];

  }
  
  ngOnInit() {
  
    this.ID = Number(localStorage.getItem("UserID"));
    this.systemUser = Number(localStorage.getItem("SystemUser"));
    this.companyID = Number(localStorage.getItem("companyId"));
    this.Name = localStorage.getItem("Name");
    this.Email = localStorage.getItem("Email");
    this.PhoneNumber = localStorage.getItem("PhoneNumber");
    this.userService.FindUserGroups(this.ID).subscribe((res: string[]) => {

      this.groups = res;
    });

    this.companyService.getAllCompanies().subscribe((res: Company[]) => {
      if (this.systemUser == 1) {
        for (let company of res) {
          if (company.company.companyId == this.companyID) {
            this.companyName = company.company.name;
          }
        }
      }
    });
    //this.ID = Number(localStorage.getItem("UserID"));
    //this.userService.FindUserByID(this.ID).subscribe((res: UserGroups) => {
    
    //  this.groupIDs = res.GroupIDs;
    //});
    //console.log(this.groupIDs);
    //this.companyID = Number(localStorage.getItem("companyId"));
    //this.companyService.GetCompanyGroups(this.companyID).subscribe((res: groupObject[]) => {
    //  for (let group of res) {
    //    this.temp = group.groupId;
    //    console.log(this.temp);
    //    if (this.groupIDs.indexOf(group.groupId) != null) {
    //    this.groups.push(group);
    //    }
    //  }
    //});
   
    
  }

}


