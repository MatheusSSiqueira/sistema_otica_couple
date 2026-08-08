using Asp.Versioning;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OticaCouple.Api.Contracts.Common;
using OticaCouple.Api.Contracts.Products;

namespace OticaCouple.Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("api/[controller]")]
public sealed class ProductsController : ControllerBase
{
    private const int MaxPageSize = 100;
    private readonly ILogger<ProductsController> _logger;

    private static readonly IReadOnlyCollection<ProductListItemResponse> ProductsSeed =
    [
        new() { Id = Guid.Parse("8ec2e0c4-9726-4ea7-9b08-6417055c35c5"), Sku = "ARM-001", Name = "Armacao Titanium Prime", Category = "Frames", Price = 599.90m, IsActive = true },
        new() { Id = Guid.Parse("deaf4f22-c8ad-4595-9334-2744f2aa6e8d"), Sku = "LEN-002", Name = "Lente Blue Light Comfort", Category = "Lenses", Price = 249.50m, IsActive = true },
        new() { Id = Guid.Parse("ff4f3b15-2fbe-4ccf-8ff3-3959e4f4aa1d"), Sku = "SUN-003", Name = "Oculos Solar Classic", Category = "Sunglasses", Price = 329.00m, IsActive = false },
        new() { Id = Guid.Parse("1a1f7b84-5cbc-47c5-95ff-0aa45f07d95d"), Sku = "ACC-004", Name = "Kit Limpeza Premium", Category = "Accessories", Price = 79.90m, IsActive = true }
    ];

    public ProductsController(ILogger<ProductsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(typeof(PagedResponse<ProductListItemResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public ActionResult<PagedResponse<ProductListItemResponse>> Get([FromQuery] ProductListQuery query)
    {
        if (query.Page <= 0 || query.PageSize <= 0 || query.PageSize > MaxPageSize)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Invalid pagination parameters.",
                Detail = $"Page must be >= 1 and PageSize must be between 1 and {MaxPageSize}.",
                Status = StatusCodes.Status400BadRequest,
                Instance = HttpContext.Request.Path
            });
        }

        _logger.LogInformation(
            "Listing products with filters: Search={Search}, Category={Category}, ActiveOnly={ActiveOnly}, Page={Page}, PageSize={PageSize}",
            query.Search,
            query.Category,
            query.ActiveOnly,
            query.Page,
            query.PageSize);

        IEnumerable<ProductListItemResponse> filtered = ProductsSeed;

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            filtered = filtered.Where(product =>
                product.Name.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                product.Sku.Contains(query.Search, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(query.Category))
        {
            filtered = filtered.Where(product =>
                product.Category.Equals(query.Category, StringComparison.OrdinalIgnoreCase));
        }

        if (query.ActiveOnly.HasValue)
        {
            filtered = filtered.Where(product => product.IsActive == query.ActiveOnly.Value);
        }

        var totalCount = filtered.Count();
        var items = filtered
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToArray();

        return Ok(new PagedResponse<ProductListItemResponse>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        });
    }
}
