namespace OticaCouple.Api.Domain.Entities;

public sealed class Customer : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public string CPF { get; set; } = string.Empty;

    public DateOnly BirthDate { get; set; }

    public int LoyaltyPoints { get; set; }

    public string? PrescriptionNotes { get; set; }
}
