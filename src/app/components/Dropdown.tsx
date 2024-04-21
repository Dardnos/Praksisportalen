import { useEffect, useState } from "react";

interface Option {
  id?: string;
  name: string;
  email?: string;
  image?: string;
}

interface DropdownProps {
  dropdownName?: string;
  options: Option[];
  selectedOption: Option | null;
  setSelectedOption: (option: Option) => void;
  renderOption: (option: Option) => JSX.Element;
  customClassName?: string;
  required?: boolean;
  onSearchChange?: (searchTerm: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  renderOption,
  dropdownName,
  customClassName,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
        option.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      )
    : [];

  return (
    <div className="dropdown dropdown-end w-full">
      <input
        type="text"
        placeholder={dropdownName}
        value={selectedOption ? selectedOption.name : searchTerm || ""}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (onSearchChange) {
            onSearchChange(e.target.value);
          }
        }}
        onClick={() => setIsDropdownOpen(true)}
        className={"input input-bordered w-full " + customClassName}
        aria-label={dropdownName}
      />
      {isDropdownOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full"
        >
          {filteredOptions.map((option, index) => (
            <li key={index} className="p-1">
              <div
                onClick={() => {
                  setSelectedOption(option);
                  setSearchTerm("");
                  setIsDropdownOpen(false);
                }}
                className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
              >
                {renderOption(option)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
