namespace TaskTracker.Contracts;

public record UpdateNoteRequest(string? Title, string? Description, DateTime? DueDate, bool IsCompleted);