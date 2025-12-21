import { PitchDetector } from "pitchy";
import React, { useEffect, useRef, useState } from "react";

import { type Tuning } from "../../utils/constants";
import { getTuningInPercent, isTuned, smoothPitch } from "../../utils/tuning";

interface PitchMeterProps {
  selectedTuning: Tuning;
  selectedNote: string;
}

export const PitchMeter: React.FC<PitchMeterProps> = ({
  // selectedTuning,
  selectedNote,
}) => {
  const audioRef = useRef<AudioContext>(null);
  const analyserRef = useRef<AnalyserNode>(null);
  const detectorRef = useRef<PitchDetector<Float32Array>>(null);
  const inputRef = useRef<Float32Array<ArrayBuffer>>(null);
  const rafRef = useRef<number>(null);

  const meterRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<number>(0);

  const [clarity, setClarity] = useState(0);
  // const [isListening, setIsListening] = useState(false);

  const start = () => {
    // setIsListening(true);
    audioRef.current?.resume();

    const loop = () => {
      analyserRef.current!.getFloatTimeDomainData(inputRef.current!);
      const [p, c] = detectorRef.current!.findPitch(
        inputRef.current!,
        audioRef.current!.sampleRate
      );
      pitchRef.current = p;
      setClarity(c);

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
  };
  const selectedNoteRef = useRef<string>(selectedNote);

  useEffect(() => {
    const init = async () => {
      const audio = new AudioContext();
      const analyser = audio.createAnalyser();
      analyser.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audio.createMediaStreamSource(stream).connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      detector.minVolumeDecibels = -20;
      const input = new Float32Array(detector.inputLength);

      audioRef.current = audio;
      analyserRef.current = analyser;
      detectorRef.current = detector;
      inputRef.current = input;
    };

    init().then(() => {
      start();
    });

    function updatePosition() {
      const pitch = smoothPitch(pitchRef.current);

      console.log({ pitchSmooth: pitch, pitchOriginal: pitchRef.current });

      if (!pitch) {
        meterRef.current!.style.left = "50%";
        requestAnimationFrame(updatePosition);
        return;
      }

      let percent = getTuningInPercent(selectedNoteRef.current, pitch, 2);

      console.log({ percent, pitch });

      if (percent < 0) {
        percent = 50;
      }

      if (isTuned(pitch, selectedNoteRef.current)) {
        meterRef.current!.style.color = "red";
      } else {
        meterRef.current!.style = "";
      }

      meterRef.current!.style.left = `${percent}%`;
      requestAnimationFrame(updatePosition);
    }

    requestAnimationFrame(updatePosition);
  }, []);

  useEffect(() => {
    selectedNoteRef.current = selectedNote;
  }, [selectedNote]);

  // const stop = () => {
  //   if (rafRef.current) {
  //     cancelAnimationFrame(rafRef.current);
  //   }
  //   audioRef.current?.suspend();
  //   setPitch(0);
  //   setClarity(0);
  //   setIsListening(false);
  // };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-20 flex justify-between items-center w-full lg:max-w-200 max-w-120 p-4">
      <span className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl">
        &#9837;
      </span>
      <div className="w-0.5 xl:h-16 lg:h-14 md:h-12 sm:h-10 h-8 bg-error mx-auto" />
      <span className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl">
        &#9839;
      </span>
      <div
        ref={meterRef}
        className="absolute left-1/2 -translate-x-1/2 rounded-4xl bg-neutral w-8 h-8 flex items-center justify-center text-neutral-content"
      >
        {/* <span className="text-neutral-content">{selectedNote}</span> */}
        {selectedNote}
      </div>
      <div className="absolute top-24">
        <span className="text-3xl">Clarity: {Math.round(clarity * 100)}</span>
      </div>
    </div>
  );
};
