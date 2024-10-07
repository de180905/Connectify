using Connectify.Server.DataAccess;
using Connectify.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connectify.Server.Services.Implement
{
    public class SearchService : ISearchService
    {
        private readonly AppDbContext _context;

        public SearchService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> SearchUsersAsync(string query)
        {
            var users = await _context.Users
                .Where(u => u.FirstName.Contains(query) || u.LastName.Contains(query))
                .Select(u => new { u.Id, u.FirstName, u.LastName })
                .ToListAsync();

            return users;
        }

        public async Task<IEnumerable<object>> SearchPostsAsync(string query)
        {
            var posts = await _context.Posts
                .Where(p => p.Content.Contains(query))
                .Select(p => new { p.Id, p.Content })
                .ToListAsync();

            return posts;
        }
    }
}
