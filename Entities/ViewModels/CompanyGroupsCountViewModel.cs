using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public class CompanyGroupsCountViewModel
    {
        public CrgCompanies company{get; set;}
        public int groupsCount { get; set; }
        public int usersCount { get; set; }
    }
}
