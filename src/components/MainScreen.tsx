import React, { useState } from "react";

import { Menu } from "./Menu";
import { tunings, type Tuning } from "../utils/constants";
import { Tuner } from "./tuner/Tuner";

export const MainScreen: React.FC = () => {
  const [selectedTuning, setSelectedTuning] = useState<Tuning>(tunings[0]);

  return (
    <div className="h-screen overflow-hidden relative">
      <Menu
        selectedTuning={selectedTuning}
        setSelectedTuning={setSelectedTuning}
      />
      <Tuner selectedTuning={selectedTuning} />
    </div>
  );
};
