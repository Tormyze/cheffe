import { Star } from "lucide-react";

export interface ReviewCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  rating?: number;
}

export default function ReviewCard({
  quote,
  author,
  role,
  avatarUrl,
  rating = 5,
}: ReviewCardProps) {
  return (
    <article className="flex w-full flex-col justify-between gap-6 rounded-2xl bg-white p-6 sm:p-8">
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-1 text-zest">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 sm:w-5 ${
                index < rating
                  ? "fill-zest text-zest" // estrela preenchida
                  : "fill-transparent text-black/20" // estrela vazia
              }`}
            />
          ))}
        </div>

        <blockquote className="font-spectral text-sm font-normal leading-relaxed text-black/90 sm:text-base sm:leading-7">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </header>

      <footer className="flex items-center gap-3 sm:gap-4">
        <img
          src={avatarUrl}
          alt={author}
          className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
        />
        <div className="flex flex-col gap-1">
          <cite className="font-spectral text-sm font-semibold not-italic leading-tight text-black sm:text-base">
            {author}
          </cite>
          <span className="font-spectral text-xs font-normal text-black/70 sm:text-sm">
            {role}
          </span>
        </div>
      </footer>
    </article>
  );
}
