
import Categories from "./components/home/Categories";
import LoadingModal from "./components/modals/LoadingModal";
import PropertyList from "./components/properties/PropertyList";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.code) {
    return <LoadingModal code={searchParams.code} />;
  }

  return (
    <main className="max-w-[1500px] mx-auto px-4">
      <Categories />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PropertyList />
      </div>
    </main>
  );
}
