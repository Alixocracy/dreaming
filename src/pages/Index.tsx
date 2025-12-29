import { AudioPlayer } from "@/components/AudioPlayer";
import { FloatingParticles } from "@/components/FloatingParticles";
import calmBackground from "@/assets/calm-background.jpg";
import dreamerAudio from "@/assets/dreamer-by-ava.mp3";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${calmBackground})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-calm-deep via-transparent to-calm-deep/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-calm-deep/20 to-calm-deep/80" />
      
      {/* Animated Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--calm-deep)/0.4)_70%,hsl(var(--calm-deep)/0.8)_100%)]" />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl font-light text-foreground tracking-wider mb-4">
            Find Your
            <span className="block mt-2 bg-gradient-to-r from-calm-ocean via-calm-glow to-calm-twilight bg-clip-text text-transparent">
              Dream
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light tracking-wide animate-fade-in-up animation-delay-200">
            Breathe. Listen. Be present.
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="mb-12 animate-fade-in-up animation-delay-400">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full border border-calm-glow/30 animate-breathe" />
            <div className="absolute inset-4 rounded-full border border-calm-ocean/40 animate-breathe animation-delay-200" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-calm-ocean/20 to-calm-twilight/20 animate-breathe animation-delay-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-light tracking-widest animate-pulse-soft">
                BREATHE
              </span>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <AudioPlayer src={dreamerAudio} title="Dreamer" artist="Ava" />

        {/* Subtle Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
            A moment of peace
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
