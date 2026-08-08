using OticaCouple.Api.Domain.Enums;

namespace OticaCouple.Api.Domain.Entities;

public sealed class Sale : BaseEntity
{
    public Guid? CustomerId { get; set; }

    public Customer? Customer { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal DiscountAmount { get; set; }

    public PaymentMethod PaymentMethod { get; set; }

    public SaleStatus Status { get; set; }

    public ICollection<SaleItem> SaleItems { get; set; } = new List<SaleItem>();
}
