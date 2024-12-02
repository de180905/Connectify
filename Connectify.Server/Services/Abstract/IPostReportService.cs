using Connectify.BusinessObjects.Report;
using Connectify.Server.DTOs.PostDTOs;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IPostReportService
    {
        public Task<List<PostReportReason>> GetPostReportReasons();
        public Task CreatePostReport(string userId, int postId, int postReportReasonId);
        Task<PaginatedResult<ReportedPostDTO>> GetReportedPostsAsync(int page, int pageSize);
        Task<IEnumerable<ReportReasonCountDTO>> GetReportCountByTypeAsync(int postId);
    }
}
