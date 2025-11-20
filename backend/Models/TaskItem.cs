using System.Text.Json.Serialization;

namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}