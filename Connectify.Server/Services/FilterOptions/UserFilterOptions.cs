namespace Connectify.Server.Services.FilterOptions
{
    public class UserFilterOptions
    {
        public string? FullName { get; set; }
        public string? Location { get; set; }
        public string? Company { get; set; }
        public string? Filter { get; set; }
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 10;


    }
}
