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
    iconColor: "text-pink-500",
    href: "/dashboard",
    color: "text-zinc-400",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    iconColor: "text-violet-500",
    href: "/conversation",
    color: "text-zinc-400",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    iconColor: "text-blue-500",
    href: "/image",
    color: "text-zinc-400",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    iconColor: "text-red-500",
    href: "/video",
    color: "text-zinc-400",
  },
  {
    label: "Music Generation",
    icon: Music,
    iconColor: "text-orange-500",
    href: "/music",
    color: "text-zinc-400",
  },
  {
    label: "Code Generation",
    icon: Code,
    iconColor: "text-green-500",
    href: "/code",
    color: "text-zinc-400",
  },
  {
    label: "Settings",
    icon: Settings,
    iconColor: "text-yellow-500",
    href: "/settings",
    color: "text-zinc-400",
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
            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathName === route.href ? "text-white bg-white/10" : route.color)}>
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.iconColor)} />
                <div className={cn("ml-4")}>{route.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
