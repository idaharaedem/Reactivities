using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
     
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

       public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        public DbSet <Photo> Photos { get; set; }

        public DbSet<Comments> Comments { get; set; }

        //getting the user followings directly rather than going through a navigation property
        public DbSet<UserFollowing> Followings { get; set; }


    //configuring entities as your database is being created
       protected override void OnModelCreating(ModelBuilder builder) 
       {
           base.OnModelCreating(builder);

           builder.Entity<Value>()
            .HasData(
                new Value {Id = 1, Name = "Value 101"},
                 new Value {Id = 2, Name = "Value 102"},
                  new Value {Id = 3, Name = "Value 103"}
            );

            builder.Entity<UserActivity>(x => x.HasKey(u => new {u.AppUserId, u.ActivityId}));

            builder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.UserActivities)
            .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserActivity>()
            .HasOne(a => a.Activity)
            .WithMany(u => u.UserActivities)
            .HasForeignKey(a => a.ActivityId);

            builder.Entity<UserFollowing>(b => 
            {
                b.HasKey(k => new {k.ObserverId, k.TargetId});
                b.HasOne(o => o.Observer)
                .WithMany(f => f.Following)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(t => t.TargetId)
                .OnDelete(DeleteBehavior.Restrict);
            });

       }  

    }
}
