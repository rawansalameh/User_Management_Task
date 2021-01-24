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
    public class GroupController : ControllerBase
    {
        IGroupServices groupServices;
        public GroupController(IGroupServices groupServices) 
        {
            this.groupServices = groupServices;
        }

        [HttpGet]
        [Route("getCompanyGroupsUsers")]
        public List<GroupsUsersViewModel> getCompanyGroupsUsers(int companyID)
        {
           return  groupServices.getCompanyGroupsUsers(companyID);
        }


        [HttpPost]
        [Route("CreateGroup")]
        public void CreateGroup(CrsGroups group)
        {
            groupServices.CreateGroup(group);
        }

        [HttpPost]
        [Route("DeleteGroup")]
        public void DeleteGroup([FromBody]int groupID)
        {
            groupServices.DeleteGroup(groupID);
        }

        [HttpPost]
        [Route("EditGroupName")]
        public void EditGroupName(CrsGroups group)
        {
            groupServices.EditGroupName(group);
        }

        [HttpGet]
        [Route("GetCompanyGroups")]
        public List<CrsGroups> GetCompanyGroups(int companyID)
        {
            return groupServices.GetCompanyGroups(companyID);
        }

        [HttpGet]
        [Route("GetAllGroups")]
        public List<GroupUsersCountViewModel> GetAllGroups()
        {
            return groupServices.GetAllGroups();
        }
    }
}
