using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Connectify.Server.Filters
{
    public class ChatRoomFilter : IAsyncActionFilter
    {
        private readonly ILogger<ChatRoomFilter> _logger;

        public ChatRoomFilter(ILogger<ChatRoomFilter> logger)
        {
            _logger = logger;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Execute the action
            var resultContext = await next();

            // Check if the action result is successful (200-299)
            if (resultContext.Result is OkObjectResult okResult)
            {
                // Logic to execute after a successful response
                _logger.LogInformation("Successful response: {@Response}", okResult.Value);
                // Add your additional logic here (e.g., sending notifications, logging, etc.)
            }
        }
    }
}
