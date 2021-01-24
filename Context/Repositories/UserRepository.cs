using Entities;
using Entities.Models;
using Entities.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Context
{
    public class UserRepository : IUserRepository
    {
        user_managementContext db;

        public UserRepository(user_managementContext db) {
            this.db = db;
        }


        public void ActivateUser(CrsUsers user)
        {
            CrsUsers newUser = new CrsUsers();
            newUser.Name = user.Name;
            newUser.Username = user.Username;
            newUser.UserId = user.UserId;
            newUser.PhoneNumber = user.PhoneNumber;
            newUser.Password = user.Password;
            newUser.IsAdmin = user.IsAdmin;
            newUser.Email = user.Email;
            newUser.Birthdate = user.Birthdate;
            newUser.SystemUser = user.SystemUser;
            newUser.CompanyId = user.CompanyId;
            newUser.UserStatus = 1;
            db.Update(newUser);
            db.SaveChanges();
        }


        public void ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {    
            if (changePasswordViewModel.newPassword != changePasswordViewModel.oldPassword)
            {
                CrsUsers user = FindUserByUserName(changePasswordViewModel.username);
                if (user.Password == changePasswordViewModel.oldPassword)
                { user.Password = changePasswordViewModel.newPassword;
                    user.PasswordExpiryDate = DateTime.Now.AddMonths(2).Date;

                }
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
            } }


        //public void CreateAdminUser(CrsUsers adminUser)
        //{
        //    db.CrsUsers.Add(adminUser);
        //    db.SaveChanges();
        //}

           
        public void CreateUser(NormalUserViewModel normalUserViewModel)
        {
 
            db.CrsUsers.Add(normalUserViewModel.User);
            db.SaveChanges();
            foreach (int id in normalUserViewModel.GroupIDs)
                db.CrsUsersGroups.Add(new CrsUsersGroups { UserId = normalUserViewModel.User.UserId, GroupId = id });
            db.SaveChanges();
        }


        public void DeactivateUser(CrsUsers user)
        {
            //Aboud Code
            //user.UserStatus = 1;
            //db.Entry(user).State = EntityState.Modified;

            CrsUsers newUser = new CrsUsers();
            newUser.Name = user.Name;
            newUser.Username = user.Username;
            newUser.UserId = user.UserId;
            newUser.PhoneNumber = user.PhoneNumber;
            newUser.Password = user.Password;
            newUser.IsAdmin = user.IsAdmin;
            newUser.Email = user.Email;
            newUser.Birthdate = user.Birthdate;
            newUser.SystemUser = user.SystemUser;
            newUser.CompanyId = user.CompanyId;
            newUser.UserStatus = 0;
            db.Update(newUser);
            db.SaveChanges();
        }

        public CrsUsers FindUserByUserName(string username) {
            return db.CrsUsers.Where(x => x.Username == username).FirstOrDefault();
        }

        public NormalUserViewModel FindUser(int userID)
        {
            NormalUserViewModel user = new NormalUserViewModel();
            user.User= db.CrsUsers.Where(x => x.UserId == userID).FirstOrDefault();
            user.GroupIDs = db.CrsUsersGroups.Where(x => x.UserId == userID).Select(u => u.GroupId).ToArray();
            return user;
        }


        public List<CrsUsers> GetAdminUsers()
        {
            return db.CrsUsers.Where(x => /*x.UserStatus == 1 && */  x.IsAdmin == 1 && x.SystemUser == 1).ToList();

        }


        public List<NormalUserViewModel> GetNormalUsers(int companyID)
        {
            List<NormalUserViewModel> normalUserViewModel = new List<NormalUserViewModel>();

            List<CrsUsers> users = db.CrsUsers.Where(x => /*x.UserStatus == 1 && */ x.IsAdmin == 0 && x.SystemUser == 1 && x.CompanyId == companyID).ToList();
            foreach (CrsUsers user in users)
            {
                normalUserViewModel.Add(new NormalUserViewModel
                {
                    User = user,
                    GroupIDs = db.CrsUsersGroups.Where(x => x.UserId == user.UserId).Select(u => u.GroupId).ToArray()
                }
                      );
            }
            return normalUserViewModel;
        }
         

        public List<NormalUserViewModel> GetAllUsers()
        {
            List<NormalUserViewModel> normalUserViewModel = new List<NormalUserViewModel>();
            List<CrsUsers> users = db.CrsUsers.Where(x => (x.IsAdmin == 0 && x.SystemUser == 1) || (x.IsAdmin == 1 && x.SystemUser == 1)).ToList();
            foreach (CrsUsers user in users)
            {
                normalUserViewModel.Add(new NormalUserViewModel
                {
                    User = user,
                    GroupIDs = db.CrsUsersGroups.Where(x=> x.UserId == user.UserId).Select(u=> u.GroupId).ToArray()
                }
                      ); 
            }
            return normalUserViewModel;
        }

        public List<GroupUsersCountViewModel> GetAllGroups()
        {
            List<GroupUsersCountViewModel> groupUsersCountViewModels = new List<GroupUsersCountViewModel>();

            List<CrsGroups> groups = db.CrsGroups.ToList();
            foreach (CrsGroups group in groups)
            {
                groupUsersCountViewModels.Add(new GroupUsersCountViewModel
                {
                    group = group,
                    companyName = db.CrgCompanies.Where(x => x.CompanyId == group.CompanyId).FirstOrDefault().Name,
                    usersCount = db.CrsUsersGroups.Where(x => x.GroupId == group.GroupId).Count()
                });
            }
            return groupUsersCountViewModels;
        }

        public bool IsActiveUser(string username)
        {
           CrsUsers user= FindUserByUserName(username);
            if (user.UserStatus == 1)
            { return true; }
            else { return false; }
        }


        public bool IsExpiredPassword(string username)
        {
            CrsUsers user = FindUserByUserName(username);
            if (user.PasswordExpiryDate < DateTime.Now)
            { return true; }
            else { return false; }
        }
         

        public bool IsValidUser(ValidUserViewModel validUserViewModel)
        {
            CrsUsers user = FindUserByUserName(validUserViewModel.Username);
            if (user != null)
            {
                if (user.Password == validUserViewModel.Password)
                { return true; }
            }
            return false;
        }


        public void ResetPassword(string email)
        {
            CrsUsers user = db.CrsUsers.Where(x => x.Email == email).FirstOrDefault();
            EmailHelper emailHelper = new EmailHelper();
            emailHelper.SendEmail("user.management.eska@gmail.com","Eska1234",email , "Password Resest", "Password is : " + user.Password );
        }


        public void EditUser(NormalUserViewModel normalUserViewModel)
        {    
            //method1
            List<CrsUsersGroups>usersGroupsList = db.CrsUsersGroups.Where(x => x.UserId == normalUserViewModel.User.UserId).ToList();
            foreach (CrsUsersGroups crsUsersGroups in usersGroupsList)
            {
                db.CrsUsersGroups.Remove(crsUsersGroups);
                db.SaveChanges();
            }
            //method2
            foreach (int id in normalUserViewModel.GroupIDs)
                db.CrsUsersGroups.Add(new CrsUsersGroups { UserId = normalUserViewModel.User.UserId, GroupId = id });
            db.SaveChanges();

            //method3
            db.CrsUsers.Update(normalUserViewModel.User);
            db.SaveChanges();

        }

        public void DeleteUser(int userID)
        {
            List<CrsUsersGroups> usersGroups = db.CrsUsersGroups.Where(x => x.UserId == userID).ToList();
            foreach (CrsUsersGroups userGroups in usersGroups)
            {
                db.Remove(userGroups);
                db.SaveChanges();
            }
            CrsUsers user = db.CrsUsers.Where(x => x.UserId == userID).FirstOrDefault();
            db.Remove(user);
            db.SaveChanges();
        }

        public string[] GetUserGroups(int userID)
        {
            int[] groupIDs = db.CrsUsersGroups.Where(x => x.UserId == userID).Select(u => u.GroupId).ToArray();
            string[] groupsNames = new string[groupIDs.Length];
            for (int i = 0; i < groupIDs.Length; i++)
            {
                groupsNames[i] = db.CrsGroups.Where(x => x.GroupId == groupIDs[i]).Select(u => u.Name).FirstOrDefault();
            }
            return groupsNames;


        }
    }
}
