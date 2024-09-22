namespace Connectify.Server.Services.Exceptions
{
    public class EmailNotVerifiedException : Exception
    {
        // Parameterless constructor
        public EmailNotVerifiedException()
            : base("Email is not verified.")
        {
        }

        // Constructor that accepts a custom message
        public EmailNotVerifiedException(string message)
            : base(message)
        {
        }

        // Constructor that accepts a custom message and an inner exception
        public EmailNotVerifiedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }

}
