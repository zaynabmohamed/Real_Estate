import { Doc } from "@/convex/_generated/dataModel";


export type property = Doc<"Real_Estate">;
 export type propertyType =  "house" | "apartment" | "condo" | "townhouse";
 export type status = "for-sale" | " for-rent" | "sold" | "rented";
  export interface PropertyFilters {
    status?:string ;
    propertyType ?:string;
    minPrice?:number | undefined;
    maxPrice?:number | undefined;
    bedrooms?:number|undefined;
    bathrooms?:number | undefined ;
  }
// Type Create 
export interface CreatePropertyType{
   title: string,
   description:string,
   address:string,
    price:number,
     bedrooms:number,
     bathrooms:number,
     area:number,
     city:string,
     state:string,
     zipCode:string,
     propertyType:string,
     status:string,
     images:string[],
     featured?:boolean,
}