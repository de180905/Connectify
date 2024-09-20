using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YueXiao.Utils
{
    public static class PaginationHelper
    {
        public static async Task<PaginatedResult<T>> CreatePaginatedResultAsync<T>(
            IQueryable<T> source, int pageNumber, int pageSize = -1)
        {
            var totalCount = await source.CountAsync();
            List<T> items;
            if(pageSize == -1)
            {
                items = await source.ToListAsync();
            }
            else
            {
                items = await source.Skip((pageNumber - 1) * pageSize)
                                                    .Take(pageSize)
                                                    .ToListAsync();
            }
            return new PaginatedResult<T>(items, totalCount, pageNumber, pageSize);
        }
    }
}
