"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  bookedDates,
}) => {
  return (
    <DateRange
      className="w-full border border-gray-400 rounded-xl mb-4"
      onChange={onChange}
      date={new Date()}
      direction="vertical"
      moveRangeOnFirstSelection={false}
      ranges={[value]}
      minDate={new Date()}
      rangeColors={["#262626"]}
      disabledDates={bookedDates}
    />
  );
};

export default DatePicker;
