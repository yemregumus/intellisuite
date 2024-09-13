import Image from "next/image";
import Logo from "../app/public/images/logo.png";

export const Loader = () => {
  return (
    <div
      className="h-full flex flex-col gap-y-4 items-center
  justify-center"
    >
      <div className="w-20 h-20 relative animate-spin">
        <Image alt="logo" fill src={Logo} />
      </div>
      <p className="text-sm text-muted-foreground">IntelliSuite is thinking...</p>
    </div>
  );
};
