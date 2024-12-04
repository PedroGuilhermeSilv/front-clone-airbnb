import Image from "next/image";
import apiService from "../service/apiService";
import Link from "next/link";

type ReservationType = {
  id: string;
  start_date: string;
  end_date: string;
  number_of_nights: number;
  total_price: number;
  property: {
    id: string;
    title: string;
    image_url: string;
  };
};

type Response = {
  data: ReservationType[];
};


const MyReservationsPage = async () => {
  const reservations = await apiService.get<Response>(
    "/api/auth/myreservations/"
  );
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-4">
      <h1 className="pt-6 my-6 text-2xl"> My reservations</h1>
      <div className="space-y-4">
        {reservations.data.data.map((reservation: any) => {
          return (
            <>
              <div className=" mt-4 border shadow-md grid grid-cols-4 gap-4 p-5 border-gray-300 rounded-xl max-h-100">
                <div className="col-span-4 md:col-span-1">
                  <div className="relative overflow-hidden max-h-100 aspect-square rounded-xl">
                    <Image
                      fill
                      src={reservation.property.image_url}
                      alt="Property"
                      className="hover:scale-110 object-cover rounded-xl transition w-full h-full"
                    />
                  </div>
                </div>
                <div className="col-span-3 space-y-2">
                  <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                  <p>
                    <strong>Check in date:</strong> {reservation.start_date}
                  </p>
                  <p>
                    <strong>Check out date:</strong> {reservation.end_date}
                  </p>
                  <p>
                    <strong>Number of nigths:</strong>{" "}
                    {reservation.number_of_nights}
                  </p>
                  <p className="pb-4">
                    <strong>Total price:</strong> {reservation.total_price}
                  </p>
                  <Link
                    className="bg-airbnb p-5 mt-6 inline-block cursor-pointer rounded-xl text-white"
                    href={`/properties/${reservation.property.id}`}
                  >
                    Go to property
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </main>
  );
};

export default MyReservationsPage;
