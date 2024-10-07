namespace Connectify.Server.Services
{
    public interface ICloudStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<List<string>> UploadFilesAsync(List<IFormFile> files);
    }
}
