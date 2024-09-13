"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../app/public/images/logo.png";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, MessageSquare, VideoIcon, Music, Settings, Code } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-pink-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-blue-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-red-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-orange-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-yellow-500",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-20 h-20 mr-4">
            <Image fill alt="Logo" src={Logo} />
          </div>
          <div className={cn("text-xl font-bold", montserrat.className)}>IntelliSuite</div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                <div className={cn("ml-4", route.color)}>{route.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
