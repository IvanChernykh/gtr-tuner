import React, { useEffect, useRef, useState } from "react";

import { getBtnCoords, getNoteSoundPath, preloadAudio } from "./helpers";
import { PitchMeter } from "./PitchMeter";
import { GuitarSVG } from "../ui/icons/guitar";

import type { Tuning } from "../../utils/constants";

interface TunerProps {
  selectedTuning: Tuning;
}

export const Tuner: React.FC<TunerProps> = ({ selectedTuning }) => {
  const [selectedNoteIdx, setSelectedNoteIdx] = useState(0);

  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const noteButtons = [...selectedTuning.notes].reverse();

  useEffect(() => {
    setSelectedNoteIdx(selectedTuning.notes.length - 1);

    noteButtons.forEach((note, idx) => {
      preloadAudio(audioRefs, note, idx);
    });
  }, [selectedTuning]);

  const handleBtnClick = (idx: number) => {
    setSelectedNoteIdx(idx);

    const audio = audioRefs.current[idx];

    if (!audio) {
      const newAudio = new Audio(getNoteSoundPath(noteButtons[idx]));
      newAudio.preload = "auto";
      audioRefs.current[idx] = newAudio;
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <>
      <PitchMeter selectedNote={noteButtons[selectedNoteIdx]} />

      <GuitarSVG>
        {noteButtons.map((note, idx, arr) => {
          const [x, y] = getBtnCoords(idx, arr.length);

          return (
            <foreignObject
              key={`${note}-${idx}`}
              x={x}
              y={y}
              width={40}
              height={40}
            >
              <button
                className={`btn xxs:btn-md btn-sm btn-circle transition-none ${
                  selectedNoteIdx === idx
                    ? "border-base bg-base-content text-base-100"
                    : "border-base-content"
                }`}
                onClick={() => handleBtnClick(idx)}
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
