"use client";
import { is } from "date-fns/locale";
import apiService from "../service/apiService";

interface FavoriteButtonProps {
  id: string;
  is_favorited: boolean;
  markAsFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  is_favorited,
  markAsFavorite,
}) => {
  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const response = await apiService.post(
      `/api/properties/${id}/toggle-favorite/`,
      {}
    );
    console.log("botao")
    console.log(is_favorited)
    markAsFavorite(response.is_favorited);
  };
  return (
    <div
      onClick={toggleFavorite}
      className={`absolute top-2 right-2  ${
        is_favorited ? "text-airbnb-dark":"text-white" 
      } hover:text-airbnb-dark`}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};

export default FavoriteButton;
