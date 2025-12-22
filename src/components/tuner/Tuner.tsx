import React, { useEffect, useState } from "react";

import { PitchMeter } from "./PitchMeter";
import { GuitarSVG } from "../ui/icons/guitar";

import type { Tuning } from "../../utils/constants";

interface TunerProps {
  selectedTuning: Tuning;
}

const buttonsPos = [
  [225, 220],
  [202, 300],
  [179, 380],
  [156, 460],
  [133, 540],
  [110, 620],
];

export const Tuner: React.FC<TunerProps> = ({ selectedTuning }) => {
  const [selectedNote, setSelectedNote] = useState("E2");

  useEffect(() => {
    setSelectedNote(selectedTuning.notes[0]);
  }, [selectedTuning]);

  return (
    <>
      <PitchMeter selectedNote={selectedNote} />
      <GuitarSVG>
        {[...selectedTuning.notes].reverse().map((note, i, arr) => {
          const [x, y] =
            buttonsPos[
              (i + buttonsPos.length - arr.length) % buttonsPos.length
            ]; // make shift if there is less then 6 strings

          return (
            <foreignObject x={x} y={y} width={60} height={60} key={note}>
              <button
                className={`btn md:btn-md xxs:btn-sm btn-circle ${
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
            </foreignObject>
          );
        })}
      </GuitarSVG>
    </>
  );
};
