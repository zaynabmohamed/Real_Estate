
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Id } from "@/convex/_generated/dataModel";

interface TypeProperty {
  property: {
    id: Id<"Real_Estate">;
    title: string;
  };
}

export default function Scheduleview({ property }: TypeProperty) {
  const { user } = useUser();
  const createView = useMutation(api.userView.createView);

  const [selectTime, setSelectTime] = useState("");
  const [selectDate, setSelectDate] = useState<Date | undefined>();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);

  const availableTime = useMemo(
    () => [
      "09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
      "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30",
      "17:00","17:30","18:00","18:30","19:00",
    ],
    []
  );

  const timeButtons = useMemo(
    () =>
      availableTime.map((time) => (
        <Button
          key={time}
          type="button"
          aria-label={`Select viewing time ${time}`}
          onClick={() => setSelectTime(time)}
          className={`p-2 text-sm w-[90px] border rounded-md transition-colors scroll-m-2 ${
            selectTime === time ? "bg-red-700 text-black" : "bg-black hover:bg-gray-600"
          }`}
        >
          <Clock className="w-3 h-3 inline mr-1" /> {time}
        </Button>
      )),
    [availableTime, selectTime]
  );

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectDate || !selectTime) {
      alert("Please select date and time 😊");
      return;
    }
    if (!user) {
      alert("Please sign in 😊");
      return;
    }

    setSubmit(true);
    try {
      await createView({
        propertyId: property.id,
        propertyTitle: property.title,
        userEmail: user.emailAddresses?.[0]?.emailAddress,
        userName: user.fullName || user.firstName || "Unknown",
        userPhone: phone,
        viewDate: format(selectDate, "yyyy-MM-dd"),
        viewTime: selectTime,
        userId: user.id,
        message,
        createAt: Date.now(),
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error scheduling viewing:", error);
      alert("Failed to schedule viewing, please try again.");
    } finally {
      setSubmit(false);
    }
  };

  // Reset form after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setSelectDate(undefined);
        setSelectTime("");
        setMessage("");
        setPhone("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div>
      <Dialog >
        <DialogTrigger asChild>
          <Button className="w-[200px]">Schedule Viewing</Button>
        </DialogTrigger>

        <DialogContent className="h-screen w-full">
          <DialogHeader>
            <DialogTitle className="pb-4">Schedule a Viewing</DialogTitle>
            <DialogDescription className="text-xl">
              Book a viewing for <strong className="text-gray-800">{property.title}</strong>
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="text-center">
              <h2 className="text-2xl  text-red-500 pb-4">View Scheduled</h2>
              <p className="text-lg">We will contact you soon to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-scroll">
              {/* Calendar */}
              <Calendar
                mode="single"
                selected={selectDate}
                disabled={isDateDisabled}
                onSelect={setSelectDate}
                className="rounded-lg border"
              />

              {/* Time Selection */}
              <div className="grid grid-cols-3 gap-2">{timeButtons}</div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="my-2">
                  Message (optional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a note or request"
                />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={!selectDate || !selectTime || submit}>
                {submit ? "Sending..." : "Schedule Viewing"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
