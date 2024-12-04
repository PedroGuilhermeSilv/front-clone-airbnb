import Image from "next/image";
import { PropertyType } from "./PropertyList";
import React from "react";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyListItemProps {
  property: PropertyType;
  markFavorite?: (favorited: boolean) => void;
}
const PropertyListItem: React.FC<PropertyListItemProps> = ({
  property,
  markFavorite,
}) => {
  const router = useRouter();
  console.log(`propertu is ${property.favorited}`);
  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className=" relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={property.image_url}
          sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
          alt="property"
          className="hover:scale-110 w-full h-full transition"
        />
        {markFavorite && (
          <FavoriteButton
            id={property.id}
            is_favorited={property.favorited}
            markAsFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>
      <div className="mt2">
        <p className="text-lg font-bold"> {property.title}</p>
      </div>
      <div className="mt2">
        <p className="text-sm text-gray-500">
          {" "}
          <strong>Price ${property.price_per_night}</strong>
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
