import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";

const MyFavoritesPage = async () => {
  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-4">
      <h1 className="pt-6 my-6 text-2xl font-medium"> My favorites</h1>
      {userId ? (
        <div className="grid grid-cols-2 col-span-3 gap-4  md:grid-cols-4 ">
          <PropertyList favorites={true} />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-medium">
            Please login to view your favorite properties.
          </p>
        </div>
      )}
    </main>
  );
};

export default MyFavoritesPage;
