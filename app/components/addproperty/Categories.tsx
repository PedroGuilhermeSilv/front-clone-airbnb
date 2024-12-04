import Image from "next/image";
interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory,
}) => {
  return (
    <>
      <div className="pt-3 flex cursor-pointer space-x-12 items-center pb-6">
        <div
          onClick={() => setCategory("Beach")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Beach" ? "border-gray-800" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image src="/icon.jpg" width={30} height={30} alt="icon" />
          <span className="text-xs">Beach</span>
        </div>
        <div
          onClick={() => setCategory("Villas")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Villas" ? "border-gray-800" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image src="/icon.jpg" width={30} height={30} alt="icon" />
          <span className="text-xs">Villas</span>
        </div>
        <div
          onClick={() => setCategory("Cabins")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Cabins" ? "border-gray-800" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image src="/icon.jpg" width={30} height={30} alt="icon" />
          <span className="text-xs">Cabins</span>
        </div>
      </div>
    </>
  );
};

export default Categories;
