﻿using System;
using System.Collections.Generic;
using System.Text;
using Entities.Models;
using Entities.ViewModels;

namespace Services.Services
{
   public  interface IUserServices
    {
        NormalUserViewModel FindUser(int userID);

        List<CrsUsers> GetAdminUsers();
        List<NormalUserViewModel> GetNormalUsers(int companyID);
        //void CreateAdminUser(CrsUsers adminUser);
        void CreateUser(NormalUserViewModel normalUserViewModel);
        void ActivateUser(CrsUsers user);
        void DeactivateUser(CrsUsers user);
        void ChangePassword(ChangePasswordViewModel changePasswordViewModel);
        Boolean IsValidUser(ValidUserViewModel validUserViewModel);
        Boolean IsActiveUser(string username);
        Boolean IsExpiredPassword(string username);
        void ResetPassword(string email);
        CrsUsers FindUserByUserName(string username);
        void EditUser(NormalUserViewModel normalUserViewModel);
        List<NormalUserViewModel> GetAllUsers();
        void DeleteUser(int userID);
        string[] GetUserGroups(int userID);

    }
}
