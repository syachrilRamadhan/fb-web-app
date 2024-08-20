"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "tentang",
    path: "/about",
  },
  {
    name: "projects",
    path: "/project",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link href={link.path} key={index} className={`${link.path === pathname && "text-gray-600 border-b-2 border-gray-600"} capitalize font-medium hover:text-gray-600 transition-all`}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
