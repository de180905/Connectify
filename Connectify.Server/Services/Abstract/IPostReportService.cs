using Connectify.BusinessObjects.Report;

namespace Connectify.Server.Services.Abstract
{
    public interface IPostReportService
    {
        public Task<List<PostReportReason>> GetPostReportReasons();
        public Task CreatePostReport(string userId, int postId, int postReportReasonId);
    }
}
