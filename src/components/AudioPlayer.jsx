import { useRef, useState, useEffect } from "react";

// Components
import {
  VolumeLow1,
  VolumeHigh,
  VolumeSlash,
  ArrowLeft2,
  ArrowRight2,
  Pause,
} from "iconsax-react";

const AudioPlayer = ({ trackInfo, handleNext, handleBack }) => {
  // References
  const audioRef = useRef();

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
  }, [trackInfo]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  // Handlers
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-main flex items-center justify-between">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/75 font-bold z-50">
          Cargando...
        </div>
      )}
      <div className="text-primary w-full h-full flex justify-between items-center sm:pr-6">
        <div className="flex items-center">
          <div className="w-20 h-full">
            <img src={trackInfo?.album?.cover_big} alt="cover" />
          </div>
          <div className="text-primary px-4">
            <p className="font-bold text-base">
              {trackInfo?.title || "Cancion"}
            </p>
            <p className="text-sm text-black/50">
              {trackInfo?.artist?.name || "Artista"} -{" "}
              {trackInfo?.album?.title || "Album"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="hidden sm:block" onClick={handleBack}>
            <ArrowLeft2 variant="Bold" size={24} />
          </button>
          <button
            className="text-primary mx-4 bg-black/10 rounded-full h-12 w-12 flex items-center justify-center"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause variant="Bold" size={20} />
            ) : (
              <ArrowRight2 variant="Bold" size={28} />
            )}
          </button>
          <button className="hidden sm:block" onClick={handleNext}>
            <ArrowRight2 variant="Bold" size={24} />
          </button>
        </div>
        <div className="items-center hidden sm:flex">
          <button
            className="mr-4"
            onClick={() => setMuteVolume((prev) => !prev)}
          >
            {muteVolume || volume < 5 ? (
              <VolumeSlash variant="Linear" size={28} />
            ) : volume < 40 ? (
              <VolumeLow1 variant="Linear" size={28} />
            ) : (
              <VolumeHigh variant="Linear" size={28} />
            )}
          </button>
          <input
            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        className="hidden"
        src={trackInfo?.preview}
        onLoadedMetadata={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onEnded={() => {
          setIsPlaying(false);
          handleNext();
        }}
      />
    </div>
  );
};
export default AudioPlayer;
