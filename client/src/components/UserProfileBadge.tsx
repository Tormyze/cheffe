import React from "react";
import { Link } from "react-router";

interface UserProfileBadgeProps {
  avatarUrl?: string;
  name?: string;
}

export const UserProfileBadge: React.FC<UserProfileBadgeProps> = ({
  avatarUrl = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=100",
}) => {
  return (
    <Link
      to="/perfil"
      className="pl-2 pr-3.5 py-1.5 rounded-xl bg-white shadow-xs border border-black/15 inline-flex justify-center items-center gap-2.5 hover:border-zest/40 transition-all cursor-pointer"
    >
      <img
        src={avatarUrl}
        alt="Foto de perfil"
        className="w-8 h-8 rounded-lg object-cover"
      />
      <span className="text-zest text-base font-medium font-spectral leading-6">
        Perfil
      </span>
    </Link>
  );
};

export default UserProfileBadge;