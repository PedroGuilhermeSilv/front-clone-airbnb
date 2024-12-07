"use client";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import Modal from "./Modal";
import { ChangeEvent, useState } from "react";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiService from "@/app/service/apiService";
import { getAccessToken } from "@/app/lib/actions";
import { errorToJSON } from "next/dist/server/render";

const AddPropertyModal = () => {
  const addPropertyModal = useAddPropertyModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setError] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [image, setDataImage] = useState<File | null>(null);

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDataImage(file);
    }
  };
  const router = useRouter();
  const submitButton = async () => {
    if (
      dataBathrooms &&
      dataBedrooms &&
      dataCountry &&
      dataDescription &&
      dataGuests &&
      dataPrice &&
      dataTitle &&
      image
    ) {
      const formData = new FormData();
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("image", image);
      formData.append("category", dataCategory);
      const response = await apiService.post(
        "/api/properties/create/",
        formData
      );
      if (response.data === "Property created successfully") {
        router.push("/?added=true");
        addPropertyModal.close();
        router.refresh();
      } else {
        const tmpError: string[] = Object.values(response).map((error: any) => {
          return error;
        });

        setError(tmpError);
      }
    }
  };
  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl"> Choose category</h2>

          <Categories dataCategory={dataCategory} setCategory={(category) => setCategory(category)} />

          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6  text-2xl"> Describe your place</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => setDataTitle(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                onChange={(e) => setDataDescription(e.target.value)}
                className="border h-[200px] w-full p-2 rounded-xl border-gray-300"
              ></textarea>
            </div>
          </div>

          <CustomButton
            label="Previus"
            className="bg-black mb-5 hover:bg-gray-800"
            onClick={() => setCurrentStep(1)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-6  text-2xl">Details</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per night</label>
              <input
                type="number"
                onChange={(e) => setDataPrice(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Bedrooms</label>
              <input
                type="number"
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Bathrooms</label>
              <input
                type="number"
                onChange={(e) => setDataBathrooms(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Maximum number of guests</label>
              <input
                type="number"
                onChange={(e) => setDataGuests(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <CustomButton
            label="Previus"
            className="bg-black mb-5 hover:bg-gray-800"
            onClick={() => setCurrentStep(2)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6  text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>

          <CustomButton
            label="Previus"
            className="bg-black mb-5 hover:bg-gray-800"
            onClick={() => setCurrentStep(3)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
        </>
      ) : currentStep == 5 ? (
        <>
          <h2 className="mb-6  text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2 ">
              {image && (
                <div className=" relative h-[200px]">
                  <Image
                    fill
                    src={URL.createObjectURL(image)}
                    alt="image"
                    className="object-contain  rounded-xl"
                  />
                </div>
              )}
              <input
                type="file"
                onChange={setImage}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          {errors.map((error, index) => {
            return (
              <div
                key={index}
                className="bg-airbnb opacity-80 text-white p-5 mb-4 rounded-xl"
              >
                {error}
              </div>
            );
          })}
          <CustomButton
            label="Previus"
            className="bg-black mb-5 hover:bg-gray-800"
            onClick={() => setCurrentStep(4)}
          />
          <CustomButton label="Submitt" onClick={submitButton} />
        </>
      ) : (
        <>AAAA</>
      )}
    </>
  );
  return (
    <Modal
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      label="Add Property"
      content={content}
    />
  );
};

export default AddPropertyModal;
