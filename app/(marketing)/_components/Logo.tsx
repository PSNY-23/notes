import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
export const Logo = () => {
  return (
    <div className='hidden md:flex items-center gap-2'>
      <Image src='/logo.svg' height={40} width={40} alt='Logo' className="dark:hidden" />
      <Image src='/logo-dark.svg' height={40} width={40} alt='Logo' className="hidden dark:block" />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};
