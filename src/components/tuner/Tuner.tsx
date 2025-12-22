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
      <div className="absolute sm:bottom-16 bottom-12 h-[calc(100vh-128px)] left-1/2 -translate-x-1/2 z-20 flex flex-col justify-center items-start gap-[4%] w-full lg:max-w-200 md:max-w-150 max-w-120 p-4">
        {selectedTuning.notes
          .map((note) => (
            <button
              key={note}
              className={`btn md:btn-md btn-sm btn-circle ${
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
