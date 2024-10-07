using CG.Web.MegaApiClient;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Connectify.Server.Services.Implement
{
    public class CloudStorageService : ICloudStorageService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly Cloudinary _cloudinary;
        public CloudStorageService(IWebHostEnvironment environment)
        {
            _environment = environment;
            var account = new Account
            {
                Cloud = "dj7lju0cn",
                ApiKey = "693831133761823",
                ApiSecret = "UWlV5YimpTzAn4GV-WlPMX5zQjo"
            };
            _cloudinary = new Cloudinary(account);
        }
        public async Task<string> UploadFileAsync(IFormFile file)
        {
            if (file.Length <= 0)
            {
                throw new ArgumentException("file length must be greater than 0");
            }
            var fileType = file.ContentType;

            using (var stream = file.OpenReadStream())
            {
                RawUploadParams uploadParams;
                // Specify the folder name
                const string folderName = "Connectify";

                if (fileType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
                {
                    uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Folder = folderName, // Set the folder to "Connectify"
                    };
                }
                else if (fileType.StartsWith("video/", StringComparison.OrdinalIgnoreCase))
                {
                    uploadParams = new VideoUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Folder = folderName, // Set the folder to "Connectify"
                    };
                }
                else
                {
                    uploadParams = new RawUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Folder = folderName, // Set the folder to "Connectify"
                    };
                }
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                return uploadResult.Url.ToString(); // Return the URL of the uploaded image
            }
        }
        public async Task<List<string>> UploadFilesAsync(List<IFormFile> files)
        {
            var uploadTasks = new List<Task<string>>();

            foreach (var file in files)
            {
                uploadTasks.Add(UploadFileAsync(file));
            }

            // Wait for all uploads to complete
            var uploadResults = await Task.WhenAll(uploadTasks);

            // Return a list of uploaded file URLs
            return uploadResults.ToList();
        }

    }

}
