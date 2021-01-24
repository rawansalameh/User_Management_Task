import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  constructor(private service: CompanyService, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
  }

  DeleteCompany(id) {
    this.service.deleteCompany(id).subscribe(
      null,
      error => { alert("Company with groups and employees cannot be deleted!"); },
      () =>
      {
        alert("Successfully deleted");
        location.reload();
      });
  }
}
