"use client";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

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
    name: "projecct",
    path: "/project",
  },
  {
    name: "contact",
    path: "/contact",
  },
  {
    name: "resume",
    path: "/resume",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-white" />
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-sky-600">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold text-white">
              Family<span className="text-white"> Battery</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-5 -mt-20">
          {links.map((link, index) => {
            return (
              <Link href={link.path} key={index} className={`${link.path === pathname && "text-primary border-b-2 border-primary"}text-xl capitalize hover:text-primary transition-all`}>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
