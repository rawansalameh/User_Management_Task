import { Component, OnInit } from '@angular/core';
import { debug } from 'console';
import { Company, companyObject } from '../company.model';
import { CompanyService } from '../company.service';
import { groupObject } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  public companies: Company[];
  constructor(private groupService: GroupService, private companyService: CompanyService) {
    
    this.companies = [];
  }

  ngOnInit() {
    
    this.companyService.getAllCompanies().subscribe((res: Company[]) => {
      this.companies = res
    });

    }

  CreateGroup(companyGroup: groupObject) {    
    this.groupService.createGroup(companyGroup).subscribe(
      null,
      error => { alert("Error occured while trying to create a group "); },
      () => {
        alert("successfully created");
        location.reload();
      }
    );

  }
}
