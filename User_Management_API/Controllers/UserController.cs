using Entities.Models;
using Entities.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserServices userServices;
        public UserController(IUserServices userServices) {
            this.userServices = userServices;
        }


        [HttpGet]
        [Route("GetUserGroups")]
        public string[] GetUserGroups(int userID)
        {
            return userServices.GetUserGroups(userID);
        }

        [HttpGet]
        [Route("FindUser")]
        public NormalUserViewModel FindUser(int userID)
        { return userServices.FindUser(userID);
        }

        [HttpGet]
        [Route("GetAdminUsers")]
        public  List<CrsUsers> GetAdminUsers()
        {
          return userServices.GetAdminUsers();
        }

        [HttpGet]
        [Route("GetNormalUsers")]
        public List<NormalUserViewModel> GetNormalUsers(int companyID) 
        {
            return userServices.GetNormalUsers(companyID);
        }

        //[HttpPost]
        //[Route("CreateAdminUser")]
        //public void CreateAdminUser(CrsUsers adminUser) {
        //    userServices.CreateAdminUser(adminUser);
        //}

        [HttpPost]
        [Route("CreateUser")]
        public void CreateUser(NormalUserViewModel normalUserViewModel)
        {
            userServices.CreateUser(normalUserViewModel);
        }

        [HttpPost]
        [Route("ActivateUser")]
        public void ActivateUser(CrsUsers user)
        {
            userServices.ActivateUser(user);
        }

        [HttpPost]
        [Route("DeactivateUser")]
        public void DeactivateUser(CrsUsers user)
        {
            userServices.DeactivateUser(user);
        }


        [HttpPost]
        [Route("ChangePassword")]
         public void ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {
            userServices.ChangePassword( changePasswordViewModel);
        }

        [HttpPost]
        [Route("IsValidUser")]
        public Boolean IsValidUser(ValidUserViewModel validUserViewModel) {
            return userServices.IsValidUser(validUserViewModel);
        }

        [HttpGet]
        [Route("IsActiveUser")]
        public Boolean IsActiveUser(string username)
        {
            return userServices.IsActiveUser(username);
        }

        [HttpGet]
        [Route("IsExpiredPassword")]
        public Boolean IsExpiredPassword(string username)
        {
            return userServices.IsExpiredPassword(username);
        }

        [HttpGet]
        [Route("ResetPassword")]
        public void ResetPassword( string email)
        {
             userServices.ResetPassword(email);
        }

        [HttpGet]
        [Route("FindUserByUserName")]
        public CrsUsers FindUserByUserName(string username)
        {
            return userServices.FindUserByUserName(username);
        }

        [HttpPost]
        [Route("EditUser")]
        public void EditUser(NormalUserViewModel normalUserViewModel)
        {
             userServices.EditUser(normalUserViewModel);
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public List<NormalUserViewModel> GetAllUsers()
        {
           return userServices.GetAllUsers();
        }

        [HttpPost]
        [Route("DeleteUser")]
        public void DeleteUser(int userID) {
            userServices.DeleteUser(userID);
        }
    }
}
