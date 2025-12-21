import React, { useEffect, useState } from "react";

import { PitchMeter } from "./PitchMeter";
import { GuitarSVG } from "../ui/icons/guitar";

import type { Tuning } from "../../utils/constants";

interface TunerProps {
  selectedTuning: Tuning;
}

export const Tuner: React.FC<TunerProps> = ({ selectedTuning }) => {
  const [selectedNote, setSelectedNote] = useState("E2");

  useEffect(() => {
    setSelectedNote(selectedTuning.notes[0]);
  }, [selectedTuning]);

  return (
    <>
      <PitchMeter selectedNote={selectedNote} />
      <div className="absolute bottom-58 left-1/2 -translate-x-1/2 z-20 flex flex-col justify-start gap-8.5 w-full lg:max-w-200 max-w-120 p-4">
        {selectedTuning.notes
          .map((note) => (
            <button
              key={note}
              className={`btn btn-circle ${
                selectedNote === note
                  ? "border-base bg-base-content text-base-100"
                  : "border-base-content"
              }`}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              {note}
            </button>
          ))
          .reverse()}
      </div>
      <GuitarSVG />
    </>
  );
};
