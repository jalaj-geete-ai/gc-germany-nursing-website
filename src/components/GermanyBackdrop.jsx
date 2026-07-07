import berlinSkyline from '../assets/brand/berlin-skyline.jpg';

export default function GermanyBackdrop() {
  return (
    <>
      <div className="hero-bg" style={{ backgroundImage: `url(${berlinSkyline})` }} />
      <div className="hero-bg-scrim" />
    </>
  );
}
