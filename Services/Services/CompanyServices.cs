using Context;
using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
   public  class CompanyServices : ICompanyServices
    {
       private readonly ICompanyRepository context;
        public CompanyServices(ICompanyRepository context) {
            this.context = context;
        }
        public void CreateCompany(CrgCompanies company)
        {
            context.CreateCompany(company);
        }

        public void DeleteCompany(int CompanyID)
        {
            context.DeleteCompany(CompanyID);
        }

        public void EditCompanyName(CrgCompanies Company)
        {
            context.EditCompanyName(Company);
        }

        public List<CompanyGroupsCountViewModel> GetAllCompanies()
        {
            return context.GetAllCompanies();
        }
    }
}
