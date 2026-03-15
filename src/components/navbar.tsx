"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Info, FileText, LogOut, UserPlus, LogIn } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed left-4 bottom-4 xl:bottom-auto xl:top-4 z-50">
      <Sheet>
        {/* ปุ่มเปิด Navbar */}
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full shadow-md bg-white/80 backdrop-blur-sm cursor-pointer hover:scale-110 transition-all">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[280px] flex flex-col bg-[#FFF2E6] border-r-orange-200">
          <SheetHeader className="pb-6 border-b border-orange-200">
            <SheetTitle className="text-[#F28500] text-xl font-bold italic">
              SecureNote𓆰𓆪
            </SheetTitle>
            
            {/* Username หรือ Login/Signup */}
            <div className="mt-4">
              {session ? (
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#F28500] flex items-center justify-center text-white font-bold">
                    {session.user?.email?.[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700 truncate">
                    {session.user?.email}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start gap-2 cursor-pointer active:scale-95 transition-all">
                      <LogIn className="w-4 h-4" /> Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full justify-start gap-2 bg-[#F28500] hover:bg-[#d97700] cursor-pointer active:scale-95 transition-all">
                      <UserPlus className="w-4 h-4" /> Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <div className="flex-1 py-6 space-y-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-[#F28500] hover:bg-orange-100 cursor-pointer">
                <Home className="w-5 h-5" /> Home
              </Button>
            </Link>
            
            <Link href="/about">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-[#F28500] hover:bg-orange-100 cursor-pointer">
                <Info className="w-5 h-5" /> About Us
              </Button>
            </Link>

            {session && (
              <Link href="/notes">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-[#F28500] hover:bg-orange-100 cursor-pointer">
                  <FileText className="w-5 h-5" /> My Notes
                </Button>
              </Link>
            )}
          </div>

          {/* Sign Out */}
          {session && (
            <div className="pt-6 border-t border-orange-200">
              <Button 
                variant="destructive" 
                className="w-full justify-start gap-3 cursor-pointer active:scale-95 transition-all"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}