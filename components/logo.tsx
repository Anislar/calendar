import Image from "next/image";
import LogoImage from "@/public/logo.png";
import { cn } from "@/lib/utils";
interface LogoProps {
  imageSize?: string;
  titleSize?: string;
}
function Logo({ imageSize, titleSize }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image src={LogoImage} alt="logo" className={cn("size-10", imageSize)} />
      <h4 className={cn("text-3xl font-semibold", titleSize)}>
        Larguet
        <span className=" bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Calendar
        </span>
      </h4>
    </div>
  );
}

export default Logo;
