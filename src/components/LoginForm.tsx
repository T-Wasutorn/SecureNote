"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div"> & {}) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setIsError(true);
      toast.error("Invalid email or password");
      setIsLoading(false);
    } else {
      toast.success("Login successful!");
      router.push("/notes");
      router.refresh();
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
          <h1 className="text-lg font-bold">Login to your account</h1>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className={isError ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-400" : ""}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required
                  onChange={() => setIsError(false)}
                  className={isError ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-400" : ""}
                />
                {isError && (
                  <span className="text-xs text-red-500">Password invalid. Please try again.</span>
                )}
              </div>
              <Button type="submit" className="w-full hover:bg-[#F28500]" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="flex flex-row justify-center items-center">
            <div>Don't have account yet?</div>
            <CardAction>
              <Link href="/signup">
                <Button variant="link" className="text-[#F28500] p-3 rounded-md transition-all duration-300 ease-in-out">
                  Sign Up
                </Button>
              </Link>
            </CardAction>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
    </>
  )
}
