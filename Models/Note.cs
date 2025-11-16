namespace TaskTracker.Models;

public class Note
{
    public Note(string title, string description)
    {
        Title = title;
        Description = description;
        CreatedAt = DateTime.UtcNow;
        IsCompleted = false;
    }
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DueDate {get; set;}

    public bool IsCompleted {get; set;}

    public void MarkAsCompleted()
    {
        IsCompleted = true;
    }

    public void MarkAsIncomplete()
    {
        IsCompleted = false;
    }

    public void SetDueDate(DateTime? dueDate)
    {
        DueDate = dueDate;
    }
    public void UpdateTitle(string newTitle)
    {
        Title = newTitle;
    }

    public void UpdateDescription(string newDescription)
    {
        Description = newDescription ?? string.Empty;
    }

    public void Update(string title, string description, DateTime? dueDate)
    {
        UpdateTitle(title);
        UpdateDescription(description);
        SetDueDate(dueDate);
    }
}