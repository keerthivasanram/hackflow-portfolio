import './BackgroundEffects.css'

export default function BackgroundEffects() {
  return (
    <div className="bg-effects-container">
      {/* Kresai Brand Dynamic Floating Glow Orbs */}
      <div className="bg-orb orb-pink" />
      <div className="bg-orb orb-purple" />
      <div className="bg-orb orb-blue" />
      
      {/* High-End Digital Dot Matrix Overlay */}
      <div className="grid-overlay" />
      
      {/* Subtle Horizontal Neon Beam under the header */}
      <div className="neon-top-beam" />
    </div>
  )
}
