import hopprLogo from "../assets/hoppr logo.png";

export default function ScreenFive() {
  return (
    <section id="page5" className="screen">
      <div className="screen-content sponsors-section">
        <h1>Sponsored By</h1>
        <div className="sponsor-logos">
          <a
            href="https://www.hoppr.ai/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hoppr website"
          >
            <img src={hopprLogo} alt="Hoppr" className="sponsor-logo" />
          </a>
        </div>
      </div>
    </section>
  );
}
