using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using TaskTracker.Contracts;
using TaskTracker.DataAccess;
using TaskTracker.Models;


namespace TaskTracker.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;
    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet] 
    public async Task<ActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                n.Title.ToLower().Contains(request.Search.ToLower()));

        if (request.SortOrder == "desc")
        {
            notesQuery = notesQuery.OrderByDescending(GetSelectorKey(request.SortItem?.ToLower()));
        }
        else
        {
            notesQuery = notesQuery.OrderBy(GetSelectorKey(request.SortItem?.ToLower()));
        }

        var noteDots = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(ct);

        return Ok(new GetNotesResponse(noteDots));
    }

    private Expression<Func<Note, object>> GetSelectorKey(string sortItem)
    {
        switch (sortItem)
        {
            case "date":
                return note => note.CreatedAt;
            case "title":
                return note => note.Title;
            default:
                return note => note.Id;
            
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(Guid id, [FromBody] TaskTracker.Contracts.UpdateNoteRequest request, CancellationToken ct)
    {
        var existingNote = await _dbContext.Notes.FindAsync(new object[] {id}, ct);
        if (existingNote == null)
        {
            return NotFound();
        }

        existingNote.Update(request.Title, request.Description);

        _dbContext.Notes.Update(existingNote);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(Guid id, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync(new object[] {id}, ct);
        if (note == null)
        {
            return NotFound();
        }

        _dbContext.Notes.Remove(note);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }
}