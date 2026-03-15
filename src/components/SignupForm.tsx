"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div"> & {}) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordShort = password.length > 0 && password.length < 8;
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirm: password,
          user_id: Date.now()
        })
      });

      const data = await res.json();

      console.log("Signup response:", data);

      if (!res.ok) {
        console.error(data);
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully!");
      router.push("/login");

    } catch(err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <motion.div
          className="flex flex-col items-center justify-center text-center md:text-left"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
      <Card className="w-full max-w-sm shadow-xl">
        <div className="flex flex-col w-full items-center justify-center">
          <h1 className="text-lg font-bold">Create your account</h1>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="yourname"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2 ">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={isPasswordShort ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-400" : ""}
                />
                {isPasswordShort && (
                  <span className="text-xs text-red-500">Must be at least 8 characters.</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={isConfirmInvalid ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-400" : ""}
                />
                {isConfirmInvalid && (
                  <span className="text-xs text-red-500">Passwords do not match.</span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full hover:bg-[#F28500]"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account" : "Sign Up"}
              </Button>

            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="flex flex-row justify-center items-center">
            <div>Already have an account?</div>
            <CardAction>
              <Link href="/login">
                <Button
                  variant="link"
                  className="text-[#F28500] p-3 rounded-md transition-all duration-300 ease-in-out"
                >
                  Login
                </Button>
              </Link>
            </CardAction>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
    </>
  );
}