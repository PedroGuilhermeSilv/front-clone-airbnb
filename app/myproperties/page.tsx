import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";
const MyPropertiesPage = async () => {
  const userId = await getUserId();

  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-4">
      <h1 className="pt-6 my-6 text-2xl font-medium"> My properties</h1>
      <div className="grid grid-cols-2 col-span-3 gap-4  md:grid-cols-4 ">
        <PropertyList landloard={userId ?? undefined} />
      </div>
    </main>
  );
};

export default MyPropertiesPage;
