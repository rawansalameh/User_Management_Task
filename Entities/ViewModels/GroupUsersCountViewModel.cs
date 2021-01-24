using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
   public class GroupUsersCountViewModel
    {
       public CrsGroups group { get; set; }
        public int usersCount { get; set; }
        public string companyName { get; set; }
    }
}
