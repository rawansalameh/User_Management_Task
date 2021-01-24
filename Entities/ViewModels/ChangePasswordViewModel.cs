using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels
{
    public  class ChangePasswordViewModel
    {
       public string username { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
    }
}
