namespace TaskTracker.Contracts;

public record CreateNoteRequest(string Title, string Description, DateTime? DueDate = null);