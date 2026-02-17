"use client";
import {
  Axe,
  ChartNoAxesColumn,
  ChartNoAxesGantt,
  FileSliders,
  GitPullRequestDraft,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

type NavItem = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

const navItem: NavItem[] = [
  {
    title: "Characters",
    link: "/honor-of-kings",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Tier List",
    link: "/honor-of-kings/hero-tier-list",
    icon: <ChartNoAxesColumn size={20} />,
  },
  {
    title: "Counter Pick",
    link: "/honor-of-kings/counter-pick",
    icon: <Axe size={20} />,
  },
  {
    title: "Team Tier List",
    link: "/honor-of-kings/team-tier-list",
    icon: <ChartNoAxesGantt size={20} />,
  },
  {
    title: "Draft Pick",
    link: "/honor-of-kings/draft-pick",
    icon: <GitPullRequestDraft size={20} />,
  },
  {
    title: "Tier Maker",
    link: "/honor-of-kings/custom-tier-maker",
    icon: <FileSliders size={20} />,
  },
  {
    title: "Counter Pick Maker",
    link: "/honor-of-kings/custom-counter-pick-maker",
    icon: <FileSliders size={20} />,
  },
];

const HokNavbar = () => {
  return (
    <div className="w-full ">
      <div className="text-gray-200 border-b border-d-primary-surface">
        <div className="flex justify-start gap-0.5">
          {navItem.map((item, index) => (
            <NavItem
              key={index}
              title={item.title}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HokNavbar;

const NavItem = ({ title, link, icon }: NavItem) => {
  const router = usePathname();
  return (
    <Link
      href={link}
      className={
        router === link
          ? "border-b-2 border-blue-500"
          : "hover:border-b-2 hover:border-blue-500 transition-colors"
      }
    >
      <div className="flex flex-row items-center justify-center gap-2 p-2 xl:p-4">
        {icon}
        <span className="font-medium mt-1 text-xs md:text-sm lg:text-sm xl:text-base md:block hidden">
          {title}
        </span>
      </div>
    </Link>
  );
};
