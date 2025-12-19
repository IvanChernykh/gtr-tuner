import { PitchDetector } from "pitchy";
import { useEffect, useRef, useState } from "react";

function App() {
  const audioRef = useRef<AudioContext>(null);
  const analyserRef = useRef<AnalyserNode>(null);
  const detectorRef =
    useRef<PitchDetector<Float32Array<ArrayBufferLike>>>(null);
  const inputRef = useRef<Float32Array<ArrayBuffer>>(null);
  const rafRef = useRef<number>(null);

  const [pitch, setPitch] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const init = async () => {
      const audio = new AudioContext();
      const analyser = audio.createAnalyser();
      analyser.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audio.createMediaStreamSource(stream).connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      detector.minVolumeDecibels = -25;
      const input = new Float32Array(detector.inputLength);

      audioRef.current = audio;
      analyserRef.current = analyser;
      detectorRef.current = detector;
      inputRef.current = input;
    };

    init();
  }, []);

  const start = () => {
    setIsListening(true);
    audioRef.current?.resume();

    const loop = () => {
      analyserRef.current!.getFloatTimeDomainData(inputRef.current!);
      const [p, c] = detectorRef.current!.findPitch(
        inputRef.current!,
        audioRef.current!.sampleRate
      );
      setPitch(p);
      setClarity(c);

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const stop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    audioRef.current?.suspend();
    setPitch(0);
    setClarity(0);
    setIsListening(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div>Pitch: {Math.round(pitch * 10) / 10} HZ</div>
        <div>Clarity: {Math.round(clarity * 100)}</div>
        <div className="mt-2 flex justify-center gap-2">
          <button
            onClick={start}
            className="bg-blue-400 hover:bg-blue-500 enabled:hover:cursor-pointer rounded p-2 disabled:bg-blue-200"
            disabled={isListening}
          >
            start recording
          </button>
          <button
            onClick={stop}
            className="bg-blue-400 hover:bg-blue-500 enabled:hover:cursor-pointer rounded p-2 disabled:bg-blue-200"
            disabled={!isListening}
          >
            stop recording
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
