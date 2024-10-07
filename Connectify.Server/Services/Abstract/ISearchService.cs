using System.Collections.Generic;
using System.Threading.Tasks;

namespace Connectify.Server.Services.Abstract
{
    public interface ISearchService
    {
        Task<IEnumerable<object>> SearchUsersAsync(string query);
        Task<IEnumerable<object>> SearchPostsAsync(string query);
    }
}
