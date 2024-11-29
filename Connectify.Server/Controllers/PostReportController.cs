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
        public PostReportController(IPostReportService postReportService)
        {
            _postReportService = postReportService;
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
    }
}
