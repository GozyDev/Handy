import Link from "next/link";
import { ArrowRightIcon, BeakerIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        {/* Animated Icon */}
        <div className="animate-bounce mx-auto">
          <BeakerIcon className="w-24 h-24 text-purple-600/80" />
        </div>

        {/* Content Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8 space-y-6 flex flex-col">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Handy Platform
          </h1>

          <p className="text-xl text-gray-600">
            We are crafting something amazing!
            <span className="block mt-2 text-sm text-gray-500">
              Stay tuned for our official launch
            </span>
          </p>

          {/* CTA Button */}
          <Link href="/signup">
            <button className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Get Early Access
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Construction Notice */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <BeakerIcon className="w-5 h-5" />
          <span>Platform under active development</span>
        </div>
      </div>
    </div>
  );
}
