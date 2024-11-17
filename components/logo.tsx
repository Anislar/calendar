import Image from "next/image";
import LogoImage from "@/public/logo.png";
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={LogoImage} alt="logo" className="size-10" />
      <h4 className="text-3xl font-semibold text-stone-700">
        Larguet
        <span className=" bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Calendar
        </span>
      </h4>
    </div>
  );
}

export default Logo;
