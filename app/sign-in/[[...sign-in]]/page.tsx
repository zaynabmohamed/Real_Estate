"use client";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const createUser = useMutation(api.users.updateUser);
  console.log(createUser)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await createUser({
        name,
        email,
        userId,
      });
      console.log("User created with ID:", user);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <SignIn />

        </form>
    </div>
  );
}
