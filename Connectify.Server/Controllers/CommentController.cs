using Connectify.BusinessObjects.Authen;
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly UserManager<User> _userManager;

        public CommentController(ICommentService commentService, UserManager<User> userManager)
        {
            _commentService = commentService;
            _userManager = userManager;
        }


        [HttpPost("Create")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDTO dto)
        {

            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //var userId = "bbe771ab-531c-45a3-8e68-310762bbcd04";
            try
            {
                var userId = _userManager.GetUserId(User);

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "You need to login to create a comment." });
                }

                var comment = await _commentService.CreateCommentAsync(dto, userId);
                return Ok(comment);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
            
        }

        [HttpPost("Reaction")]
        public async Task<IActionResult> AddOrUpdateReaction([FromBody] AddReactionDTO dto)
        {
            // var userId = "bbe771ab-531c-45a3-8e68-310762bbcd04";
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try {
                var userId = _userManager.GetUserId(User);

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "You need to login to create a comment." });
                }
                var success = await _commentService.AddOrUpdateReactionAsync(dto, userId);
                return success ? Ok() : BadRequest();
            }
            catch (ArgumentException ex)
            {
                // Trường hợp phát sinh ngoại lệ do dữ liệu không hợp lệ
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Trường hợp phát sinh ngoại lệ khác
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }

        [HttpGet("Post/{postId}")]
        public async Task<IActionResult> GetCommentsForPost(int postId, int pageNumber = 1, int pageSize = 10)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //var userId = "bbe771ab-531c-45a3-8e68-310762bbcd04";
            var userId = _userManager.GetUserId(User);
            var comments = await _commentService.GetCommentsForPostAsync(postId, pageNumber, pageSize, userId);
            return Ok(comments);
        }
       
        


    }

}
