import React, { useState } from "react";

import { Menu } from "./Menu";
import { tunings } from "../utils/constants";
import { Tuner } from "./tuner/Tuner";

export const MainScreen: React.FC = () => {
  const [selectedTuning, setSelectedTuning] = useState<string>(tunings[0].name);

  return (
    <div className="h-screen overflow-hidden relative">
      <Menu
        selectedTuning={selectedTuning}
        setSelectedTuning={setSelectedTuning}
      />
      <Tuner />
    </div>
  );
};
