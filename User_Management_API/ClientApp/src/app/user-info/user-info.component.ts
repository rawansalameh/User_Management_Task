import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company.service';
import { groupObject } from '../group.model';
import { UserGroups } from '../user-groups.model';
import { UserService } from '../user.service';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public groups: groupObject[];
  public groupIDs: number[];
  constructor(
    private service: UserService, @Inject(MAT_DIALOG_DATA) public data: UserGroups, private companyService: CompanyService) { } 
 
  ngOnInit() {
    this.companyService.GetCompanyGroups(this.data.user.companyId).subscribe((res: groupObject[]) => {
      this.groups = res
    });
  }

  EditUser(userGroup: UserGroups) {
    //TODO: Call the edit service
    userGroup.GroupIDs = this.groupIDs;
    
    this.service.editUser(userGroup).subscribe(
      null,
      error => { alert("Error occured while trying to edit user info"); },
      () => {
        alert("successfully edited");
      }
    );

  }
}
