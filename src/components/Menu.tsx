import React from "react";

import { Dropdown } from "./ui/Dropdown";
import { tunings } from "../utils/constants";
import { DarkModeController } from "./ui/DarkModeController";
import { CaretDown } from "./ui/icons/Arrows";

interface MenuProps {
  selectedTuning: string;
  setSelectedTuning: React.Dispatch<React.SetStateAction<string>>;
}

export const Menu: React.FC<MenuProps> = ({
  selectedTuning,
  setSelectedTuning,
}) => {
  const handleTuningChange = (id: string) => {
    setSelectedTuning(id);
  };

  return (
    <div className="w-full h-16 flex items-center justify-between py-2 px-4">
      <div className="flex gap-4">
        {/* <Dropdown
          className="w-25"
          items={instruments.map((item) => ({ id: item, component: item }))}
          onItemClick={handleInstrumentChange}
        >
          {selectedInstrument}
          <CaretDown />
        </Dropdown> */}
        <Dropdown
          className="w-44"
          items={tunings.map(({ name }) => ({ id: name, component: name }))}
          onItemClick={handleTuningChange}
        >
          {selectedTuning}
          <CaretDown />
        </Dropdown>
      </div>
      <DarkModeController />
    </div>
  );
};
