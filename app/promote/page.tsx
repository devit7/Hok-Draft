import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaFacebook } from "react-icons/fa";

export default function PromotePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 ">
      <h1 className="text-3xl font-bold text-center text-white">
        Promosi Jualan Admin {">///<"}
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-300">
          Hubungi Admin via:
        </p>
        <div className="flex flex-row space-x-4">
          <Link
            href="https://discord.com/users/639077760869990410"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 sm:px-6 py-2 sm:py-3 space-x-2 text-white transition-colors bg-[#5865F2] rounded-sm sm:rounded-full hover:bg-[#4752c4]"
          >
            <FaDiscord className="text-sm sm:text-2xl" />
            <span className="text-xs sm:text-base font-semibold">Chat via Discord</span>
          </Link>
          <Link
            href="https://www.facebook.com/devit.erlingga.3/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 sm:px-6 py-2 sm:py-3 space-x-2 text-white transition-colors bg-[#1877F2] rounded-sm sm:rounded-full hover:bg-[#166fe5]"
          >
            <FaFacebook className="text-sm sm:text-2xl" />
            <span className="text-xs sm:text-base font-semibold">Chat via Facebook</span>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-2xl overflow-hidden rounded-sm shadow-xl">
        <Image
          src="/asset/promote/promote.png"
          alt="Promosi Jualan"
          width={800}
          height={600}
          className="object-contain w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
