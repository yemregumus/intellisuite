import { Avatar } from "@/components/ui/avatar";
import Logo from "../app/public/images/logo.png";
import Image from "next/image";

export const BotAvatar = () => {
  return (
    <Avatar className="w-12 h-12">
      <Image alt="logo" fill className="p-1" src={Logo} />
    </Avatar>
  );
};
