import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "SynthWave AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/neon1/400/400",
  },
  {
    id: 2,
    title: "Cyber Drift",
    artist: "TechnoMind",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/cyber/400/400",
  },
  {
    id: 3,
    title: "Midnight Grid",
    artist: "LoFi Core",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/grid/400/400",
  },
];

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', skipForward);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', skipForward);
    };
  }, []);

  return (
    <div className="bg-[#000] border-2 border-[#ff00ff] p-6 relative overflow-hidden">
      <div className="flex items-center gap-6">
        {/* Cover Art */}
        <div className="relative w-20 h-20 rounded-none overflow-hidden border-2 border-[#00ffff] shadow-[4px_4px_0_#ff00ff]">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-full object-cover transition-transform duration-700 grayscale contrast-150 ${isPlaying ? 'scale-110' : 'scale-100'}`}
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#00ffff]/20">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 bg-[#ff00ff] animate-bounce"
                    style={{ height: '16px', animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-pixel text-[#00ffff] truncate mb-1">{currentTrack.title}</h3>
          <p className="text-[#ff00ff] text-xs font-bold mb-4 uppercase tracking-tighter">{currentTrack.artist}</p>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#00ffff]/10 border border-[#00ffff]/30 relative mb-4">
            <div
              className="h-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={skipBackward} className="text-[#00ffff] hover:text-[#ff00ff] transition-colors">
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center bg-[#ff00ff] text-[#000] rounded-none hover:bg-[#00ffff] transition-all transform hover:scale-110 shadow-[4px_4px_0_#00ffff]"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
              <button onClick={skipForward} className="text-[#00ffff] hover:text-[#ff00ff] transition-colors">
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[#00ffff]/40">
              <Volume2 size={16} />
              <div className="w-12 h-1 bg-[#00ffff]/10">
                <div className="w-2/3 h-full bg-[#00ffff]/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.url} />
    </div>
  );
};

export default MusicPlayer;
