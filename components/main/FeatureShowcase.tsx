"use client";

import Link from "next/link";
import {
  Users,
  FileSliders,
  GitPullRequestDraft,
  Swords,
  MoveRight,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Draft Pick Simulation",
    description:
      "Simulate professional draft phases. Plan bans, picks, and strategies for your team.",
    icon: GitPullRequestDraft,
    link: "/honor-of-kings/draft-pick",
    className: "md:col-span-2",
    accent: "#8b5cf6",
    image: "/asset/feature/draft-pick.png",
  },
  {
    title: "Characters",
    description: "Explore all heroes, their roles, and stats.",
    icon: Users,
    link: "/honor-of-kings", // Assuming this path, user can correct
    className: "md:col-span-1",
    accent: "#3b82f6",
    image: "/asset/feature/caharacters.png",
  },
  {
    title: "Tier List Maker",
    description: "Drag and drop to create your own meta rankings.",
    icon: FileSliders,
    link: "/honor-of-kings/custom-tier-maker",
    className: "md:col-span-1",
    accent: "#f59e0b",
    image: "/asset/feature/tierlist.png",
  },
  {
    title: "Counter Pick Maker",
    description: "Find and organize the best counters for every matchup.",
    icon: Swords,
    link: "/honor-of-kings/custom-counter-pick-maker",
    className: "md:col-span-2",
    accent: "#ef4444",
    image: "/asset/feature/counter-pick.png",
  },
];

const FeatureShowcase = () => {
  return (
    <section className="py-16 px-4 md:px-8 mt-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row mb-8 md:mb-12 items-start justify-between gap-4">
        <p className="text-gray-400 mt-2 text-sm max-w-xs">
          Tools Built for the Gorge
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-white pb-2 border-b-2 md:pr-30">
          <div className="max-w-full md:max-w-180">
            Everything you need to dominate your game.
          </div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.link}
              className={`group relative overflow-hidden rounded-xs bg-d-primary-surface/40  transition-all duration-300 ${feature.className}`}
            >
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col p-6 z-20">
                <h3 className="text-xl font-semibold text-white  group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[80%]">
                  {feature.description}
                </p>
              </div>

              {/* Empty Image Placeholder - User asked for empty space for assets */}
              <div className="absolute inset-0 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent opacity-80" />

                {/* Decorative bottom corner */}
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-[100px]" />
              </div>

              {/* Background Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${feature.accent}, transparent 70%)`,
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureShowcase;
