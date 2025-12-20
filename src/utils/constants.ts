export type Tuning = {
  name: string;
  //   notes: string[];
};

export const tunings: Tuning[] = [
  { name: "Standard Tuning" },
  { name: "Drop D" },
  { name: "Open D" },
  { name: "Open G" },
  { name: "DADGAD" },
];

export const noteFrequencies = {
  C1: 32.7,
  D1: 36.71,
  E1: 41.2,
  F1: 43.65,
  G1: 49.0,
  A1: 55.0,
  B1: 61.74,

  C2: 65.41,
  D2: 73.42,
  E2: 82.41,
  F2: 87.31,
  G2: 98.0,
  A2: 110.0,
  B2: 123.47,

  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,

  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,

  C5: 523.25,
  D5: 587.33,
  E5: 659.26,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,

  C6: 1046.5,
};

// const cents = 1200 * Math.log2(freq / targetFreq);
