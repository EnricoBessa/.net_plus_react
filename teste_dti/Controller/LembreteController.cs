// ItemsController.cs
using Microsoft.AspNetCore.Mvc;
using teste_dti.Data;

namespace teste_dti.Controllers
{
  [ApiController]
  [Route("api/lembrete")]
  public class ItemsController : ControllerBase
  {
    private readonly DataContext _context;

    public ItemsController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var items = _context.Lembretes.ToList();
      return Ok(items);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var item = _context.Lembretes.Find(id);
      if (item == null)
        return NotFound();

      return Ok(item);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Lembrete item)
    {
      _context.Lembretes.Add(item);
      _context.SaveChanges();
      return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var item = _context.Lembretes.Find(id);
      if (item == null)
        return NotFound();

      _context.Lembretes.Remove(item);
      _context.SaveChanges();
      return NoContent();
    }
  }
}