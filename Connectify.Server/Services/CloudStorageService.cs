namespace Connectify.Server.Services
{
    public class CloudStorageService : ICloudStorageService
    {
        private readonly IWebHostEnvironment _environment;

        public CloudStorageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            // Ensure that the root directory exists
            string rootPath = Path.Combine(_environment.ContentRootPath, "Uploads");
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }

            // Generate a unique file name
            string fileName = Path.GetFileNameWithoutExtension(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            string uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

            // Combine the root path with the unique file name
            string filePath = Path.Combine(rootPath, uniqueFileName);

            // Save the file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the relative URL to access the file
            return $"/Uploads/{uniqueFileName}";
        }
    }

}
