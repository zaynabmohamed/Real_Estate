import {v2 as cloudinary} from "cloudinary"
import { NextRequest, NextResponse } from "next/server"
cloudinary.config({

     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
     api_key:process.env.CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request:NextRequest){
     try{
        const FormData = await request.formData()
        const file = FormData.get("file") as File 

        if(!file){
            return NextResponse.json({error:"No file provider"},{status:400})
        }
   // convert file to buffer
   const bytes = await file.arrayBuffer()
   const buffer = Buffer.from(bytes)
   // upload to cloudinary
   const result = await new Promise((resolve , reject)=>{
    cloudinary.uploader.upload_stream({
        resource_type:"auto",
        folder:"real-estate",
    transformation:[
        {width:800 , height:600 , crop:"fill" , quality:"auto"}
    ]
   },
   (error, result)=>{
    if(error)reject(error);
    else resolve(result)
   }
).end(buffer)
   })
   return NextResponse.json({url:(result as any).secure_url})
     }catch(error){
console.log(error , "upload error")
return NextResponse.json({error:"upload failed"},
    {status :500},
)
     }
    
}