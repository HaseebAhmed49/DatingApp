using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDatingRepository _repo;

        public UserController(IDatingRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            return Ok(users);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _repo.GetUser(id);
                return Ok(user);
            }
            catch(Exception ex)
            {
                return BadRequest("Error in Try");
            }

        }

        [HttpPost]
        public async Task<IActionResult> AddUser()
        {
            return Ok(User);
        }



    }
}

