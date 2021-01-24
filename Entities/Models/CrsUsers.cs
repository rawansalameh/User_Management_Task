using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class CrsUsers
    {
        public CrsUsers()
        {
            CrsUsersGroups = new HashSet<CrsUsersGroups>();
        }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int IsAdmin { get; set; }
        public int SystemUser { get; set; }
        public int UserStatus { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? CompanyId { get; set; }

        public virtual CrgCompanies Company { get; set; }
        public virtual ICollection<CrsUsersGroups> CrsUsersGroups { get; set; }
    }
}
