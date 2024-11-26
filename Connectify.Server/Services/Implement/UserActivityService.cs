using Connectify.BusinessObjects.CommentFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.UserActivityDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Connectify.Server.Services.Implement
{
    public class UserActivityService : IUserActivityService
    {
        private readonly AppDbContext _context;
        public UserActivityService(AppDbContext context) { _context = context; }
        public async Task<List<UserActivityGroupedByDateResponse>> GetComments(string userId, int pageNumber, int pageSize)
        {
            var logs = await _context.Comments
                .Where(cmt => cmt.AuthorId == userId)
                .Select(cmt => new UserActivityResponse
                {
                    TargetType = cmt.ParentCommentId == null ? "post" : "comment",
                    Activity = cmt.ParentCommentId == null ? "commented on" : "replied on",
                    Content = cmt.Content,
                    TargetUserName = cmt.ParentCommentId == null ? (cmt.Post.AuthorId == userId ? "your" : _context.Users.Where(u => u.Id == cmt.Post.AuthorId).Select(u => u.FullName).FirstOrDefault())
                   : (cmt.ParentComment.AuthorId == userId ? "your" : _context.Users.Where(u => u.Id == cmt.ParentComment.AuthorId).Select(u => u.FullName).FirstOrDefault()),
                    Timestamp = cmt.CreatedAt,
                    TargetUrl = $"/post-view/{cmt.PostId}/{cmt.CommentId}"
                })
                .OrderByDescending(log => log.Timestamp)             
                .ToListAsync();
            return GroupLogsByDate(logs, pageSize, pageNumber);
        }

        public async Task<List<UserActivityGroupedByDateResponse>> GetFriendships(string userId, int pageNumber, int pageSize)
        {
            var friendRequest = await _context.FriendRequests
                .Where(fr => fr.RequesterId == userId)
                .Select(fr => new UserActivityResponse
                {
                    Activity = "sent a friend request to",
                    TargetUserName = fr.Receiver.FullName,
                    TargetUrl = $"/{fr.ReceiverId}",
                    Timestamp = fr.RequestDate,
                }).ToListAsync();
            var friendShip = await _context.FriendShips
                .Where(fs=>fs.User1Id== userId||fs.User2Id==userId)
                .Select(fs => new UserActivityResponse
                {
                    Activity = "became friends with",
                    TargetUserName = fs.User1Id == userId ? fs.User2.FullName:fs.User1.FullName,
                    TargetUrl = fs.User1Id == userId ? $"/{fs.User2Id}" : $"/{fs.User1Id}",
                    Timestamp = fs.FriendsSince,
                }).ToListAsync();
            var logs = friendRequest.Concat(friendShip)
                .OrderByDescending(log => log.Timestamp).ToList();
            return GroupLogsByDate(logs, pageSize, pageNumber);
        }

        public async Task<List<UserActivityGroupedByDateResponse>> GetPostSaves(string userId, int pageNumber, int pageSize)
        {
            var postSaves = await _context.PostSaves
                .Where(ps=>ps.UserId == userId)
                .Select(
                    ps => new UserActivityResponse
                    {
                        TargetType = "post",
                        Activity = "saved",
                        TargetUserName = ps.Post.Author.FullName,
                        TargetUrl = $"/post-view/{ps.PostId}/0",
                        Timestamp = ps.CreateAt
                    }
                )
                .ToListAsync();
            return GroupLogsByDate(postSaves, pageSize, pageNumber);
        }

        public async Task<List<UserActivityGroupedByDateResponse>> GetReactions(string userId, int pageNumber, int pageSize)
        {
            var postReactions = await _context.PostReactions
                .Where(pr => pr.UserId == userId)
                .Select(pr => new UserActivityResponse
                {
                    TargetType = "post",
                    Activity = "reacted to",
                    Reaction = pr.Reaction,
                    TargetUserName = pr.UserId == pr.Post.AuthorId ? "your" : pr.Post.Author.FullName,
                    TargetUrl = $"/post-view/{pr.PostId}/0",
                    Timestamp = pr.UpdateAt
                }).ToListAsync();
            var commentReactions = await _context.CommentReactions
                .Where(cr => cr.UserId == userId && cr.IsLike)
                .Select(cr => new UserActivityResponse
                {
                    TargetType = "comment",
                    Activity = "reacted to",
                    Reaction = BusinessObjects.ReactionType.Like,
                    TargetUserName = cr.UserId == cr.Comment.AuthorId ? "your" : cr.Comment.Author.FullName,
                    TargetUrl = $"/post-view/{cr.Comment.PostId}/{cr.CommentId}",
                    Timestamp = cr.UpdateAt
                }).ToListAsync();
            var logs = postReactions.Concat(commentReactions)
                .OrderByDescending(log => log.Timestamp).ToList();
            return GroupLogsByDate(logs, pageSize, pageNumber);
        }

        private List<UserActivityGroupedByDateResponse> GroupLogsByDate(List<UserActivityResponse> logs, int pageSize, int pageNumber)
        {
            return logs.GroupBy(log =>  log.Timestamp.Date)
                .Select(g => new UserActivityGroupedByDateResponse{
                    Date = g.Key.ToString("dd MMMM yyyy"),
                    Activities = g.Select(log => new UserActivityResponse
                    {
                        TargetType = log.TargetType,
                        Activity = log.Activity,
                        Content = log.Content,
                        Reaction = log.Reaction,
                        TargetUserName = log.TargetUserName, 
                        Timestamp = log.Timestamp,
                        TargetUrl = log.TargetUrl,
                    })
                    .ToList()
                })
                .Skip(pageNumber * pageSize)
                .Take(pageSize)
                .ToList();
        }
    }
}
