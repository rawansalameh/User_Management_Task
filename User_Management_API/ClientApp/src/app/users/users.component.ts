import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { UserGroups } from '../user-groups.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {
  companyID: number;
  userGroups: UserGroups[];
  userID: number;
  displayedColumns: string[] = ['Name', 'Type', 'Status', 'Edit'];
  dataSource: MatTableDataSource<UserGroups>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(public dialog: MatDialog, private service: UserService) {
    this.userGroups = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    if (Number(localStorage.getItem("SystemUser")) == 1) {
      this.companyID = Number(localStorage.getItem("companyId"));
      this.service.getNormalUsers(this.companyID).subscribe((res: UserGroups[]) => {
        this.userGroups = res;
        this.dataSource.data = this.userGroups;
      })
    }
    else {
      this.service.getAllUsers().subscribe((res: UserGroups[]) => {
        this.userGroups = res;
        this.dataSource.data = this.userGroups;
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Dialog functions
  openEditDialog(userID: number) {
    this.userID = userID;
    let userGroup = this.userGroups.find(user => user.user.userId == userID);
    const dialogRef = this.dialog.open(UserInfoComponent, { data: userGroup == undefined ? null : userGroup });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteUserComponent);

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



