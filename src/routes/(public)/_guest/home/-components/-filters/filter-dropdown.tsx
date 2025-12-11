import { useState } from "react";

import { ChevronDownIcon } from "../../assets/icons";
import type { DropdownOption } from "../../shared";

type FilterDropdownProps = {
  placeholder: string;
  options: DropdownOption[];
  value: string | null;
  onChange?: (value: string | null) => void;
};

export const FilterDropdown = ({ onChange, options, placeholder, value }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((option) => {
      return option.value === value;
    }) ?? null;

  const displayText = selectedOption?.label ?? placeholder;

  const handleSelect = (option: DropdownOption | null) => {
    setIsOpen(false);
    onChange?.(option ? option.value : null);
  };

  return (
    <div className="relative inline-flex flex-col items-start justify-start self-stretch lg:w-56">
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div
          className="inline-flex h-10 cursor-pointer items-center justify-start self-stretch overflow-hidden rounded-md bg-background-surface outline-1 -outline-offset-1 outline-border-default"
          onClick={() => {
            return setIsOpen((prev) => {
              return !prev;
            });
          }}
        >
          <div className="flex flex-1 items-center justify-start overflow-hidden">
            <div className="flex flex-1 items-center justify-between self-stretch px-3 py-1.5">
              <span className="line-clamp-1 flex-1 justify-start text-sm leading-5 font-normal text-text-primary">
                {displayText}
              </span>
            </div>

            <div className="flex items-center justify-start gap-2 self-stretch pr-3">
              <div className="relative size-4">
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="absolute top-full left-0 z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border-default bg-background-surface shadow-md">
          <button
            className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => {
              return handleSelect(null);
            }}
          >
            {placeholder}
          </button>

          {options.map((option) => {
            return (
              <button
                className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
                key={option.value}
                onClick={() => {
                  return handleSelect(option);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
