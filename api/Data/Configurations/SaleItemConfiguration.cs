using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OticaCouple.Api.Domain.Entities;

namespace OticaCouple.Api.Data.Configurations;

public sealed class SaleItemConfiguration : IEntityTypeConfiguration<SaleItem>
{
    public void Configure(EntityTypeBuilder<SaleItem> builder)
    {
        builder.ToTable("SaleItems");

        builder.HasKey(saleItem => saleItem.Id);

        builder.Property(saleItem => saleItem.Quantity)
            .IsRequired();

        builder.Property(saleItem => saleItem.UnitPrice)
            .HasPrecision(18, 2);

        builder.Property(saleItem => saleItem.Discount)
            .HasPrecision(18, 2)
            .HasDefaultValue(0m);

        builder.HasOne(saleItem => saleItem.Product)
            .WithMany()
            .HasForeignKey(saleItem => saleItem.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
