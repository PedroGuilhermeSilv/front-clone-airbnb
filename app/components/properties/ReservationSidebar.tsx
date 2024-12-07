"use client";
import React from "react";

import { useEffect, useState } from "react";
import { Range } from "react-date-range";

import apiService from "@/app/service/apiService";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import DatePicker from "../forms/Calendar";
import useLoginModal from "../hooks/useLoginModal";

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type PropertyType = {
  id: string;
  guests: number;
  price_per_night: number;
};

interface Reservation {
  id: string;
  property: string;
  start_date: Date;
  end_date: Date;
  number_of_nights: number;
  total_price: number;
}
type Response = Reservation[];
interface ReservationSidebarProps {
  userId?: string;
  property: PropertyType;
}
const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
  userId,
}) => {
  const longinModal = useLoginModal();
  const [guests, setGuests] = useState<string>("1");
  const [nights, setNights] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const guestsRange = Array.from({ length: property.guests }, (_, i) => i + 1);

  const formBooking = async () => {
    if (
      userId &&
      dateRange.startDate &&
      dateRange.endDate &&
      guests &&
      totalPrice &&
      nights
    ) {
      const formData = new FormData();
      formData.append("start_date", format(dateRange.startDate, "yyyy-MM-dd"));
      formData.append("guests", guests);
      formData.append("total_price", totalPrice.toString());
      formData.append("number_of_nights", nights.toString());
      formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));

      const response = await apiService.post(
        `/api/properties/${property.id}/book/`,
        formData
      );

      if (response.data === "Property booked successfully") {
      } else {

      }
    } else {
      longinModal.open();
    }
  };

  const getReservations = async () => {
    const response = await apiService.get<Response>(
      `/api/properties/${property.id}/reservations/`,
      "application/json",
      "application/json"
    );
    let dates: Date[] = [];

    response.data.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    setBookedDates(dates);
  };

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate < newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  useEffect(() => {
    getReservations();
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;
        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;
        setTotalPrice(property.price_per_night + _fee);
        setFee(_fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
    <aside className=" p-6 shadow-xl col-span-2 border rounded-xl border-gray-300">
      <h2 className=" mb-5 text-2xl">${property.price_per_night} per night</h2>
      <div className=" mb-5 border rounded-xl border-gray-300 p-3">
        <label className=" mb-2 block font-bold text-xs -ml-1">Guets</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className=" w-full -ml-1 text-xm bg-transparent"
        >
          {guestsRange.map((guest) => (
            <option key={guest} value={guest}>
              {guest}
            </option>
          ))}
        </select>
      </div>

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div
        onClick={formBooking}
        className="mb-6 text-white text-center text-xl p-6 bg-airbnb text border hover:bg-airbnb-dark rounded-xl items-center"
      >
        Book
      </div>
      <div className="flex justify-between mb-2 ">
        <p>
          ${property.price_per_night}*{nights} nights
        </p>{" "}
        <p>${property.price_per_night * nights}</p>
      </div>
      <div className="flex justify-between mb-3">
        <p>Djangobnb</p> <p>${fee}</p>
      </div>
      <hr />
      <div className=" mt-1 flex justify-between font-bold">
        <p>Total</p> <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
