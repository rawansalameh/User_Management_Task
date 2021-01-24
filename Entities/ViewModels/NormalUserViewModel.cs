using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.ViewModels
{
    public class NormalUserViewModel
    {
        public CrsUsers User { get; set; }
        public int[] GroupIDs { get; set; }
    }
}
