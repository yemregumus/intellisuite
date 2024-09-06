"use client";

import Link from "next/link";
import { ImageIcon, ArrowRight, MessageSquare, VideoIcon, Music, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the AI and it`s capabilities!</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Choose a category to get started.</p>
      </div>
      <div className="px-4 md:px20 lg:px32 flex flex-col gap-y-4">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.href}>
            <Card className="p4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="w-6 h-6 text-black/50" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
