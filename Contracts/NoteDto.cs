namespace TaskTracker.Contracts;

public record NoteDto(Guid id, string Title, string Description, DateTime CreatedAt);