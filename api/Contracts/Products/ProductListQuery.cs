namespace OticaCouple.Api.Contracts.Products;

public sealed class ProductListQuery
{
    public string? Search { get; init; }

    public string? Category { get; init; }

    public bool? ActiveOnly { get; init; }

    public int Page { get; init; } = 1;

    public int PageSize { get; init; } = 20;
}
