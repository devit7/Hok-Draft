"use client";

import Image from "next/image";
import { useState } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import { Triangle } from "lucide-react";

const imageList = [
  ["/asset/image/ying.jpg", "/asset/image/renjie.jpg"],
  ["/asset/image/dolia.jpg", "/asset/image/guanyu.jpg"],
  ["/asset/image/diao.jpg", "/asset/image/machao.jpg"],
];

function FlipCard({
  frontImage,
  backImage,
  index,
  disableFlip = false,
}: {
  frontImage: string;
  backImage: string;
  index: number;
  disableFlip?: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (disableFlip) {
    return (
      <div className="w-full max-h-220 relative">
        <Image
          src={frontImage}
          alt={`Image ${index + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full max-h-220 relative cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={frontImage}
            alt={`Front ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={backImage}
            alt={`Back ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

const HeroSection = () => {
  const words = ["Win", "Lose"];

  return (
    <div className="min-h-220 relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="grid grid-cols-2 md:grid-cols-3 p-4 inset-shadow-sm inset-shadow-d-primary h-full">
          {imageList.map((images, index) => (
            <FlipCard
              key={index}
              frontImage={images[0]}
              backImage={images[1]}
              index={index}
              disableFlip={index % 3 === 1}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--d-primary) 0%, transparent 40%, transparent 40%, var(--d-primary) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--d-primary) 5%, transparent 20%, transparent 20%, var(--d-primary) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none h-220">
        <div className="flex flex-col items-center gap-5 mb-20">
          <div className="text-7xl bg-linear-to-r from-gray-200 to-indigo-700 bg-clip-text text-transparent text-center font-medium uppercase tracking-tighter">
            Draft Smarter,
            <PointerHighlight
              rectangleClassName=" border-blue-400 leading-loose bg-blue-100/30"
              pointerClassName="text-blue-500 h-3 w-3"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10 text-yellow-600">
                <FlipWords words={words} />
              </span>
            </PointerHighlight>
            Faster.
          </div>
          <div className="text-2xl uppercase">
            Master the Meta, Rule the Gorge.
          </div>
          <div className="text-1xl font-medium mt-10 uppercase text-blue-300 border border-blue-500 px-8 py-4 bg-blue-200/10">
            Start Exploring Now
          </div>
          <div className="flex flex-col items-center mt-10">
            Begin
            <Triangle className="rotate-180 mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
