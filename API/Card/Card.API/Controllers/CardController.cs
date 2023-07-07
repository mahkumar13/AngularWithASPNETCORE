using Card.API.Data;
using Card.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Card.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly CardDbContext _context;
        public CardController(CardDbContext cardDbContext)
        {
            _context = cardDbContext;  
        }
        [HttpGet]
        public IActionResult GetAllCards()
        {
            var card= _context.Cards.ToList();
            return Ok(card);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetCard")]
        public IActionResult GetCard([FromRoute] Guid id)
        {
            var card= _context.Cards.FirstOrDefault(x => x.Id==id);
            if (card != null)
            {
                return Ok(card);
            }
            return NotFound("card not found");
        }
        [HttpPost]
        public IActionResult AddCard([FromBody] CardModel card)
        {
            card.Id=Guid.NewGuid();
            _context.Cards.Add(card);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetCard), new {id=card.Id }, card);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateCard([FromRoute] Guid id, [FromBody] CardModel card)
        {
            var existingCard = _context.Cards.FirstOrDefault(x => x.Id == id);
            if(existingCard != null)
            {
                existingCard.CardHolderName = card.CardHolderName;
                existingCard.CardNumber = card.CardNumber;
                existingCard.ExpiryMonth= card.ExpiryMonth;
                existingCard.ExpirtYear= card.ExpirtYear;
                existingCard.CVC= card.CVC;
                _context.SaveChanges();
                return Ok(existingCard);
            }
            return NotFound("cannot find card");
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteCard([FromRoute] Guid id)
        {
            var existingCard = _context.Cards.FirstOrDefault(x => x.Id == id);
            if(existingCard != null)
            {
                _context.Remove(existingCard);
                _context.SaveChanges();
                return Ok(existingCard);
            }
            return NotFound("cannot find");
        }
    }
}
