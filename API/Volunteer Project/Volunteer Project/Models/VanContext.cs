using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Volunteer_Project.Models;

public partial class VanContext : DbContext
{
    public VanContext()
    {
    }

    public VanContext(DbContextOptions<VanContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Disaster> Disasters { get; set; }

    public virtual DbSet<DisasterNeed> DisasterNeeds { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<RequestDetail> RequestDetails { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<VolunteerDetail> VolunteerDetails { get; set; }

    public virtual DbSet<VolunteerMapping> VolunteerMappings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KANINI-LTP-949;Database=VAN;User Id=sa;Password=8973991766sg@SG;Encrypt=False;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Indic_General_90_CI_AS_SC_UTF8");

        modelBuilder.Entity<Disaster>(entity =>
        {
            entity.HasKey(e => e.DisasterId).HasName("PK__Disaster__B487740ED3429CFF");
        });

        modelBuilder.Entity<DisasterNeed>(entity =>
        {
            entity.HasKey(e => e.DonationItemId).HasName("PK__Disaster__4F1A477F62364981");

            entity.Property(e => e.DonationItemId).HasColumnName("Donation_Item_id");
            entity.Property(e => e.Items).IsUnicode(false);
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Request__E9C0AF0B6D653902");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId).HasColumnName("Request_id");
            entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Disaster).WithMany(p => p.Requests)
                .HasForeignKey(d => d.DisasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__Disaste__59FA5E80");

            entity.HasOne(d => d.User).WithMany(p => p.Requests)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Request__UserID__59063A47");
        });

        modelBuilder.Entity<RequestDetail>(entity =>
        {
            entity.HasKey(e => e.RequestDetailId).HasName("PK__RequestD__DF6CA46BB294A31A");

            entity.Property(e => e.RequestDetailId).HasColumnName("Request_DetailId");
            entity.Property(e => e.DonationItemId).HasColumnName("Donation_Item_id");
            entity.Property(e => e.RequestId).HasColumnName("Request_id");

            entity.HasOne(d => d.DonationItem).WithMany(p => p.RequestDetails)
                .HasForeignKey(d => d.DonationItemId)
                .HasConstraintName("FK__RequestDe__Donat__5BE2A6F2");

            entity.HasOne(d => d.Request).WithMany(p => p.RequestDetails)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK__RequestDe__Reque__5AEE82B9");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCACCB14719C");

            entity.ToTable("User");

            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<VolunteerDetail>(entity =>
        {
            entity.HasKey(e => e.VolunteerId).HasName("PK__Voluntee__716F6F2C7E7CC46E");

            entity.HasIndex(e => e.EmailId, "UQ__Voluntee__7ED91ACE10CE63D9").IsUnique();

            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.PhoneNo)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.VolunteerName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VolunteerMapping>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Voluntee__3214EC07839EA710");

            entity.ToTable("VolunteerMapping");

            entity.Property(e => e.DonationItemId).HasColumnName("Donation_Item_id");
            entity.Property(e => e.RequestId).HasColumnName("Request_id");

            entity.HasOne(d => d.DonationItem).WithMany(p => p.VolunteerMappings)
                .HasForeignKey(d => d.DonationItemId)
                .HasConstraintName("FK__Volunteer__Donat__5EBF139D");

            entity.HasOne(d => d.Request).WithMany(p => p.VolunteerMappings)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK__Volunteer__Reque__5CD6CB2B");

            entity.HasOne(d => d.Volunteer).WithMany(p => p.VolunteerMappings)
                .HasForeignKey(d => d.VolunteerId)
                .HasConstraintName("FK__Volunteer__Volun__5DCAEF64");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
