/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Music as MusicIcon, Gamepad2, Zap, FileText, Shield, Terminal as TerminalIcon } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-[#00ffff] font-sans selection:bg-[#ff00ff]/30 overflow-hidden crt-flicker relative">
      {/* Static Noise Overlay */}
      <div className="fixed inset-0 static-noise z-50 pointer-events-none" />
      <div className="fixed inset-0 scanline z-50 pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-end mb-12 border-b-2 border-[#ff00ff] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-[#ff00ff] fill-[#ff00ff]/20" size={18} />
              <span className="text-xs uppercase tracking-[0.5em] font-pixel text-[#ff00ff]">UPLINK_ESTABLISHED</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter uppercase leading-none font-pixel glitch-text">
              VOID_<span className="text-[#ff00ff]">RUNNER</span>
            </h1>
          </div>
          
          <div className="flex gap-8 font-pixel">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#ff00ff] mb-1">DATA_HARVEST</p>
              <p className="text-3xl font-bold text-[#00ffff] tabular-nums leading-none">
                {score.toString().padStart(4, '0')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#ff00ff] mb-1">PEAK_EFFICIENCY</p>
              <div className="flex items-center justify-end gap-2">
                <Trophy size={16} className="text-[#ff00ff]" />
                <p className="text-3xl font-bold text-[#ff00ff] tabular-nums leading-none">
                  {highScore.toString().padStart(4, '0')}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
          {/* Left Sidebar - Machine Directives */}
          <div className="col-span-3 flex flex-col gap-6">
            <div className="bg-[#000] border-2 border-[#00ffff] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00ffff]/20 animate-pulse" />
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="text-[#ff00ff]" size={20} />
                <h2 className="text-sm font-pixel uppercase tracking-wider text-[#ff00ff]">DIRECTIVES</h2>
              </div>
              <ul className="space-y-3 text-lg font-bold">
                <li className="flex justify-between items-center border-b border-[#00ffff]/20 pb-1">
                  <span>ASCEND</span>
                  <span className="text-[#ff00ff]">[↑]</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#00ffff]/20 pb-1">
                  <span>DESCEND</span>
                  <span className="text-[#ff00ff]">[↓]</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#00ffff]/20 pb-1">
                  <span>RETREAT</span>
                  <span className="text-[#ff00ff]">[←]</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#00ffff]/20 pb-1">
                  <span>ADVANCE</span>
                  <span className="text-[#ff00ff]">[→]</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#000] border-2 border-[#ff00ff] p-6 flex-1 relative">
              <div className="flex items-center gap-3 mb-4">
                <MusicIcon className="text-[#00ffff]" size={20} />
                <h2 className="text-sm font-pixel uppercase tracking-wider text-[#00ffff]">SIGNAL_FEED</h2>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-[#00ffff]/10 border border-[#00ffff]/30 relative">
                  <motion.div 
                    className="h-full bg-[#ff00ff]"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-xl leading-tight text-[#00ffff] font-bold">
                  CONSUME_DATA. AVOID_COLLISION. THE_GRID_IS_ABSOLUTE.
                </p>
              </div>
            </div>
          </div>

          {/* Center - Execution Chamber */}
          <div className="col-span-6 flex flex-col">
            <div className="flex-1 relative group">
              <div className="absolute -inset-1 bg-[#ff00ff] opacity-20 group-hover:opacity-40 transition duration-100"></div>
              <div className="relative h-full bg-[#000] border-4 border-[#00ffff] overflow-hidden flex items-center justify-center p-4">
                <SnakeGame onScoreChange={handleScoreChange} />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Audio Processor */}
          <div className="col-span-3 flex flex-col gap-6">
            <MusicPlayer />
            
            <div className="bg-[#000] border-2 border-[#00ffff] p-6 flex-1 overflow-y-auto">
              <h2 className="text-xs font-pixel uppercase tracking-widest text-[#ff00ff] mb-4">QUEUE_STACK</h2>
              <div className="space-y-4">
                {[
                  { title: "NEON_PULSE", artist: "SYNTH_AI", time: "03:45" },
                  { title: "CYBER_DRIFT", artist: "TECH_MIND", time: "04:12" },
                  { title: "MIDNIGHT_GRID", artist: "LOFI_CORE", time: "02:58" }
                ].map((track, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-[#00ffff]/10 pb-2">
                    <div>
                      <p className="text-lg font-bold group-hover:text-[#ff00ff] transition-colors">{track.title}</p>
                      <p className="text-xs text-[#00ffff]/60">{track.artist}</p>
                    </div>
                    <span className="text-xs font-mono text-[#ff00ff]">{track.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 py-6 border-t-2 border-[#ff00ff] flex justify-between items-center">
          <p className="text-xs uppercase tracking-widest text-[#00ffff] font-bold">
            [TERMINAL_ID: 0x7F4A] // PROTOCOL_V.2.5
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[#00ffff] hover:text-[#ff00ff] transition-all duration-100">
              <FileText size={24} />
            </a>
            <a href="#" className="text-[#00ffff] hover:text-[#ff00ff] transition-all duration-100">
              <Shield size={24} />
            </a>
            <a href="#" className="text-[#00ffff] hover:text-[#ff00ff] transition-all duration-100">
              <TerminalIcon size={24} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

