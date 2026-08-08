using OticaCouple.Api.Domain.Enums;

namespace OticaCouple.Api.Domain.Entities;

public sealed class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public bool IsActive { get; set; }
}