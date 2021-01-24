using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities.Models
{
    public partial class user_managementContext : DbContext
    {
        public user_managementContext()
        {
        }

        public user_managementContext(DbContextOptions<user_managementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CrgCompanies> CrgCompanies { get; set; }
        public virtual DbSet<CrsGroups> CrsGroups { get; set; }
        public virtual DbSet<CrsUsers> CrsUsers { get; set; }
        public virtual DbSet<CrsUsersGroups> CrsUsersGroups { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseMySql("server=localhost;database=user_management;user=root;password=Eska123", x => x.ServerVersion("8.0.19-mysql"));
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CrgCompanies>(entity =>
            {
                entity.HasKey(e => e.CompanyId)
                    .HasName("PRIMARY");

                entity.ToTable("crg_companies");

                entity.HasIndex(e => e.Name)
                    .HasName("name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            modelBuilder.Entity<CrsGroups>(entity =>
            {
                entity.HasKey(e => e.GroupId)
                    .HasName("PRIMARY");

                entity.ToTable("crs_groups");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("groups_companies_FK_idx");

                entity.HasIndex(e => e.Name)
                    .HasName("name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CrsGroups)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("groups_companies_FK");
            });

            modelBuilder.Entity<CrsUsers>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("crs_users");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("users_companies_FK_idx");

                entity.HasIndex(e => e.Email)
                    .HasName("email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Birthdate)
                    .HasColumnName("birthdate")
                    .HasColumnType("datetime");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.IsAdmin).HasColumnName("is_admin");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.PasswordCreationDate)
                    .HasColumnName("password_creation_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.PasswordExpiryDate)
                    .HasColumnName("password_expiry_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnName("phone_number")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.SystemUser).HasColumnName("system_user");

                entity.Property(e => e.UserStatus).HasColumnName("user_status");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CrsUsers)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("users_companies_FK");
            });

            modelBuilder.Entity<CrsUsersGroups>(entity =>
            {
                entity.HasKey(e => e.UsersGroupsId)
                    .HasName("PRIMARY");

                entity.ToTable("crs_users_groups");

                entity.HasIndex(e => e.GroupId)
                    .HasName("usersgroups_groups_FK_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("usersgroups_users_FK_idx");

                entity.Property(e => e.UsersGroupsId).HasColumnName("users_groups_id");

                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.CrsUsersGroups)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("usersgroups_groups_FK");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CrsUsersGroups)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("usersgroups_users_FK");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
