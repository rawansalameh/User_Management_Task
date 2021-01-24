using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class CrsUsersGroups
    {
        public int UsersGroupsId { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }

        public virtual CrsGroups Group { get; set; }
        public virtual CrsUsers User { get; set; }
    }
}
