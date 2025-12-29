const SpiderBotAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/50 blur-md animate-pulse-glow" />
      
      {/* Avatar container */}
      <div className="relative w-full h-full rounded-full spider-gradient p-0.5 animate-float">
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
          {/* Spider icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-1/2 h-1/2 text-primary"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Spider body */}
            <circle cx="12" cy="10" r="3" fill="currentColor" />
            <circle cx="12" cy="15" r="4" fill="currentColor" />
            
            {/* Spider legs */}
            <path d="M9 10 L4 6" strokeLinecap="round" />
            <path d="M15 10 L20 6" strokeLinecap="round" />
            <path d="M8 12 L2 12" strokeLinecap="round" />
            <path d="M16 12 L22 12" strokeLinecap="round" />
            <path d="M8 15 L3 19" strokeLinecap="round" />
            <path d="M16 15 L21 19" strokeLinecap="round" />
            <path d="M9 17 L5 22" strokeLinecap="round" />
            <path d="M15 17 L19 22" strokeLinecap="round" />
            
            {/* Eyes */}
            <circle cx="10.5" cy="9" r="1" fill="hsl(var(--background))" />
            <circle cx="13.5" cy="9" r="1" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SpiderBotAvatar;
