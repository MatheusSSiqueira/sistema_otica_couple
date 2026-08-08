namespace OticaCouple.Api.Domain.Enums;

public enum UserRole
{
    Admin = 1,
    Manager = 2,
    Cashier = 3
}

public enum PaymentMethod
{
    Cash = 1,
    Card = 2,
    Pix = 3,
    Mixed = 4
}

public enum SaleStatus
{
    Open = 1,
    Completed = 2,
    Cancelled = 3
}
