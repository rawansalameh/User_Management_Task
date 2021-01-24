using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Context
{
   public  interface ICompanyRepository
    {
        void CreateCompany(CrgCompanies company);
        void DeleteCompany(int CompanyID);
        void EditCompanyName(CrgCompanies Company);
        List<CompanyGroupsCountViewModel> GetAllCompanies();
        
    }
}
