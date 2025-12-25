import React, { useEffect, useRef, useState } from "react";

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

const getNoteSoundPath = (note: string) =>
  `${import.meta.env.BASE_URL}sfx/${note.replace("#", "_sharp_")}.wav`;

const getBtnCoords = (idx: number, arrLen: number) =>
  buttonsPos[(idx + buttonsPos.length - arrLen) % buttonsPos.length]; // make shift if there is less then 6 strings

export const Tuner: React.FC<TunerProps> = ({ selectedTuning }) => {
  const [selectedNoteIdx, setSelectedNoteIdx] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSelectedNoteIdx(selectedTuning.notes.length - 1);

    selectedTuning.notes.forEach((note) => {
      const url = getNoteSoundPath(note);

      fetch(url, { cache: "force-cache" });
    });
  }, [selectedTuning]);

  const noteButtons = [...selectedTuning.notes].reverse();

  const handleBtnClick = (noteIdx: number) => {
    setSelectedNoteIdx(noteIdx);

    if (audioRef.current) {
      audioRef.current.src = getNoteSoundPath(noteButtons[noteIdx]);

      audioRef.current.play();
    }
  };

  return (
    <>
      <audio ref={audioRef}></audio>
      <PitchMeter selectedNote={noteButtons[selectedNoteIdx]} />
      <GuitarSVG>
        {noteButtons.map((note, idx, arr) => {
          const [x, y] = getBtnCoords(idx, arr.length);

          return (
            <foreignObject
              x={x}
              y={y}
              width={40}
              height={40}
              key={`note-${idx}`}
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
