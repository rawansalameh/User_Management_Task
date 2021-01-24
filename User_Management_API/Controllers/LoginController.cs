using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace User_Management_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        user_managementContext db;
        public LoginController(IConfiguration config , user_managementContext db)
        {
            _config = config;
            this.db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        //receives the login details of the user and then verify it by calling the AuthenticateUser method
        public IActionResult Login([FromBody] CrsUsers loggedInUser)
        {
            IActionResult response = Unauthorized();
            CrsUsers user = AuthenticateUser(loggedInUser);
            if (user != null)
            {
                var tokenString = GenerateJWT(user);
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = user,
                });
            }
            return response;
        }
        //checkS if the user details exist in the database
        CrsUsers AuthenticateUser(CrsUsers loginCredentials)
        {   //TODO: check validation , check password expiry , check user status --> and return suitable error message
            // send the error message to login.component.html instead of the message written in first <div> of the page
            CrsUsers user = db.CrsUsers.SingleOrDefault(x => x.Username == loginCredentials.Username && x.Password == loginCredentials.Password);
            return user;
        }

        //The GenerateJWT method will configure the JWT for our application.We are using HmacSha256 as our encryption algorithm.
        //We will also create claims to be sent as payload with our JWT.
        //The claims will contain info about the user such as UserName, FirstName, and UserType.
        //We will use this information on the client app.In the end, we will create the JWT by specifying details such as issuer, audience, claims, expire and signingCredentials.
        //We are setting the expiry time as 30 mins from the time of the creation of token.
        //We will send the JWT token back to the client with an OK response.If the user details are invalid, we will send an Unauthorized response.

     string GenerateJWT(CrsUsers userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            string userType="";
            if (userInfo.IsAdmin == 1 && userInfo.SystemUser ==1) { userType = "Admin"; }
            else if (userInfo.SystemUser == 1 && userInfo.IsAdmin ==0) { userType = "User"; }
            else if (userInfo.IsAdmin == 1 && userInfo.SystemUser == 0) { userType = "Eska"; }
            var claims = new[]
            {
         
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
                new Claim("Name", userInfo.Name.ToString()),
                new Claim("role",userType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}



