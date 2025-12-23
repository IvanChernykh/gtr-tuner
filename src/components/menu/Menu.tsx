import React from "react";

import { DarkModeController } from "./DarkModeController";
import { renderTuningsList } from "./TuningsList";
import { tunings, type Tuning } from "../../utils/constants";
import { Dropdown } from "../ui/Dropdown";
import { CaretDown } from "../ui/icons/Arrows";

interface MenuProps {
  selectedTuning: Tuning;
  setSelectedTuning: React.Dispatch<React.SetStateAction<Tuning>>;
}

export const Menu: React.FC<MenuProps> = ({
  selectedTuning,
  setSelectedTuning,
}) => {
  const handleTuningChange = (id: string) => {
    setSelectedTuning(tunings.filter((item) => item.name === id)[0]);
  };

  return (
    <div className="w-full sm:h-16 h-12 flex items-center justify-between py-2 sm:px-4 px-2 border-b">
      <div className="flex gap-4">
        <Dropdown
          className="sm:w-44 w-40"
          onItemClick={handleTuningChange}
          renderItems={renderTuningsList}
        >
          {selectedTuning.name}
          <CaretDown />
        </Dropdown>
      </div>
      <DarkModeController />
    </div>
  );
};
