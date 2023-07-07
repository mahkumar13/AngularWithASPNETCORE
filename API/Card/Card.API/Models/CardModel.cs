using System.ComponentModel.DataAnnotations;

namespace Card.API.Models
{
    public class CardModel
    {
        [Key]
        public Guid Id { get; set; }
        public string CardHolderName { get; set; }
        public string CardNumber { get; set; }
        public int ExpiryMonth { get; set; }
        public int ExpirtYear { get; set; }
        public int CVC { get; set; }


    }
}
