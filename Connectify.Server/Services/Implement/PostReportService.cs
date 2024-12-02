using Connectify.BusinessObjects.Report;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class PostReportService : IPostReportService
    {
        private readonly AppDbContext context;
        public PostReportService(AppDbContext appDbContext)
        {
            context = appDbContext;
        }

        public async Task CreatePostReport(string userId, int postId, int postReportReasonId)
        {
            PostReport postReport = new PostReport
            {
                PostId = postId,
                ReportedByUserId = userId,
                PostReportReasonId = postReportReasonId,
            };
            context.PostReports.Add(postReport);
            await context.SaveChangesAsync();
        }

        public async Task<List<PostReportReason>> GetPostReportReasons()
        {
            return await context.PostReportReasons.ToListAsync();
        }
        public async Task<PaginatedResult<ReportedPostDTO>> GetReportedPostsAsync(int page, int pageSize)
        {
            var query = context.PostReports
                .GroupBy(r => new { r.PostId, r.Post.Content })
                .Select(g => new ReportedPostDTO
                {
                    PostId = g.Key.PostId,
                    PostContent = g.Key.Content,
                    ReportCount = g.Count()
                })
                .OrderByDescending(g => g.ReportCount);

            return await PaginationHelper.CreatePaginatedResultAsync(query, page, pageSize);
        }

        public async Task<IEnumerable<ReportReasonCountDTO>> GetReportCountByTypeAsync(int postId)
        {
            return await context.PostReports
                .Where(r => r.PostId == postId)
                .GroupBy(r => r.ReportedReason.Description)
                .Select(g => new ReportReasonCountDTO
                {
                    ReportReason = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();
        }
    }
}
