using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OticaCouple.Api.Domain.Entities;

namespace OticaCouple.Api.Data.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(product => product.Id);

        builder.HasIndex(product => product.SKU)
            .IsUnique();

        builder.Property(product => product.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(product => product.Description)
            .HasMaxLength(1000);

        builder.Property(product => product.SKU)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(product => product.SalePrice)
            .HasPrecision(18, 2);

        builder.Property(product => product.CostPrice)
            .HasPrecision(18, 2);

        builder.Property(product => product.ImageUrl)
            .HasMaxLength(500);

        builder.Property(product => product.IsActive)
            .HasDefaultValue(true);

        builder.HasOne(product => product.Category)
            .WithMany(category => category.Products)
            .HasForeignKey(product => product.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
