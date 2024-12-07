"use client";

import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "../../service/apiService";
import { getUserId } from "@/app/lib/actions";
import useSearchModal from "../hooks/useSearchModels";
import format from "date-fns/format";
import { useSearchParams } from "next/navigation";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  favorited: boolean;
};

interface PropertyListProps {
  landloard?: string;
  favorites?: boolean;
}

interface PropertyListResponse {
  data: PropertyType[];
  favorites: string[];
}
const PropertyList: React.FC<PropertyListProps> = ({
  landloard,
  favorites,
}) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBedrooms = searchModal.query.bedrooms;
  const numBathrooms = searchModal.query.bathrooms;
  const checkInDate = searchModal.query.checkIn;
  const checkOutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const markAsFavorite = (id: string, favorited: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id === id) {
        property.favorited = favorited;
        if (favorited) {
        } else {
        }
      }
      return property;
    });
    setProperties(tmpProperties);
  };
  const getPropertyList = async () => {
    const id = await getUserId();
    let url = "/api/properties";
    if (landloard) {
      url = `/api/properties?landloard=${landloard}`;
    } else if (favorites) {
      url = `/api/properties?favorites=${favorites}`;
    } else {
      let urlQuery = "";
      if (country) {
        urlQuery += `&country=${country}`;
      }
      if (numGuests) {
        urlQuery += `&guests=${numGuests}`;
      }
      if (numBedrooms) {
        urlQuery += `&bedrooms=${numBedrooms}`;
      }
      if (numBathrooms) {
        urlQuery += `&bathrooms=${numBathrooms}`;
      }
      if (checkInDate) {
        urlQuery += `&checkIn=` + format(checkInDate, "yyyy-MM-dd");
      }
      if (checkOutDate) {
        urlQuery += `&checkOut=` + format(checkOutDate, "yyyy-MM-dd");
      }
      if (category) {
        urlQuery += `&category=${category}`;
      }
      if (urlQuery.length) {
        urlQuery = "?" + urlQuery.substring(1);
        url += urlQuery;
      }
    }

    const response = await apiService.get<PropertyListResponse>(url);

    setProperties(
      response.data.data.map((property: PropertyType) => {
        if (response.data.favorites.includes(property.id)) {
          property.favorited = true;
        } else {
          property.favorited = false;
        }
        return property;
      })
    );
  };

  useEffect(() => {
    getPropertyList();
  }, [category, searchModal.query, params]);

  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
            markFavorite={(favorited: any) =>
              markAsFavorite(property.id, favorited)
            }
          />
        );
      })}
    </>
  );
};

export default PropertyList;
