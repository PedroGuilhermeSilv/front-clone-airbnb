import Select from "react-select";

import useCountries from "../hooks/useCountries";

export type SelectCountryValue = {
  label: string;
  value: string;
};

interface SelectCountryProps {
  value?: SelectCountryValue;
  onChange: (value: SelectCountryValue) => void;
}
const { getAll } = useCountries();
const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
  return (
    <>
      <Select
        isClearable
        placeholder={"Anywhere"}
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as SelectCountryValue)}
      />
    </>
  );
};

export default SelectCountry;
