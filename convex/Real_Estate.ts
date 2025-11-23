  

  // get all Real_Estate with optional filters

import {  v } from "convex/values";
import { mutation, query } from "./_generated/server";
    // get All Real_Estate 
 export const getRealEstate = query({
  args: {
    propertyType: v.optional(v.string()),
    status: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    bedrooms: v.optional(v.string()),
    bathrooms: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let Real_Estate = await ctx.db.query("Real_Estate").collect();

    if (args.propertyType && args.propertyType !== "all") {
      Real_Estate = Real_Estate.filter(p => p.propertyType === args.propertyType);
    }

    if (args.status && args.status !== "all") {
      Real_Estate = Real_Estate.filter(p => p.status === args.status);
    }

    if (args.minPrice) {
      Real_Estate = Real_Estate.filter(p => Number(p.price) <= args.minPrice);
    }

    if (args.maxPrice) {
      Real_Estate = Real_Estate.filter(p => Number(p.price) >= args.maxPrice!);
    }

    if (args.bedrooms ) {
      Real_Estate = Real_Estate.filter(p => p.bedrooms >= args.bedrooms);
    }

    if (args.bathrooms ) {
      Real_Estate = Real_Estate.filter(p => p.bathrooms >= args.bathrooms);
    }

    return Real_Estate.sort((a, b) => b._creationTime - a._creationTime);
  }
});

 // get a single property by ID 
  export const getProperty = query({ // query بتعبر عن عملية قراءة البيانات فقط 
    args:{id:v.id("Real_Estate")},
    handler:async(ctx , args)=>{
      return await ctx.db.get(args.id);
    }
        })
// create a new property 
   export const createProperty = mutation({  // muttion تعبر عن عملية ارسال البيانات
          args:{
             title:v.string(),
                    description:v.string(),
                    price:v.number(),
                    bedrooms:v.number(),
                    bathrooms:v.number(),
                    area:v.number(),
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
          },
          handler: async(ctx , args)=>{
            const propertyId = await ctx.db.insert("Real_Estate", {
              title:args.title,
              description:args.description,
              price:args.price,
              bedrooms:args.bedrooms,
              bathrooms:args.bathrooms,
              area : args.area,
              address:args.address,
              city:args.city,
              state:args.state,
              zipCode:args.zipCode,
              propertyType:args.propertyType,
              status:args.status,
              images:args.images,
              featured:args.featured ||false,
            })
            return propertyId
          }
        })
// update property 
 export const updateProperty = mutation({  // muttion تعبر عن عملية ارسال البيانات
          args:{
            id:v.id("Real_Estate"),
             title:v.string(),
                    description:v.string(),
                    price:v.number(),
                    bedrooms:v.number(),
                    bathrooms:v.number(),
                    area:v.number(),
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
          },
          handler: async(ctx , args)=>{
           const {id, ... updates}  = args;
           await ctx.db.patch(id, updates)
            }
          }
         )
// Delete  a property 
export const deleteProperty =  mutation({
  args:{id: v.id("Real_Estate")},
  handler:async(ctx , args)=>{
     await ctx.db.delete(args.id) 
  }
})
// get feature property 
export const  getFeature = query({
  args:{},
  handler:async(ctx) =>{
    return await ctx.db.query("Real_Estate").filter((q)=>q.eq(q.field("featured"), true)).collect()
  }
})

// db.replace => method will replace the existing document entirely
// insert => create new documents in the database
// db.delete => delete from the table 
// db.get =>  can read its data
// eq => ===
        