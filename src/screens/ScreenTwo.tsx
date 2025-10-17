import uiucPic from "../assets/uiuc pic.png";

export default function ScreenTwo() {
  return (
    <section id="page2" className="screen">
      <div className="screen-content about-content">
        <div className="about-text">
          <h1>About</h1>
          <p className="about-paragraph">
            MTCHacks is a Muslim-focused hackathon dedicated to solving
            challenges faced by the modern Ummah. You do not have to be Muslim
            to participate and/or win!
            {/* Only render <br />s if not on mobile */}
            {window.innerWidth > 600 && (
              <>
                <br />
                <br />
              </>
            )}
            Compete in one of our three tracks (two technical and one pitch
            competition) for a chance to win $2000! Feel free to come solo or
            with a team, all are welcome.
          </p>
        </div>
        <img src={uiucPic} alt="UIUC campus" className="about-image" />
      </div>
    </section>
  );
}
