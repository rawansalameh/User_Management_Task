using Context;
using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public class GroupServices : IGroupServices
    {
        private readonly IGroupRepository context;
        public GroupServices(IGroupRepository context) {
            this.context = context;
        }
        public void CreateGroup(CrsGroups group)
        {
            context.CreateGroup(group);
        }

        public void DeleteGroup(int groupID)
        {
            context.DeleteGroup(groupID);
        }

        public void EditGroupName(CrsGroups group)
        {
            context.EditGroupName(group);
        }

        public List<GroupUsersCountViewModel> GetAllGroups()
        {
            return context.GetAllGroups();
        }

        //public List<CrsGroups> GetCompanyGroups(string companyName)
        //{
        //    return context.GetCompanyGroups(companyName);
        //}
        public List<CrsGroups> GetCompanyGroups(int companyID)
        {
            return context.GetCompanyGroups(companyID);
        }

        public List<GroupsUsersViewModel> getCompanyGroupsUsers(int companyID)
        {
            return context.getCompanyGroupsUsers(companyID);
        }
    }
}
