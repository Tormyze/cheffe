import React from "react";
import { Link } from "react-router";
import { ChefHat } from "lucide-react";

interface UserProfileBadgeProps {
  avatarUrl?: string;
  name?: string;
}

export const UserProfileBadge: React.FC<UserProfileBadgeProps> = ({
  avatarUrl,
}) => {
  return (
    <Link
      to="/perfil"
      className="pl-2 pr-3.5 py-1.5 rounded-xl bg-white shadow-xs border border-black/15 inline-flex justify-center items-center gap-2.5 hover:border-zest/40 transition-all cursor-pointer"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Foto de perfil"
          className="h-8 w-8 rounded-lg object-cover"
        />
      ) : (
        <span
          role="img"
          aria-label="Foto de perfil"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-zest"
        >
          <ChefHat className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
        </span>
      )}
      <span className="text-zest text-base font-medium font-spectral leading-6">
        Perfil
      </span>
    </Link>
  );
};

export default UserProfileBadge;