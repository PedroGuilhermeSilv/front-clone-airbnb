import Image from "next/image";
import ContactButton from "@/app/components/landlords/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/service/apiService";
import { getUserId } from "@/app/lib/actions";

export type ResponseLandlord = {
  id: string;
  name: string;
  avatar_url: string;
};

const LandLordDetaiPage = async ({ params }: { params: { id: string } }) => {
  const landlord = await apiService.get<ResponseLandlord>(
    `/api/auth/${params.id}`
  );
  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 border rounded-xl shadow-xl border-gray-300">
            <Image
              src={landlord.data.avatar_url}
              alt="LandLord"
              width={200}
              height={200}
              className="rounded-full h-45"
            />
            <h1 className="mt-6 text-2xl"> {landlord.data.name}</h1>

            {userId === params.id ? null : (
              <ContactButton userId={userId} landlord_id={params.id} />
            )}
          </div>
        </aside>
        <div className="grid grid-cols-2 col-span-3 gap-4  md:grid-cols-4 ">
          <PropertyList landloard={params.id} />
        </div>
      </div>
    </main>
  );
};

export default LandLordDetaiPage;
