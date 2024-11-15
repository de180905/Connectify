using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IMediaService
    {
        Task<PaginatedResult<MediaDTO>> GetPostMediaOfUserAsync(string viewerId, string userId, MediaFilterOptions opts, int pageNumber, int pageSize);
    }
}
