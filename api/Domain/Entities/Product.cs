namespace OticaCouple.Api.Domain.Entities;

public sealed class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string SKU { get; set; } = string.Empty;

    public decimal SalePrice { get; set; }

    public decimal CostPrice { get; set; }

    public int StockQuantity { get; set; }

    public int MinStockAlert { get; set; }

    public Guid CategoryId { get; set; }

    public Category? Category { get; set; }

    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; }

    public bool IsLowStock => StockQuantity <= MinStockAlert;

    public void IncreaseStock(int quantity)
    {
        if (quantity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
        }

        StockQuantity += quantity;
    }

    public void DecreaseStock(int quantity)
    {
        if (quantity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
        }

        if (quantity > StockQuantity)
        {
            throw new InvalidOperationException("Insufficient stock for the requested quantity.");
        }

        StockQuantity -= quantity;
    }
}
