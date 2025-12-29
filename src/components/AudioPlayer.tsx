import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Download } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

export const AudioPlayer = ({ src, title = "Dreamer", artist = "Ava" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    audio.currentTime = clickPosition * audio.duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative backdrop-blur-xl bg-secondary/30 border border-border/30 rounded-2xl p-6 max-w-md w-full animate-fade-in-up animation-delay-600">
      <audio ref={audioRef} src={src} loop />
      
      {/* Track Info */}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl text-foreground tracking-wide">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{artist}</p>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-1 bg-muted rounded-full cursor-pointer mb-4 overflow-hidden group"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-gradient-to-r from-calm-ocean to-calm-glow rounded-full transition-all duration-100 group-hover:h-1.5"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <span>{formatTime((progress / 100) * duration)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 text-foreground/70 hover:text-foreground"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button
          onClick={togglePlay}
          className={`p-5 rounded-full transition-all duration-500 ${
            isPlaying
              ? "bg-primary/20 text-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]" 
              : "bg-primary text-primary-foreground hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
          } animate-breathe`}
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>

        <a
          href={src}
          download={`${title} - ${artist}.mp3`}
          className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 text-foreground/70 hover:text-foreground"
        >
          <Download size={20} />
        </a>
      </div>
    </div>
  );
};
