using Connectify.BusinessObjects.Report;
using Connectify.Server.DataAccess;
using Connectify.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;

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
    }
}
