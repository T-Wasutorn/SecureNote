import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Database, Layout, Cpu, Lock } from "lucide-react";

export default function AboutPage() {
  const techStack = [
    { name: "Next.js 15", category: "Frontend Framework" },
    { name: "React 19", category: "UI Library" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Shadcn UI", category: "Components" },
    { name: "NextAuth.js", category: "Authentication" },
    { name: "PocketBase", category: "Backend/Database" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F28500] italic mb-4">
          About SecureNote𓆰𓆪
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto italic">
          "Your privacy, SecureNote's priority. A modern, secure, and fast note-taking experience."
        </p>
      </div>

      {/* Mission & Concept */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="text-[#F28500]" /> Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Secure Note was built with the fundamental belief that digital notes should be 
            both accessible and highly secure. SecureNote leverage modern web technologies to 
            ensure that your thoughts survive server restarts and are protected by 
            industry-standard encryption.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Lock className="text-[#F28500]" /> Security First
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By utilizing <strong>HTTPS</strong> and <strong>Environment Variables</strong>, 
            SecureNote ensure that your sensitive data and tokens are never exposed. Our 
            integration with <strong>NextAuth.js</strong> provides a robust 
            authentication layer for every user.
          </p>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Tech Stack & Implementation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="bg-white/50 backdrop-blur-sm border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F28500]">
              <Layout className="w-5 h-5" /> Frontend
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Powered by <strong>React's Virtual DOM</strong> for seamless, lightning-fast 
            UI updates without page reloads.
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F28500]">
              <Cpu className="w-5 h-5" /> Runtime
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Executed on <strong>Node.js (V8 Engine)</strong>, ensuring high-performance 
            server-side processing and secure API handling.
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F28500]">
              <Database className="w-5 h-5" /> Persistence
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Integrated with <strong>PocketBase</strong> to provide real-time data 
            persistence that survives any system reboot.
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((tech) => (
          <Badge 
            key={tech.name} 
            variant="outline" 
            className="px-4 py-1 border-orange-200 text-gray-700 bg-white"
          >
            {tech.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}