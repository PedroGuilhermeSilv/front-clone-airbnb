import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/service/apiService";
import { getUserId } from "@/app/lib/actions";

type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  landlord: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

type Response = PropertyType;


const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await apiService.get<Response>(`/api/properties/${params.id}/`);
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-6">
      <div className="w-full h-[64vh] mb-9 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.data.image_url}
          alt="property"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className=" pb-6 pr-6 col-span-3">
          <h1 className=" mb-4 text-4xl">{property.data.title}</h1>
          <span className=" mb-6 block text-lg  text-gray-600">
            {property.data.guests} guets - {property.data.bedrooms} bedrooms -{" "}
            {property.data.bathrooms} bathrooms
          </span>
          <hr />
          <Link
            href={`/landlords/${property.data.landlord.id}`}
            className=" py-6 flex  items-center space-x-4"
          >
            {property.data.landlord.avatar_url && (
              <Image
                width={50}
                height={50}
                src={property.data.landlord.avatar_url}
                alt="user"
                className=" rounded-full"
              />
            )}
            <p>
              <strong>{property.data.landlord.name}</strong> is your host
            </p>
          </Link>
          <hr />
          <p className=" mt-6 text-lg">{property.data.description}</p>
        </div>
        <ReservationSidebar userId={property.data.landlord.id} property={property.data} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
