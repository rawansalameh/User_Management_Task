using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Models
{
   public static class Policies
    {
        public const string eskaUser = "Eska";
        public const string adminUser = "Admin";
        public const string normalUser= "User";

        //policies registered in the ConfigureServices method of Startup.cs

        //EskaUserPolicy method will check for the “Eska” role while validating a request
        public static AuthorizationPolicy EskaUserPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(eskaUser).Build();
        }

        public static AuthorizationPolicy AdminUserPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(adminUser).Build();
        }

        public static AuthorizationPolicy NormalUserPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(normalUser).Build();
        }
    }
}   
    

