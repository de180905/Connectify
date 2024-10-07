namespace Connectify.Server.Utils
{
    public class TextHelper
    {
        public static string ShrinkText(string text, int maxLength)
        {
            // Check if the text needs to be truncated
            if (string.IsNullOrEmpty(text) || text.Length <= maxLength)
            {
                return text; // No need to shrink, return original text
            }

            // Truncate and add ellipsis
            return text.Substring(0, maxLength) + "...";
        }

    }
}
