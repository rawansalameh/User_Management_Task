using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public interface ICompanyServices
    {
        void CreateCompany(CrgCompanies company);
        void DeleteCompany(int companyID);
        void EditCompanyName(CrgCompanies Company);
        List<CompanyGroupsCountViewModel> GetAllCompanies();
    }
}
