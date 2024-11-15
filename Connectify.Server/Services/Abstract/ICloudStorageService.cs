namespace Connectify.Server.Services
{
    public interface ICloudStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<List<string>> UploadFilesAsync(List<IFormFile> files);
        Task<List<bool>> DeleteFilesAsync(List<string> fileUrls);
        Task<bool> DeleteFileAsync(string fileUrl);
    }
}
