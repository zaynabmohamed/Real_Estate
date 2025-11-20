import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
     users:defineTable({
           name :v.string(),
           email:v.string(),
           userId:v.string(),
     })
     .index("by_user_id",["userId"])
     .index("by_email", ["email"]),
     Real_Estate:defineTable({
        title:v.string(),
        description:v.string(),
        price:v.number(),
        bedrooms:v.number(),
        bathrooms:v.number(),
        area:v.float64(),
        address:v.string(),
        city:v.string(),
        state:v.string(),
        zipCode:v.string(),
        propertyType:v.union(
            v.literal("house"),
            v.literal("apartment"),
            v.literal("condo"),
            v.literal("townhouse"),
        ),
        status:v.union(
             v.literal("for-sale"),
             v.literal("for-rent"),
             v.literal("sold"),
             v.literal("rented"),
        ),
        images:v.array(v.string()), // cloudinary Urls
        featured:v.optional(v.boolean()),
     }),
})