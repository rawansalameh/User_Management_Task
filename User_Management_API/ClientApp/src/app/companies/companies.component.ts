import { AfterViewInit, Component, ViewChild, OnInit  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { Company, companyObject } from '../company.model';
import { CompanyService } from '../company.service';
import { Group } from '../group.model';
import { User } from '../user.model';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, AfterViewInit {
  companies: Company[];
  companyID: number;
  displayedColumns: string[] = ['Name', 'Groups', 'Employees', 'Edit', 'Delete'];
  dataSource: MatTableDataSource<Company>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(public dialog: MatDialog, private service: CompanyService) {
    this.companies = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.service.getAllCompanies().subscribe((res: Company[]) => {
      this.companies = res;
      this.dataSource.data = this.companies;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openEditDialog(companyID: number) {
   
    this.companyID = companyID;
    let company: companyObject = this.companies.find(company => company.company.companyId == companyID).company;
    const dialogRef = this.dialog.open(CompanyInfoComponent, { data: company });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateCompanyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog(companyID: number) {
    this.companyID = companyID;
    const dialogRef = this.dialog.open(DeleteCompanyComponent, { data: companyID });

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




