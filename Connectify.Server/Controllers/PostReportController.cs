using Connectify.Server.DTOs.ReportDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReportController : ControllerBase
    {
        private readonly IPostReportService _postReportService;
        private readonly IPostService _postService;
        public PostReportController(IPostReportService postReportService, IPostService postService)
        {
            _postReportService = postReportService;
            _postService = postService;
        }
        [HttpGet("get-report-reasons")]
        public async Task<IActionResult> GetPostReportReasons()
        {
            try
            {
                var result = await _postReportService.GetPostReportReasons();
                var response = new List<GetPostReportReasonsResponse>();
                if (result != null && result.Count > 0)
                {
                    response = result.Select(rs => new GetPostReportReasonsResponse
                    { Id = rs.Id, Description = rs.Description }).ToList();
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("create-post-report")]
        public async Task<IActionResult> CreatePostReport([FromQuery] int postId, [FromQuery] int postReportReasonId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                await _postReportService.CreatePostReport(userId, postId, postReportReasonId);
                return Ok(new { isSuccess = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("reported-posts")]
        public async Task<IActionResult> GetReportedPosts(
       [FromQuery] int page = 1,
       [FromQuery] int pageSize = 10)
        {
            var result = await _postReportService.GetReportedPostsAsync(page, pageSize);
            return Ok(result);
        }
        [HttpDelete("reported-posts/{postId}")]
        public async Task<IActionResult> DeleteReportedPost(int postId)
        {
            try
            {
                await _postService.DeletePostAsync("", postId, true);
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
        [HttpGet("report-details/{postId}")]
        public async Task<IActionResult> GetReportCountByType(int postId)
        {
            var reportDetails = await _postReportService.GetReportCountByTypeAsync(postId);
            if (!reportDetails.Any())
                return NotFound(new { Message = "No reports found for this post" });

            return Ok(reportDetails);
        }
    }
}
