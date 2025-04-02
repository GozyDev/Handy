import Link from "next/link";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const navigations = [
  {
    name: "Browse Services",
    href: "/browse-services",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "My Bookings",
    href: "/booking",
    icon: CalendarIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
  },
];

export default function SideNav() {
  return (
    <ul className=" items-center gap-5 hidden lg:flex">
      {navigations.map((nav) => {
        const Icon = nav.icon;
        return (
          <li key={nav.name}>
            <Link
              href={nav.href}
              className="flex items-center gap-2 rounded-xl text-purple-100 hover:bg-white/10 hover:text-purple-600 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/10"
            >
              <span className="font-medium  text-gray-600 text-sm ">
                {nav.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
