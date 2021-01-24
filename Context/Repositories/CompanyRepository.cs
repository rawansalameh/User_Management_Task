using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Context
{
    public class CompanyRepository : ICompanyRepository
    {
        user_managementContext db;
        public CompanyRepository(user_managementContext db) {
            this.db = db;
        }
        public void CreateCompany(CrgCompanies company)
        {
            db.Add(company);
            db.SaveChanges();
        }

        public void DeleteCompany(int companyID)
        {
            CrgCompanies company = db.CrgCompanies.Where(x => x.CompanyId == companyID).FirstOrDefault();
            db.Remove(company);
            db.SaveChanges();
        }

        public void EditCompanyName(CrgCompanies Company)
        {
            db.Update(Company);
            db.SaveChanges();
        }

        public List<CompanyGroupsCountViewModel> GetAllCompanies()
        {
            List<CompanyGroupsCountViewModel> companyGroupsCountViewModel = new List<CompanyGroupsCountViewModel>(); 
            List<CrgCompanies> companies = db.CrgCompanies.ToList();
            foreach (CrgCompanies company in companies)
            {
                companyGroupsCountViewModel.Add(new CompanyGroupsCountViewModel
                {
                    company = company,
                    groupsCount = db.CrsGroups.Where(x => x.CompanyId == company.CompanyId).Count(),
                    usersCount = db.CrsUsers.Where(x => x.CompanyId == company.CompanyId).Count()
                }) ;
            }
            return companyGroupsCountViewModel;
        }
    }
}
