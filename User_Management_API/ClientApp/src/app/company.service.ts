import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { companyObject } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  getAllCompaniesUrl: string = "https://localhost:44363/api/Company/GetAllCompanies";

  deleteCompanyUrl: string = "https://localhost:44363/api/Company/DeleteCompany";

  editCompanyUrl: string = "https://localhost:44363/api/Company/EditCompanyName";

  createCompanyUrl: string = "https://localhost:44363/api/Company/CreateCompany";

  GetCompanyGroupsUrl: string = "https://localhost:44363/api/Group/GetCompanyGroups?companyID=";

  GetCompanyGroupsUsersUrl: string = "https://localhost:44363/api/Group/getCompanyGroupsUsers?companyID=";

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.getAllCompaniesUrl);
  }

  deleteCompany(companyID: number) {
    return this.http.post(this.deleteCompanyUrl , companyID);
  }

  editCompany(company: companyObject) {
    return this.http.post(this.editCompanyUrl, company);
  }

  createCompany(company: companyObject) {
    return this.http.post(this.createCompanyUrl, company);
  }

  GetCompanyGroups(companyID: number) {
    return this.http.get(this.GetCompanyGroupsUrl + "" + companyID);
  }

  GetCompanyGroupsUsers(companyID: number) {
    return this.http.get(this.GetCompanyGroupsUsersUrl + "" + companyID);
  }
}
