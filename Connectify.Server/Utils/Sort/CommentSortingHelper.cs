using Connectify.Server.DTOs.CommentDTOs;
using Microsoft.Data.SqlClient;

namespace Connectify.Server.Utils.Sort
{
    public static class CommentSortingHelper
    {
        public static IQueryable<CommentDTO> ApplySorting(IQueryable<CommentDTO> query, SortOption sortOption, SortOrder sortOrder)
        {
            if (sortOption == SortOption.Latest)
            {
                if (sortOrder == SortOrder.Descending)
                {
                    query = query.OrderByDescending(c => c.CreatedAt);
                }
                else
                {
                    query = query.OrderBy(c => c.CreatedAt);
                }
            }
            else if (sortOption == SortOption.Popularity)
            {
                //if (sortOrder == SortOrder.Descending)
                //{
                //    query = query.OrderByDescending(c => c.TotalEmotionsCount);
                //}
                //else
                //{
                //    query = query.OrderBy(c => c.TotalEmotionsCount);
                //}
            }
            return query;
        }

    }
}
