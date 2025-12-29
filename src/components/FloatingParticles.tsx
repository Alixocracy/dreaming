import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "dust" | "star" | "sparkle";
}

interface FogLayer {
  id: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fogLayers, setFogLayers] = useState<FogLayer[]>([]);

  useEffect(() => {
    // Generate dust particles
    const dustParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      dustParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.1,
        type: "dust",
      });
    }

    // Generate stars
    const stars: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        id: i + 100,
        x: Math.random() * 100,
        y: Math.random() * 60, // Stars mostly in upper portion
        size: Math.random() * 2 + 1,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.8 + 0.2,
        type: "star",
      });
    }

    // Generate sparkles
    const sparkles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      sparkles.push({
        id: i + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2,
        type: "sparkle",
      });
    }

    setParticles([...dustParticles, ...stars, ...sparkles]);

    // Generate fog layers
    const fog: FogLayer[] = [];
    for (let i = 0; i < 5; i++) {
      fog.push({
        id: i,
        y: 40 + Math.random() * 40, // Fog in middle-lower area
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    setFogLayers(fog);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Fog layers */}
      {fogLayers.map((fog) => (
        <div
          key={`fog-${fog.id}`}
          className="absolute h-32 md:h-48 animate-drift"
          style={{
            top: `${fog.y}%`,
            left: "-20%",
            right: "-20%",
            opacity: fog.opacity,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              hsl(var(--calm-mist) / 0.3) 20%, 
              hsl(var(--calm-mist) / 0.5) 50%, 
              hsl(var(--calm-mist) / 0.3) 80%, 
              transparent 100%
            )`,
            filter: "blur(40px)",
            animationDuration: `${fog.duration}s`,
            animationDelay: `${fog.delay}s`,
          }}
        />
      ))}

      {/* Additional fog wisps */}
      <div 
        className="absolute inset-x-0 top-1/2 h-64 animate-drift-slow opacity-20"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 30% 50%, hsl(var(--calm-ocean) / 0.3), transparent)`,
          filter: "blur(60px)",
        }}
      />
      <div 
        className="absolute inset-x-0 top-1/3 h-48 animate-drift-reverse opacity-15"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 70% 50%, hsl(var(--calm-twilight) / 0.2), transparent)`,
          filter: "blur(50px)",
        }}
      />

      {/* Particles */}
      {particles.map((particle) => {
        if (particle.type === "star") {
          return (
            <div
              key={particle.id}
              className="absolute animate-twinkle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              <div
                className="relative"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
              >
                {/* Star cross */}
                <div 
                  className="absolute inset-0 bg-foreground rounded-full"
                  style={{ opacity: particle.opacity }}
                />
                <div 
                  className="absolute bg-foreground/50"
                  style={{
                    left: "50%",
                    top: "-50%",
                    width: "1px",
                    height: `${particle.size * 2}px`,
                    transform: "translateX(-50%)",
                    opacity: particle.opacity * 0.5,
                  }}
                />
                <div 
                  className="absolute bg-foreground/50"
                  style={{
                    top: "50%",
                    left: "-50%",
                    height: "1px",
                    width: `${particle.size * 2}px`,
                    transform: "translateY(-50%)",
                    opacity: particle.opacity * 0.5,
                  }}
                />
              </div>
            </div>
          );
        }

        if (particle.type === "sparkle") {
          return (
            <div
              key={particle.id}
              className="absolute animate-sparkle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                background: `radial-gradient(circle, hsl(var(--calm-glow)) 0%, transparent 70%)`,
                boxShadow: `0 0 ${particle.size * 3}px hsl(var(--calm-glow) / 0.6)`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          );
        }

        // Dust particles
        return (
          <div
            key={particle.id}
            className="absolute rounded-full bg-calm-mist animate-float-drift"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px hsl(var(--calm-mist) / 0.3)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};
