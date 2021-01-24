using Context;
using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
   public class UserServices : IUserServices
    {
        private readonly IUserRepository context;
        public UserServices(IUserRepository context) {
            this.context = context;
        }

        public void ActivateUser(CrsUsers user)
        {
            context.ActivateUser(user);
        }

        public void ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {
            context.ChangePassword(changePasswordViewModel);
        }

        //public void CreateAdminUser(CrsUsers adminUser)
        //{
        //    context.CreateAdminUser(adminUser);
        //}
  
        public void CreateUser(NormalUserViewModel normalUserViewModel)
        {
            context.CreateUser(normalUserViewModel);
        }

        public void DeactivateUser(CrsUsers user)
        {
            context.DeactivateUser(user);
        }

        public void EditUser(NormalUserViewModel normalUserViewModel)
        {
            context.EditUser( normalUserViewModel);
         }

        public CrsUsers FindUserByUserName(string username)
        {
            return context.FindUserByUserName(username);
        }

        public List<CrsUsers> GetAdminUsers()
        {
            return context.GetAdminUsers();
        }

        public List<NormalUserViewModel> GetNormalUsers(int companyID)
        {
            return context.GetNormalUsers(companyID);
        }

        public bool IsActiveUser(string username)
        {
            return context.IsActiveUser(username);
        }

        public bool IsExpiredPassword(string username)
        {
            return context.IsExpiredPassword(username);
        }

        public bool IsValidUser(ValidUserViewModel validUserViewModel)
        {
            return context.IsValidUser(validUserViewModel);
        }

        public void ResetPassword(string email)
        {
            context.ResetPassword(email);
        }
        public List<NormalUserViewModel> GetAllUsers() {
            return context.GetAllUsers();
        }

        public void DeleteUser(int userID)
        {
            this.context.DeleteUser(userID);
        }

        public NormalUserViewModel FindUser(int userID)
        {
            return context.FindUser(userID);
        }

        public string[] GetUserGroups(int userID)
        {
            return context.GetUserGroups(userID);
        }
    }
}
