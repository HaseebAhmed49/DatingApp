using System;
namespace DatingApp.API.DTOs
{
    public class PhotoForCreationDTO
    {
        public string? Url { get; set; }

        public IFormFile File { get; set; }

        public string? description { get; set; }

        public DateTime? dateAdded { get; set; }

        public string? PublicId { get; set; }

        public PhotoForCreationDTO()
        {
            dateAdded = DateTime.Now;
        }
    }
}

