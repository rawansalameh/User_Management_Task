using Entities.Models;
using Entities.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        ICompanyServices companyServices;

        public CompanyController(ICompanyServices companyServices) {
            this.companyServices = companyServices;
        }

        [HttpPost]
        [Route("CreateCompany")]
        [Authorize(Policy = Policies.eskaUser)]
        public void CreateCompany(CrgCompanies company)
        {
            companyServices.CreateCompany(company);
        }

        [HttpPost]
        [Route("DeleteCompany")]
        //[Authorize(Policy = Policies.eskaUser)]
        public void DeleteCompany([FromBody]int CompanyID)
        {
            companyServices.DeleteCompany(CompanyID);
        }

        [HttpPost]
        [Route("EditCompanyName")]
        public void EditCompanyName(CrgCompanies Company) 
        {
            companyServices.EditCompanyName(Company);
        }


        [HttpGet]
        [Route("GetAllCompanies")]
        public List<CompanyGroupsCountViewModel> GetAllCompanies() 
        {
            return companyServices.GetAllCompanies();
        }
    }
}
