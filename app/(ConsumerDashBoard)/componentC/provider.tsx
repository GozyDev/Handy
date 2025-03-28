import { useRouter } from "next/navigation";
import { StarIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { ProviderCardProps } from "@/lib/type";

// Design tokens for consistent styling
const STYLES = {
  gradientText: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
  tag:"px-2 py-1 bg-gray-100  text-black/70 rounded-md text-sm",
  ratingBox: "flex items-center gap-1.5 bg-purple-500/10 px-3 py-1 rounded-full",
  hoverEffect: "transition-all duration-300 ease-out hover:-translate-y-0.5"
};

const returnText = (arr:string)=>{
  const getArray=arr.split(":")
  const [categories,service] = getArray
  return service
}

export default function ProviderCard({ provider }: { provider: ProviderCardProps }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/browse-services/${provider.userId}`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={`group relative p-6 rounded-2xl bg-white hover:bg-gray-50 ${STYLES.hoverEffect} shadow-sm hover:shadow-md border border-gray-100/80 hover:border-purple-100/90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500`}
      onClick={handleClick}
    >
      <div className="relative  flex flex-col sm:flex-row gap-4">
        {/* Image Section */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-20 sm:h-20">
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <UserCircleIcon className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-3">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {provider.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-purple-500 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-clamp-1">{provider.locations.join(", ")}</span>
              </div>
            </div>
            
            {/* Rating & Pricing */}
            { <div className="flex items-center gap-3 sm:gap-4">
              <p className={`text-2xl font-bold ${STYLES.gradientText}`}>
                ${provider.rate}
                <span className="text-sm font-medium text-gray-400">/hr</span>
              </p>
            </div>}
          </header>

          {/* Services */}
          {provider.services.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {provider.services.map((service) => (
                <span key={service} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {
                    returnText(service)
                  }
                </span>
              ))}
            </div>
          )}

          {/* Bio */}
          {provider.bio && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {provider.bio}
            </p>
          )}
        </div>
      </div>

  
    </article>
  );
} 