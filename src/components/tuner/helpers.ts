export const buttonsPos = [
  [225, 220],
  [202, 300],
  [179, 380],
  [156, 460],
  [133, 540],
  [110, 620],
];

export const getBtnCoords = (idx: number, arrLen: number) =>
  buttonsPos[(idx + buttonsPos.length - arrLen) % buttonsPos.length];

export const getNoteSoundPath = (note: string) =>
  `${import.meta.env.BASE_URL}sfx/${note.replace("#", "_sharp_")}.wav`;

export const preloadAudio = (
  audioRefs: React.RefObject<HTMLAudioElement[]>,
  note: string,
  idx: number
) => {
  let audio = audioRefs.current[idx];

  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    audioRefs.current[idx] = audio;
  }

  audio.src = getNoteSoundPath(note);

  audio.volume = 0;
  audio
    .play()
    .catch(() => {})
    .finally(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    });
};
