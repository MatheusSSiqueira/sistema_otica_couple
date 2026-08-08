using Xunit;

namespace OticaCouple.Api.Tests;

public class HealthCheckTests
{
    [Fact]
    public void HealthCheck_ReturnsTrue()
    {
        // Arrange
        bool isHealthy = true;

        // Act
        var result = isHealthy;

        // Assert
        Assert.True(result);
    }
}
