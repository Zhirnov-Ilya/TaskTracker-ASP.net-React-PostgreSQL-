namespace TaskTracker.Models;

public class Note
{
    public Note(string title, string description)
    {
        Title = title;
        Description = description;
        CreatedAt = DateTime.UtcNow;
    }
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }

    public void UpdateTitle(string newTitle)
    {
        Title = newTitle;
    }

    public void UpdateDescription(string newDescription)
    {
        Description = newDescription ?? string.Empty;
    }

    public void Update(string title, string description)
    {
        UpdateTitle(title);
        UpdateDescription(description);
    }
}