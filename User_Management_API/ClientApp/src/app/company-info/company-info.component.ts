import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'protractor';
import { Company, companyObject } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  constructor(private service: CompanyService, @Inject(MAT_DIALOG_DATA) public data: companyObject) { }

  ngOnInit() {
  }

  EditCompany(company: companyObject) {
    //TODO: Call the edit service
    this.service.editCompany(company).subscribe(
      null,
      error => { alert("Error occured while trying to change company name"); },
      () => {
        alert("successfully edited"); 
      }
    );

  }
}


