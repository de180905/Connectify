using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Utils.Sort;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddComment([FromBody] CreateCommentDTO dto)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentId = await _commentService.AddCommentAsync(authorId, dto);
            CommentDTO createdComment = new CommentDTO();
            try
            {
                createdComment = await _commentService.GetCommentByIdAsync(authorId, commentId);
            }
            catch (Exception ex)
            {

            }
            return Ok(createdComment);
        }

        [HttpPost("reply")]
        public async Task<IActionResult> ReplyComment([FromBody] ReplyCommentDTO dto)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentId = await _commentService.ReplyCommentAsync(authorId, dto);
            CommentDTO createdReply = new CommentDTO();
            try
            {
                createdReply = await _commentService.GetCommentByIdAsync(authorId, commentId);
            }
            catch (Exception ex)
            {

            }
            return Ok(createdReply);
        }

        [HttpGet("post/{postId}/comments")]
        public async Task<IActionResult> GetTopLevelComments(
            int postId,
            SortOption sortOption,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetTopLevelCommentsByPostIdAsync(viewerId, postId, sortOption, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{parentCommentId}/replies")]
        public async Task<IActionResult> GetReplies(
            int parentCommentId,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetRepliesAsync(viewerId, parentCommentId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetCommentByIdAsync(viewerId, id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.DeleteCommentAsync(commentId, userId);
            return NoContent();
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditComment([FromBody] EditCommentDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.EditCommentAsync(userId, dto);
            CommentDTO editedComment = null;
            try
            {
                editedComment = await _commentService.GetCommentByIdAsync(userId, dto.CommentId);
            }
            catch (Exception ex)
            {

            }
            return Ok(editedComment);
        }
        [HttpPost("{commentId}/react")]
        public async Task<IActionResult> ReactToComment(int commentId, bool? value)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.ReactToCommentAsync(userId, commentId, value);
            return Ok();
        }
    }
}
