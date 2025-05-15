/**
 * A simplified ParticlesBackground component that doesn't rely on external libraries
 * and won't cause styling conflicts
 */
const ParticlesBackground = () => {
  return (
    <div className="particles-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}>
      {/* Static background with gradient */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -5,
          background: 'linear-gradient(135deg, rgba(163, 217, 255, 0.05) 0%, rgba(201, 167, 235, 0.05) 100%)',
        }}
      />
      
      {/* Dots pattern background - made with pure CSS */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -5,
          opacity: 0.4,
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(163, 217, 255, 0.5) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(201, 167, 235, 0.3) 2px, transparent 2px)',
          backgroundSize: '100px 100px',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ParticlesBackground;