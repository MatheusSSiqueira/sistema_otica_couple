using OticaCouple.Api.Middleware;

namespace OticaCouple.Api.Extensions;

public static class GlobalExceptionHandlingApplicationBuilderExtensions
{
    public static IApplicationBuilder UseGlobalExceptionHandling(this IApplicationBuilder app)
    {
        return app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
    }
}
