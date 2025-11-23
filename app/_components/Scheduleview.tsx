"use client";
import { useUser } from "@clerk/nextjs";
import { Calendar } from "@/components/ui/calendar";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

export default function Scheduleview({property}){

  const [selectTime, setSelectTime] = useState("");
  const { user } = useUser();
  const [phone , setPhone] = useState("")
  const [selectDate , setSelectDate] = useState<Date|undefined>()
  const [message , setMessage] = useState("")
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const createView = useMutation(api.userView.createView);
  const availabletime = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];
  const handleSubmit  = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(!selectDate || !selectTime){
      alert("please select Date and Time 😊")
      return ;
    }
    if(!user){
      alert("please signIn 😊")
      return;
    }
  setSubmit(true)
  try{

    await createView ({
      propertyId:property?._id,
      propertyTitle:property?.title,
      userEmail:user?.emailAddresses?.[0]?.emailAddress,
      userName:user?.fullName || user.firstName || "unKnow",
      userPhone:phone,
      viewDate:format(selectDate,"yyyy-MM-dd"),
      viewTime:selectTime,
      userId:user.id,
      message:message,
      createAt: Date.now(),
    })
    setSuccess(true)   
    setTimeout(()=>{
      setSuccess(false)
      setSelectDate(undefined)
      setSelectTime('')
      setMessage('')
      setPhone('')
    }, 10000)

  }catch(error){
    console.log(error , "Error schedula viewing")
    alert("Failed to schedula viewing , please try again")
  }
  finally{
    setSubmit(false)
  }  }
const isDateDisabled = (date : Date)=>{
  const today = new Date()
  today.setHours(0,0,0,0)
 return  date < today
}
  return (
    <div>
      <Dialog>
        <DialogTrigger> <Button className="w-[200px]">Schedule Viewing</Button> 
        </DialogTrigger>
        <DialogContent className="w-full h-auto">
          <DialogHeader>
            <DialogDescription className="text-xl">
              book a Viewing for {property?.title}
            </DialogDescription>
          </DialogHeader>
          {/* Calender */}
          {success ? (
            <div className="text-center py-8 w-full">
              <h1 className="text-2xl text-red-500 pb-6"> View Scheduled</h1>
              <p className="text-xl">we will contact you soon to confirm your appointment</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 h-auto">
              <Calendar
                mode="single"
                selected={selectDate}
                disabled={isDateDisabled}
                onSelect={setSelectDate}
                className="rounded-lg border"
              />
              {/* time */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {availabletime?.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      onClick={() => setSelectTime(time)}
                      className={`p-2 text-sm border rounded-md transition-colors text-black ${selectTime === time ? "bg-red-700 text-black" : "bg-white hover:bg-gray-200"}`}
                    >
                      <Clock className="w-3 h-3 inline mr-1" /> {time}
                    </Button>
                  ))}
                </div>
              </div>
            {/* Phone */}
              <div className="space-y-2">
                <Label className="my-2">phone</Label>
               <Input id="phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              </div>
          {/* message */}
           <div className="space-y-2">
             <Label className="my-2">Message (optional)</Label>

               <Textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)}>
               </Textarea>
              </div>
              <Button type="submit" disabled={!selectDate || !selectTime} >{submit ? " Sending" : "Schedula View"}</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
