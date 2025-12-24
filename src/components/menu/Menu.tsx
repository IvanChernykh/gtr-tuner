import React, { useEffect, useRef, useState } from "react";

import { DarkModeController } from "./DarkModeController";
import { TuningsList } from "./TuningsList";
import { tunings, type Tuning } from "../../utils/constants";
import { localStorageKeys } from "../../utils/localStorage";
import { CustomTuningModal } from "../ui/CustomTuningModal/CustomTuningModal";
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
  const [customTuning, setCustomTuning] = useState<Tuning | null>(
    JSON.parse(localStorage.getItem(localStorageKeys.customTuning) || "null")
  );

  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (customTuning?.id === selectedTuning.id) {
      setSelectedTuning(customTuning);
    }
  }, [customTuning]);

  const handleTuningChange = (id: string) => {
    if (id === customTuning?.name) {
      setSelectedTuning(customTuning);
    } else {
      setSelectedTuning(tunings.filter((item) => item.name === id)[0]);
    }
  };

  const openTuningModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className="w-full sm:h-16 h-12 flex items-center justify-between py-2 sm:px-4 px-2 border-b">
      <div className="flex gap-4">
        <Dropdown
          className="sm:w-44 w-40"
          onItemClick={handleTuningChange}
          renderItems={(handleItemClick) => (
            <TuningsList
              customTuning={customTuning}
              handleItemClick={handleItemClick}
              openModal={openTuningModal}
            />
          )}
        >
          <div className="w-full flex items-center justify-between">
            <div className="truncate">{selectedTuning.name}</div>
            <CaretDown />
          </div>
        </Dropdown>
      </div>
      <DarkModeController />

      <CustomTuningModal
        ref={modalRef}
        customTuning={customTuning}
        setCustomTuning={setCustomTuning}
      />
    </div>
  );
};
