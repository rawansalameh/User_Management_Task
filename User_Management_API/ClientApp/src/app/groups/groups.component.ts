import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GroupInfoComponent } from '../group-info/group-info.component';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';
import { Group, groupObject } from '../group.model';
import { GroupService } from '../group.service';
import { companyObject } from '../company.model';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, AfterViewInit {
  groups: Group[];
  companies: companyObject[];
  groupID: number;
  displayedColumns: string[] = ['Name', 'Company', 'Employees', 'Edit', 'Delete'];
  dataSource: MatTableDataSource<Group>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(public dialog: MatDialog, private service: GroupService)
  {
    this.groups = [];
    this.companies = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.service.getAllGroups().subscribe((res: Group[]) => {
      this.groups = res;
      this.dataSource.data = this.groups;
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditDialog(groupID: number) {

    this.groupID = groupID;
    let group: groupObject = this.groups.find(group => group.group.groupId == groupID).group;
    const dialogRef = this.dialog.open(GroupInfoComponent, { data: group });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCreateDialog(/*companies: companyObject[]*/) {
    //this.companies = companies
    const dialogRef = this.dialog.open(CreateGroupComponent/*, { data: companies }*/);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDeleteDialog(groupID: number) {
    this.groupID = groupID;
    const dialogRef = this.dialog.open(DeleteGroupComponent, { data: groupID });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}




