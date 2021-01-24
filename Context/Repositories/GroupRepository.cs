using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Context
{
   public class GroupRepository : IGroupRepository
    {
        user_managementContext db;
        public GroupRepository(user_managementContext db) {
            this.db = db;
        }

        public void CreateGroup(CrsGroups group)
        {
            //CrgCompanies company = db.CrgCompanies.Where(x => x.Name == companyGroupViewModel.companyName).FirstOrDefault();
            //CrsGroups group = new CrsGroups();
            //group.Name = companyGroupViewModel.groupName;
            //group.CompanyId = company.CompanyId;
            db.CrsGroups.Add(group);
            db.SaveChanges();
        }


        public void DeleteGroup(int groupID)
        {
            CrsGroups group = db.CrsGroups.Where(x => x.GroupId == groupID).FirstOrDefault();
            db.CrsGroups.Remove(group);
            db.SaveChanges();
        }
         

        public void EditGroupName(CrsGroups group)
        {
            db.CrsGroups.Update(group);
            db.SaveChanges();
        }

        public List<GroupUsersCountViewModel> GetAllGroups()
        {
            List<GroupUsersCountViewModel> groupUsersCountViewModels= new List<GroupUsersCountViewModel>();

            List<CrsGroups> groups =  db.CrsGroups.ToList();
            foreach (CrsGroups group in groups)
            {
                groupUsersCountViewModels.Add(new GroupUsersCountViewModel
                {
                    group = group,
                    companyName = db.CrgCompanies.Where(x => x.CompanyId == group.CompanyId).FirstOrDefault().Name,
                    usersCount = db.CrsUsersGroups.Where(x=> x.GroupId == group.GroupId).Count()
                });
            }
            return groupUsersCountViewModels;
        }

        //public List<CrsGroups> GetCompanyGroups(string companyName)
        //{
        //    CrgCompanies company = db.CrgCompanies.Where(x => x.Name == companyName).FirstOrDefault();
        //    List<CrsGroups> groups = db.CrsGroups.Where(x => x.CompanyId == company.CompanyId).ToList();
        //    return groups;
        
        //}
        public List<CrsGroups> GetCompanyGroups(int companyID)
        {
            CrgCompanies company = db.CrgCompanies.Where(x => x.CompanyId == companyID).FirstOrDefault();
            List<CrsGroups> groups = db.CrsGroups.Where(x => x.CompanyId == company.CompanyId).ToList();
            return groups;

        }

        public List<GroupsUsersViewModel> getCompanyGroupsUsers( int companyID)
        {
            CrgCompanies company = db.CrgCompanies.Where(x => x.CompanyId == companyID).FirstOrDefault();
            List<GroupsUsersViewModel> groupsUsersViewModels = new List<GroupsUsersViewModel>();
            List<CrsGroups> groups = db.CrsGroups.Where(x => x.CompanyId == companyID).ToList();
            foreach (CrsGroups group in groups)
            { List<string> UsersNames = new List<string>();
                int[] usersIDs = db.CrsUsersGroups.Where(x => x.GroupId == group.GroupId).Select(u => u.UserId).ToArray();
                foreach (int userID in usersIDs)
                {
                    UsersNames.Add(db.CrsUsers.Where(x=>x.UserId == userID).Select(u=>u.Name).FirstOrDefault());
                }
                groupsUsersViewModels.Add(new GroupsUsersViewModel
                {
                    groupName = group.Name,
                    usersNames = UsersNames.ToArray(),
               
     
                }) ;
            }
            return groupsUsersViewModels;
        }
    }
}
