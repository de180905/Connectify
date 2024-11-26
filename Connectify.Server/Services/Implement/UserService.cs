using AutoMapper;
using AutoMapper.QueryableExtensions;
using Connectify.BusinessObjects.PostFeature;
using Connectify.BusinessObjects.Report;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFriendService friendService;
        public UserService(AppDbContext dbContext, IMapper mapper, IFriendService friendService)
        {
            this._context = dbContext;
            this._mapper = mapper;
            this.friendService = friendService;
        }
        public async Task<UserBasicDTO?> GetUserBasic(string viewerId, string userId)
        {
            // Project to PostDTO and paginate
            var res = await _context.Users
                .Where(u => u.Id == userId)
                .ProjectTo<UserBasicDTO>(_mapper.ConfigurationProvider, new { userId = viewerId, friendService = friendService }).FirstOrDefaultAsync();
            return res;
        }
        public async Task<UserDescriptionDTO?> GetDescriptionOfUser(string viewerId, string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                return new UserDescriptionDTO
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Location = user.Location,
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    Company = user.Company,
                    Bio = user.Bio,
                };
            }
            return null;
        }
        public async Task<PaginatedResult<UserSearchDTO>> GetFriendsOfUserAsync(string viewerId, string userId, string? searchTerm, int pageNumber, int pageSize)
        {
            var query = _context.Users.Where(u => _context.FriendShips.Any(fs => fs.User1Id == u.Id && fs.User2Id == userId
                || fs.User2Id == u.Id && fs.User1Id == userId));
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(u => u.FirstName.Contains(searchTerm) || u.LastName.Contains(searchTerm));
            }
            query = query.OrderByDescending(u => u.FirstName);
            var projectedQuery = query.Select(u => new UserSearchDTO
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Avatar = u.Avatar,
                UserP2PStatus = friendService.GetUsersP2PStatus(viewerId, u.Id),
            });
            var res = await PaginationHelper.CreatePaginatedResultAsync<UserSearchDTO>(projectedQuery, pageNumber, pageSize);
            return res;
        }

        public async Task<bool> BlockUser(string userId, string blockedUserId)
        {
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(bu => bu.UserId == userId && bu.BlockedUserId == blockedUserId);
            if (blockedUser == null)
            {
                var blockedUserInsert = new BlockedUsers { UserId = userId, BlockedUserId = blockedUserId};
                _context.BlockedUsers.Add(blockedUserInsert);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        
        }

        public async Task<bool> UnblockUser(string userId, string blockedUserId)
        {
            var blockedUser = await _context.BlockedUsers.FirstOrDefaultAsync(bu => bu.UserId == userId && bu.BlockedUserId == blockedUserId);
            if(blockedUser != null)
            {
                _context.BlockedUsers.Remove(blockedUser);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
