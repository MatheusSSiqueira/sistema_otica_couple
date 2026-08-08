using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Mvc;

namespace OticaCouple.Api.Extensions;

public static class ApplicationServiceCollectionExtensions
{
    public const string FrontendCorsPolicyName = "Frontend";

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddHealthChecks();
        services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions["traceId"] = context.HttpContext.TraceIdentifier;
                context.ProblemDetails.Extensions["timestamp"] = DateTimeOffset.UtcNow;
            };
        });

        services.AddMemoryCache();
        services.AddHttpContextAccessor();

        services.AddCors(options =>
        {
            options.AddPolicy(FrontendCorsPolicyName, policy =>
            {
                var allowedOrigins = GetAllowedOrigins(configuration);

                policy
                    .WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        services.Configure<IpRateLimitOptions>(options =>
        {
            options.EnableEndpointRateLimiting = true;
            options.StackBlockedRequests = false;
            options.HttpStatusCode = StatusCodes.Status429TooManyRequests;
            options.GeneralRules = new List<RateLimitRule>
            {
                new()
                {
                    Endpoint = "*",
                    Period = "1m",
                    Limit = 100
                }
            };
        });

        services.AddInMemoryRateLimiting();
        services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

        return services;
    }

    private static string[] GetAllowedOrigins(IConfiguration configuration)
    {
        var configuredOrigins = configuration["CORS_ALLOWED_ORIGINS"]
            ?? string.Join(';', configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>());

        if (string.IsNullOrWhiteSpace(configuredOrigins))
        {
            return ["http://localhost:5173"];
        }

        return configuredOrigins
            .Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();
    }
}
