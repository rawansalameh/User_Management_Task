using Entities.Models;
using Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public interface IGroupServices
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
