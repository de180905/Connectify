using CG.Web.MegaApiClient;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Text.RegularExpressions;

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
                    uploadParams = new RawUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        Folder = folderName, // Set the folder to "Connectify"
                    };
                }
                var uploadResult = await _cloudinary.UploadLargeAsync(uploadParams);
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
        public string ExtractPublicIdFromUrl(string url)
        {
            // This pattern will extract everything between "/upload/" and the file extension
            var regex = new Regex(@"\/upload\/(?:v\d+\/)?(.+?)(\.[a-zA-Z]+)?$");
            var match = regex.Match(url);

            if (match.Success)
            {
                return match.Groups[1].Value; // Return the publicId
            }
            throw new ArgumentException("Invalid Cloudinary URL format");
        }
        public ResourceType GetResourceTypeFromUrl(string url)
        {
            // Validate the input URL
            if (string.IsNullOrEmpty(url))
            {
                throw new ArgumentException("URL cannot be null or empty.", nameof(url));
            }

            // Create a Uri instance to handle the URL
            Uri uri = new Uri(url);
            string path = uri.AbsolutePath; // Get the path of the URL

            // Determine the file type based on the path
            if (path.Contains("/image/"))
            {
                return ResourceType.Image; // Identifies as an image
            }
            else if (path.Contains("/video/"))
            {
                return ResourceType.Video; // Identifies as a video
            }
            else
            {
                return ResourceType.Raw; // Identifies as a raw file
            }
        }
        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            // Extract the publicId from the provided URL
            string publicId = ExtractPublicIdFromUrl(fileUrl);
            
            // Use the publicId to delete the file
            var deletionParams = new DeletionParams(publicId)
            {
                ResourceType = GetResourceTypeFromUrl(fileUrl) // Use ResourceType.Raw for generic files, or set the appropriate type (e.g., ResourceType.Image)
            };

            var result = await _cloudinary.DestroyAsync(deletionParams);

            // Return true if the file was successfully deleted
            return result.Result == "ok";
        }
        public async Task<List<bool>> DeleteFilesAsync(List<string> fileUrls)
        {
            var deleteTasks = new List<Task<bool>>();

            foreach (var url in fileUrls)
            {
                deleteTasks.Add(DeleteFileAsync(url));
            }

            // Wait for all deletions to complete
            var deletionResults = await Task.WhenAll(deleteTasks);

            // Return a list of boolean values indicating success for each deletion
            return deletionResults.ToList();
        }


    }

}
