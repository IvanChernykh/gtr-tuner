import React, { useState } from "react";

import { PitchMeter } from "./PitchMeter";
import { GuitarSVG } from "../ui/icons/guitar";

import type { Tuning } from "../../utils/constants";

interface TunerProps {
  selectedTuning: Tuning;
}

export const Tuner: React.FC<TunerProps> = ({ selectedTuning }) => {
  const [selectedNote, setSelectedNote] = useState("");

  return (
    <div className="w-full">
      <PitchMeter selectedTuning={selectedTuning} selectedNote={selectedNote} />
      <div className="flex flex-col justify-start gap-2">
        {selectedTuning.notes
          .map((note) => (
            <button
              key={note}
              className="btn btn-circle"
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              {note}
            </button>
          ))
          .reverse()}
        <div>selected: {selectedNote}</div>
      </div>
      <GuitarSVG />
    </div>
  );
};
