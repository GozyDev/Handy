import Link from "next/link";
import {
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const navigations = [
  {
    name: "My Bookings",
    href: "/pbp",
    icon: CalendarIcon,
  },
  {
    name:"Profile",
    href: "/ppp",
    icon: UserCircleIcon,
  },
  {
    name: "Setting",
    href: "/pstp",
    icon: UserCircleIcon,
  },
];

export default function SideNav() {
  return (
    <ul className="space-y-12">
      {navigations.map((nav) => {
        const Icon = nav.icon;
        return (
          <li key={nav.name}>
            <Link
              href={nav.href}
              className="flex items-center gap-2 rounded-xl text-purple-100 hover:bg-white/10 hover:text-purple-600 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/10"
            >
              <Icon className="w-8 h-8 text-gray-700 group-hover:text-purple-600 transition-colors" />
              <span className="font-medium text-gray-800   text-md tracking-wide">
                {nav.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
