import { PitchDetector } from "pitchy";
import React, { useEffect, useRef } from "react";

import { colors } from "../../utils/colors";
import { getTuningInPercent, isTuned, smoothPitch } from "../../utils/tuning";

interface PitchMeterProps {
  selectedNote: string;
}

export const PitchMeter: React.FC<PitchMeterProps> = ({ selectedNote }) => {
  const selectedNoteRef = useRef<string>(selectedNote);

  const audioRef = useRef<AudioContext>(null);
  const analyserRef = useRef<AnalyserNode>(null);
  const detectorRef = useRef<PitchDetector<Float32Array>>(null);
  const inputRef = useRef<Float32Array<ArrayBuffer>>(null);

  const meterRef = useRef<HTMLDivElement>(null);
  const elapsedTime = useRef<number>(null);

  const start = () => {
    audioRef.current?.resume();

    const loop = () => {
      if (elapsedTime.current && Date.now() - elapsedTime.current < 25) {
        requestAnimationFrame(loop);
        return;
      }

      elapsedTime.current = Date.now();

      analyserRef.current!.getFloatTimeDomainData(inputRef.current!);
      const [p] = detectorRef.current!.findPitch(
        inputRef.current!,
        audioRef.current!.sampleRate
      );

      const pitch = smoothPitch(p);

      if (!pitch) {
        meterRef.current!.style.left = "50%";
        requestAnimationFrame(loop);
        return;
      }

      let percent = getTuningInPercent(selectedNoteRef.current, pitch, 2);

      if (percent < 0) {
        percent = 50;
      }

      if (isTuned(pitch, selectedNoteRef.current)) {
        meterRef.current!.style.color = colors.success;
        meterRef.current!.style.borderBottom = `1px solid ${colors.success}`;
      } else {
        meterRef.current!.style = "";
      }

      meterRef.current!.style.left = `${percent}%`;

      requestAnimationFrame(loop);
    };

    loop();
  };

  useEffect(() => {
    const init = async () => {
      const audio = new AudioContext();
      const analyser = audio.createAnalyser();
      analyser.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audio.createMediaStreamSource(stream).connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      detector.minVolumeDecibels = -15;

      const input = new Float32Array(detector.inputLength);

      audioRef.current = audio;
      analyserRef.current = analyser;
      detectorRef.current = detector;
      inputRef.current = input;
    };

    init().then(() => {
      start();
    });
  }, []);

  useEffect(() => {
    selectedNoteRef.current = selectedNote;
  }, [selectedNote]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-20 flex justify-between items-center w-full lg:max-w-200 md:max-w-150 max-w-120 p-4">
      <span className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl w-6">
        &#9837;
      </span>
      <div className="w-0.5 xl:h-18 lg:h-16 md:h-14 h-12 bg-error mx-auto" />
      <span className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl w-6">
        &#9839;
      </span>
      <div
        ref={meterRef}
        className="absolute left-1/2 -translate-x-1/2 rounded-4xl bg-neutral sm:text-sm text-xs font-semibold sm:w-9 sm:h-9 w-8 h-8 flex items-center justify-center text-neutral-content"
      >
        {selectedNote}
      </div>
    </div>
  );
};
