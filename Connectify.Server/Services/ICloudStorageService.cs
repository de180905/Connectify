namespace Connectify.Server.Services
{
    public interface ICloudStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
