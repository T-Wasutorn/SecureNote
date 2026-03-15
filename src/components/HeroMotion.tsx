"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link"

export default function Hero() {
  return (
    <section className="flex flex-col w-full h-screen justify-center bg-linear-to-t from-[#FFE2C7] to-[#FFF2E6] text-white py-20 md:py-32 transition-all duration-300">
      <div className="container mx-auto px-6 flex flex-col-reverse items-center gap-12">
        {/* Text content */}
        <motion.div
          className="flex flex-col items-center justify-center text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-[#F28500] md:text-6xl font-extrabold mb-6 italic">
            SecureNote𓆰𓆪
          </h1>
          <p className="text-lg md:text-xl text-[#754100] mb-6">
            The more efficient of notebook, the more your moments shine.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="/signup">
                <Button className="text-base px-6 py-3 bg-transparent border-[#754100] text-[#754100] hover:bg-[#754100] hover:text-[#F28500]">
                Get Started
                </Button>
            </Link>
            <Link href="/login">
                <Button className="text-base px-6 py-3 bg-transparent border-[#754100] text-[#754100] hover:bg-[#754100] hover:text-[#F28500]">
                Login
                </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
