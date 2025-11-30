import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createView = mutation({
  args: {
    propertyId: v.id("Real_Estate"),
    propertyTitle: v.string(),
    userEmail: v.string(),
    userName: v.string(),
    userPhone: v.optional(v.string()),
    viewDate: v.string(),
    viewTime: v.string(),
    message: v.optional(v.string()),
    createAt: v.number(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const viewId = await ctx.db.insert("PropertyView", {
      ...args,
      createAt: Date.now(),
    });
    return viewId;
  },
});
