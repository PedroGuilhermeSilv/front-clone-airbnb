"use client";
import useSearchLoginModal, { SearchQuery } from "../hooks/useSearchModels";
import Modal from "./Modal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchLoginModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("1");
  const [numBathrooms, setNumBathrooms] = useState<string>("1");
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: "",
    };
    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  const _setDateRange = (section: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }

    setDateRange(section);
  };

  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl"> Where do you want to go?</h2>
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />
      <CustomButton
        label="Check in ->"
        className="mt-6"
        onClick={() => searchModal.open("checkin")}
      />
    </>
  );

  const contentCheckin = (
    <>
      <h2 className="mb-6 text-2xl"> When do you want to check in?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="flex flex-row gap-4">
        <CustomButton
          label="Check out ->"
          className="mt-6"
          onClick={() => searchModal.open("checkout")}
        />

        <CustomButton
          label="<- Location"
          className="mt-6"
          onClick={() => searchModal.open("location")}
        />
      </div>
    </>
  );

  const contentCheckout = (
    <>
      <h2 className="mb-6 text-2xl"> When do you want to check out?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="flex flex-row gap-4">
        <CustomButton
          label="Details ->"
          className="mt-6"
          onClick={() => searchModal.open("details")}
        />

        <CustomButton
          label="<- Check in"
          className="mt-6"
          onClick={() => searchModal.open("checkin")}
        />
      </div>
    </>
  );

  const contentDetail = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>

      <div className="space-y-4">
        <div className=" space-y-4">
          <label>Number of guests</label>
          <input
            type="number"
            className="border w-full p-2 border-gray-300 rounded-xl"
            min="1"
            placeholder="Number of guests..."
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>

        <div className=" space-y-4">
          <label>Number of bedrooms</label>
          <input
            type="number"
            className="border w-full p-2 border-gray-300 rounded-xl"
            min="1"
            placeholder="Number of bedromms..."
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
          />
        </div>

        <div className=" space-y-4">
          <label>Number of bathrooms</label>
          <input
            type="number"
            className="border w-full p-2 border-gray-300 rounded-xl"
            min="1"
            placeholder="Number of bathrooms..."
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <CustomButton
          label="Search ->"
          className="mt-6"
          onClick={closeAndSearch}
        />

        <CustomButton
          label="<- Check out"
          className="mt-6"
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    </>
  );

  if (searchModal.step === "location") {
    content = contentLocation;
  } else if (searchModal.step === "checkin") {
    content = contentCheckin;
  } else if (searchModal.step === "checkout") {
    content = contentCheckout;
  } else if (searchModal.step === "details") {
    content = contentDetail;
  }

  return (
    <Modal
      label="Search"
      close={searchModal.close}
      isOpen={searchModal.isOpen}
      content={content}
    />
  );
};

export default SearchModal;
