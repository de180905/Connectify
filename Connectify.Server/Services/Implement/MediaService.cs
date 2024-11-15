using AutoMapper;
using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class MediaService : IMediaService
    {
        private readonly AppDbContext _context;
        private readonly IFriendService _friendService;
        public MediaService(AppDbContext context, IFriendService friendService)
        {
            _context = context;
            _friendService = friendService;
        }
        public async Task<PaginatedResult<MediaDTO>> GetPostMediaOfUserAsync(string viewerId, string userId, MediaFilterOptions opts, int pageNumber, int pageSize)
        {
            var query = _context.Media.OfType<PostMedia>().Where(m => m.Post is NormalPost);
            if(opts != null)
            {
                if (opts.Relation == "isTagged")
                {
                    query = query
                        .Where(m => m.Post.PostTags.Any(pt => pt.UserId == userId));
                }
                else
                {
                    query = query.Where(m => m.Post.AuthorId == userId);
                }
                if (opts.FileType != null)

                {
                    query = query.Where(m => m.FileType != null && m.FileType.StartsWith(opts.FileType));
                }
            }
            //Apply visibility
            query = query
                .Where(m => viewerId == m.Post.AuthorId ||
                        (((NormalPost)m.Post).Visibility == VisibilityLevel.Public ||
                        ((NormalPost)m.Post).Visibility == VisibilityLevel.FriendsOnly && _friendService.Friend(userId, viewerId))
                        )
                .OrderByDescending(m => m.Id);
            var projectedQuery = query.Select(m => new MediaDTO
            {
                Id = m.Id,
                Name = m.Name,
                Type = m.FileType,
                Url = m.Url
            });
            return await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
        }
    }
}
