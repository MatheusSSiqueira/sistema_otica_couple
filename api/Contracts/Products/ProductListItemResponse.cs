namespace OticaCouple.Api.Contracts.Products;

public sealed class ProductListItemResponse
{
    public required Guid Id { get; init; }

    public required string Sku { get; init; }

    public required string Name { get; init; }

    public required string Category { get; init; }

    public required decimal Price { get; init; }

    public required bool IsActive { get; init; }
}
