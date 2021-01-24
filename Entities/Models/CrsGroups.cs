using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class CrsGroups
    {
        public CrsGroups()
        {
            CrsUsersGroups = new HashSet<CrsUsersGroups>();
        }

        public int GroupId { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }

        public virtual CrgCompanies Company { get; set; }
        public virtual ICollection<CrsUsersGroups> CrsUsersGroups { get; set; }
    }
}
