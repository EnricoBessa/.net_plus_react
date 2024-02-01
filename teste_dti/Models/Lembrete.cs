using System.ComponentModel.DataAnnotations;

namespace teste_dti
{
    public class Lembrete
    {
        [Key]
        public int Id { get; set; }
        public required string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}