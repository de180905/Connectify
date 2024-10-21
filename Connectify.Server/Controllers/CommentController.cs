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

        //Tạo comment 

        [HttpPost("Create")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDTO dto)
        {

            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
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
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }

        }

        //Reaction comment 

        [HttpPost("Reaction")]
        public async Task<IActionResult> AddOrUpdateReaction([FromBody] AddReactionDTO dto)
        {
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
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }
        //Show all commet by PostID
        [HttpGet("Post/{postId}")]
        public async Task<IActionResult> GetCommentsForPost(int postId, int pageNumber = 1, int pageSize = 10)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = _userManager.GetUserId(User);
            var comments = await _commentService.GetCommentsForPostAsync(postId, pageNumber, pageSize, userId);
            return Ok(comments);
        }

        //Delete Comment 
        [HttpDelete("Delete/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "You need to login to delete a comment." });
            }
            try
            {
                var success = await _commentService.DeleteCommentAsync(commentId, userId);
                return success ? Ok(new { message = "Comment deleted successfully ." }) : BadRequest();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }

        //Update comment 
        [HttpPut("Update/{commnetId}")]
        public async Task<IActionResult> UpdateComment(int commnetId, [FromBody] UpdateCommentDTO dto)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "You need to login to update a comment." });
            }
            try
            {
                var success = await _commentService.UpdateCommentAsync(commnetId, userId, dto.newContent);
                return success ? Ok(new { message = "Comment update successfully." }) : BadRequest();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        } 



    }

}
