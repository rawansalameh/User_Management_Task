import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Company, companyObject } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(private service: CompanyService, @Inject(MAT_DIALOG_DATA) public data: companyObject) { }

  ngOnInit() {
  }

  CreateCompany(name: string) {
    //TODO: Call the edit service = 
    let company: companyObject = { name: name};
    this.service.createCompany(company).subscribe(
      null,
      error => { alert("Error occured while trying to create a company "); },
      () => {
        alert("successfully created");
        location.reload();
      }
    );

  }
}
