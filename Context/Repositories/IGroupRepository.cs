using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Context
{
    public interface IGroupRepository
    {
        void CreateGroup(CrsGroups group);
        void DeleteGroup(int groupID);
        void EditGroupName(CrsGroups group);
        //List<CrsGroups> GetCompanyGroups(string companyName);
        List<CrsGroups> GetCompanyGroups(int companyID);

        List<GroupUsersCountViewModel> GetAllGroups();
        List<GroupsUsersViewModel> getCompanyGroupsUsers(int companyID);

    }
}
