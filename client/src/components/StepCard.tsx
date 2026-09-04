import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  linkTo?: string;
  linkText?: string;
}

export default function StepCard({
  step,
  title,
  description,
  imageUrl,
  imageAlt,
  linkTo = "#",
  linkText = "Explorar",
}: StepCardProps) {
  return (
    <article className="flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white text-black">
      <div className="flex flex-col gap-5 p-6 sm:gap-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <span className="font-spectral text-sm font-semibold text-zest sm:text-base">
            {step}
          </span>

          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">
              {title}
            </h3>
            <p className="font-spectral text-sm leading-relaxed text-black/80 sm:text-base">
              {description}
            </p>
          </div>
        </div>

        <div>
          <NavLink
            to={linkTo}
            className="inline-flex items-center gap-2 font-spectral text-sm font-medium sm:text-base"
          >
            <span>{linkText}</span>
            <ChevronRight className="w-4" />
          </NavLink>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt || title}
          className="h-48 w-full object-cover sm:h-60"
        />
      </div>
    </article>
  );
}