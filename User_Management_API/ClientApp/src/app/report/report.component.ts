import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { groupObject } from '../group.model';
import { GroupService } from '../group.service';
import { GroupsUsers } from '../groups-users.module';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public companies: Company[];
  public companyID: number;
  groupsUsers: GroupsUsers[];
  constructor(private groupService: GroupService, private companyService: CompanyService) {
    this.companies = [];
    this.groupsUsers = [];
  }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((res: Company[]) => {
      this.companies = res
    });
  }

  async onCodeChange($event) {
    let groupsResult = await this.companyService.GetCompanyGroupsUsers($event.target.value).toPromise();
    this.groupsUsers = groupsResult as GroupsUsers[];

    //  .then((res: any) => {
    //  this.groups = res;
    //})
  }

}
