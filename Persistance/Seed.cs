using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                     new AppUser
                    {
                        Id = "d",
                        DisplayName = "Abigail",
                        UserName = "abigail",
                        Email = "abigail@test.com"
                    },
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Jacob",
                        UserName = "jacob",
                        Email = "jacob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Lewis",
                        UserName = "lewis",
                        Email = "lewis@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "The Dance Off",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Dancing all night long for several hours",
                        Category = "music",
                        City = "Paris",
                        Venue = "Dubliners",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Skate night",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity in the sport ring",
                        Category = "sport",
                        City = "London",
                        Venue = "Wembly Stadium",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(1)
                            },
                            new UserActivity
                            {
                                AppUserId = "d",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Activity gathering",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "gathering together with all our friends",
                        Category = "gathering",
                        City = "UK",
                        Venue = "Loo Stadium",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(2)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(2)
                            },
                             new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Movie Night",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Watching moviies with our favourite friends",
                        Category = "movies",
                        City = "Cape Town",
                        Venue = "West",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(3)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "All night drink fest",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "If youre brave enough to get your drink on then come through",
                        Category = "drinks",
                        City = "Dublin",
                        Venue = "Dublin Museum",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Traveling all over Asia",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Whoever wants to travel and see the world with me. Come through",
                        Category = "travel",
                        City = "Hong Kong",
                        Venue = "Tokyo club",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(5)
                            },
                            
                        }
                    },
                    new Activity
                    {
                        Title = "Hot dog festival night",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Eat as many hotdogs as your heart requires",
                        Category = "food",
                        City = "Bloemfontein",
                        Venue = "O2 Arena",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(6)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Party today tomorrow forever",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Party that goes on until you drop",
                        Category = "party",
                        City = "Holland",
                        Venue = "Holland night club",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(7)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Lets move",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Lets take a stand and move together",
                        Category = "cultural",
                        City = "London",
                        Venue = "Moving center",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                Date = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                Date = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }

        }
    }    
}