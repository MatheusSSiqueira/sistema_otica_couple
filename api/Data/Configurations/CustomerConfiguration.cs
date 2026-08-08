using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OticaCouple.Api.Domain.Entities;

namespace OticaCouple.Api.Data.Configurations;

public sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("Customers");

        builder.HasKey(customer => customer.Id);

        builder.HasIndex(customer => customer.Email)
            .IsUnique();

        builder.HasIndex(customer => customer.CPF)
            .IsUnique();

        builder.Property(customer => customer.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(customer => customer.Email)
            .IsRequired()
            .HasMaxLength(254);

        builder.Property(customer => customer.Phone)
            .HasMaxLength(20);

        builder.Property(customer => customer.CPF)
            .IsRequired()
            .HasColumnType("char(11)");

        builder.Property(customer => customer.BirthDate)
            .HasColumnType("date");

        builder.Property(customer => customer.LoyaltyPoints)
            .HasDefaultValue(0);

        builder.Property(customer => customer.PrescriptionNotes)
            .HasMaxLength(2000);
    }
}
