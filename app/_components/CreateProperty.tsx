"use client"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { CreatePropertyType } from "../Types/Type"
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
 interface PropertyType{
   intialData?: Partial<CreatePropertyType>   // Partial في حاله القيم كانت اختياري وليست اجباري بنضيفها
   isEditing?:boolean;
   propertyId?:string,
 }
export default function CreateProperty({intialData,isEditing=false , propertyId}:PropertyType) {
   const router = useRouter()
   const [ isUploading , setIsUploading] = useState(false)
    const createProperty = useMutation(api.Real_Estate.createProperty)
    const updateProperty = useMutation(api.Real_Estate.updateProperty)
    const [formData , setFormData] = useState({
      title:intialData?.title || "",
      description:intialData?.description||"",
      price:intialData?.price || 0,
      bedrooms:intialData?.bedrooms || 1,
      bathrooms:intialData?.bathrooms || 1,
      area:intialData?.area || 0,
      address:intialData?.address || "",
      city:intialData?.city || "",
      state:intialData?.state || "",
      zipCode:intialData?.zipCode || "",
         propertyType:intialData?.propertyType || "house" ,
         status:intialData?.status || "for-sale",
         images:intialData?.images || [],
         featured:intialData?.featured || false ,
    })
      
    // function handleSubmit
    const handleSubmit = async (e:React.FormEvent)=>{
           e.preventDefault()
           try{
            if(isEditing && propertyId){
              await updateProperty({
                 propertyId:propertyId as any,
                     ...formData
            })
            }else{
              await createProperty(formData as any)
            }
            router.push("/Real-Estate")
           }catch(error){
            console.log("Error saving property" , error)
            alert("Failed to save property . place try again")
           }
    } 
     // function handleInputChange
    const handleInputChange = (
      e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const{name , value} = e.target;
        setFormData(prev=>({
           ...prev,
           [name]:["price" , "bathrooms" , "bedrooms" , "area"].includes(name) ? Number(value) :value,
        }))
      }
      // function handlecheckBoxChange
    const handlecheckBoxChange = (
      e:React.ChangeEvent<HTMLInputElement >)=>{
        const{name ,checked} = e.target;
        setFormData(prev=>({
           ...prev,
           [name]:checked,
        }))
      }
      // function handleImageUpload
   const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;
    if(!files) return ;
    setIsUploading(true);
    const uploadImages : string[] = []
    try{
      for(const file of Array.from(files)){
        const formData = new FormData()
        formData.append("file" , file)
        const response = await fetch("/api/upload" ,
          {method:"POST",
            body:formData,
          }
        )
        if(!response) {
          throw new Error("Upload failed")
        }
        const {url} = await response.json()
        uploadImages.push(url)
      }
      setFormData(prev=>({
        ...prev,
        images:[...prev.images, ...uploadImages]
            }))
    }catch(error){
     console.log(error , "Upload error");
     alert("Failed to upload images . please try again")
    }
    finally{
      setIsUploading(false)
    }
   }
  return (
    <form className="space-y-12" onSubmit={handleSubmit}>
      {/* Basic information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3>Basic Unformation</h3>
        <div className="grid grid-col-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="text" name="title" value={formData?.title} onChange={handleInputChange} required/>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea className="w-full p-3 border border-gray-300 rounded"  name="description" value={formData?.description} onChange={handleInputChange} required></textarea>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="number" name="price" value={formData?.price} onChange={handleInputChange} required/>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="number" name="area" value={formData?.area} onChange={handleInputChange} required/>
        </div>
        </div>
        </div>
       {/* property Details */}
  <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3>Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Bedroom */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
           <select name="bedrooms" value={formData?.bedrooms} className="w-full p-3 border border-gray-300 rounded" onChange={handleInputChange} required >
              {[1,2,3,4,5,6].map((n)=>(
                <option key={n} value={n}>{n}</option>
              ))}
           </select>
            </div>
            {/* bathroom */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
           <select name="bathrooms" value={formData?.bathrooms} className="w-full p-3 border border-gray-300 rounded" onChange={handleInputChange} required >
              {[1,2,3,4,5,6].map((n)=>(
                <option key={n} value={n}>{n}</option>
              ))}
           </select>
            </div>
            {/* property Type */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
           <select name="propertyType" value={formData?.propertyType} className="w-full p-3 border border-gray-300 rounded" onChange={handleInputChange} required >
             <option value="house">House</option>
             <option value="apartment">Apartment</option>
             <option value="condo">condo</option>
             <option value="townhouse">Townhouse</option>
           </select>
            </div>
            {/* status */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
           <select name="status" value={formData?.status} className="w-full p-3 border border-gray-300 rounded" onChange={handleInputChange} required >
             <option value="for-sale">for-sale</option>
             <option value="for-rent">For-Rent</option>
             <option value="sold">sold</option>
             <option value="rented">Rented</option>
           </select>
            </div>
          {/* featured Property */}
          <div>
          <label className="block">Featured Property *</label>
          <div className="flex items-center">
          <input className="w-full p-3 border border-gray-300 rounded " type="checkbox" name="featured" checked={formData?.featured}  onChange={handlecheckBoxChange} required/>
          <span className="ml-1 text-sm text-gray-700"> Mark as featured property</span>
          </div>
          </div>
    </div>
        {/* Address */}
          <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="text" name="address" value={formData?.address} onChange={handleInputChange} required/>
        </div>
        {/* city*/}
          <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="text" name="city" value={formData?.city} onChange={handleInputChange} required/>
        </div>
        {/* state */}
          <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="text" name="state" value={formData?.state} onChange={handleInputChange} required/>
        </div>
        {/* zipCode */}
          <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">ZipCode *</label>
          <input className="w-full p-3 border border-gray-300 rounded" type="text" name="zipCode" value={formData?.zipCode} onChange={handleInputChange} required/>
        </div>
        </div>
         {/* upload button */}
         <label>
         <div className="mb-4">
       <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 cursor-pointer"/>
        {isUploading? "Uploading..." : "click to upload images "}
       </div>
       <input type="file" name="images" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading}/>
         </div>
          </label>
          {/* images preview  this is chooses*/} 
          {formData?.images.length > 0  && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData?.images?.map((imageUrl , index)=>(
                <div key={index}>
                <Image src={imageUrl} alt="images" height={200} width={150} />
                </div>
              ))}</div>
          )}
         {/* Submit Button */}
         <Button type="submit">{isEditing ? "Update Property" : "Create Property"}</Button>
    </form>

  )
}
