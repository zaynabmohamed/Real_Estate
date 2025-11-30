import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
      });
      return existingUser._id;
    }

    // Create new user if not found
    const newUser = await ctx.db.insert("users", {
      userId: args.userId,
      name: args.name,
      email: args.email,
    });

    return newUser;
  },
});
