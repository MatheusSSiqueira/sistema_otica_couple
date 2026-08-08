using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OticaCouple.Api.Domain.Entities;
using OticaCouple.Api.Domain.Enums;

namespace OticaCouple.Api.Data.Configurations;

public sealed class SaleConfiguration : IEntityTypeConfiguration<Sale>
{
    public void Configure(EntityTypeBuilder<Sale> builder)
    {
        builder.ToTable("Sales");

        builder.HasKey(sale => sale.Id);

        builder.Property(sale => sale.TotalAmount)
            .HasPrecision(18, 2)
            .HasDefaultValue(0m);

        builder.Property(sale => sale.DiscountAmount)
            .HasPrecision(18, 2)
            .HasDefaultValue(0m);

        builder.Property(sale => sale.PaymentMethod)
            .IsRequired();

        builder.Property(sale => sale.Status)
            .IsRequired()
            .HasDefaultValue(SaleStatus.Open);

        builder.HasOne(sale => sale.Customer)
            .WithMany()
            .HasForeignKey(sale => sale.CustomerId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(sale => sale.User)
            .WithMany()
            .HasForeignKey(sale => sale.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(sale => sale.SaleItems)
            .WithOne(saleItem => saleItem.Sale)
            .HasForeignKey(saleItem => saleItem.SaleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
