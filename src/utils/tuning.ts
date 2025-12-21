import { noteFrequencies } from "./constants";

export const getNoteSibling = (selectedNote: string, steps: number) => {
  const freqs = Object.values(noteFrequencies);
  const noteFreq = noteFrequencies[selectedNote];

  const index = freqs.findIndex((f) => f === noteFreq);

  const leftIndex = index - steps;
  const rightIndex = index + steps;

  const left = leftIndex >= 0 && freqs[leftIndex] ? freqs[leftIndex] : null;
  const right =
    rightIndex < freqs.length && freqs[rightIndex] ? freqs[rightIndex] : null;

  return [left, right];
};

const lastPitches: number[] = [];

export const smoothPitch = (pitch: number, bufferSize = 5) => {
  lastPitches.push(pitch);
  if (lastPitches.length > bufferSize) {
    lastPitches.shift();
  }

  const sum = lastPitches.reduce((a, b) => a + b, 0);
  return sum / lastPitches.length;
};

export const getTuningInPercent = (
  selectedNote: string,
  currPitch: number,
  rangeSteps: number
) => {
  const [left, right] = getNoteSibling(selectedNote, rangeSteps);

  if (!left || !right) {
    return -1;
  }

  const full = 1200 * Math.log2(right / left);
  const part = 1200 * Math.log2(currPitch / left);

  return Math.max(10, Math.min((part / full) * 100, 90));
};

export const isTuned = (currPitch: number, selectedNote: string) => {
  const percent = getTuningInPercent(selectedNote, currPitch, 1);

  return percent > 40 && percent < 60;
};
