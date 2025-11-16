namespace TaskTracker.Contracts;

public record NoteDto(Guid id, string Title, string Description, DateTime CreatedAt, DateTime? DueDate, bool IsCompleted);