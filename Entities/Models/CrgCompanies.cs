using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class CrgCompanies
    {
        public CrgCompanies()
        {
            CrsGroups = new HashSet<CrsGroups>();
            CrsUsers = new HashSet<CrsUsers>();
        }

        public int CompanyId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CrsGroups> CrsGroups { get; set; }
        public virtual ICollection<CrsUsers> CrsUsers { get; set; }
    }
}
