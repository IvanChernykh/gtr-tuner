import {
  noteFrequencies,
  tunings,
  type Tuning,
} from "../../../utils/constants";

export const customTuningDefault: Tuning = {
  id: "custom-user-tuning",
  name: "Custom Tuning",
  notes: ["E2", "A2", "D3", "G3", "B3", "E4"],
};

export const selectNames = [
  "6th string",
  "5th string",
  "4th string",
  "3rd string",
  "2nd string",
  "1st string",
];

export const selectOptions = Object.keys(noteFrequencies).filter(
  (item) => !item.includes("0") && !item.includes("6") && !item.includes("5")
);

export const isInputValid = (value: string) =>
  value.length > 0 && tunings.every((t) => t.name !== value);
