import './BackgroundEffects.css'

export default function BackgroundEffects() {
  return (
    <div className="bg-effects-container">
      {/* Dynamic Floating Glow Orbs */}
      <div className="bg-orb orb-indigo" />
      <div className="bg-orb orb-purple" />
      <div className="bg-orb orb-pink" />
      
      {/* High-End Digital Dot Matrix Overlay */}
      <div className="grid-overlay" />
      
      {/* Subtle Horizontal Neon Beam under the header */}
      <div className="neon-top-beam" />
    </div>
  )
}
