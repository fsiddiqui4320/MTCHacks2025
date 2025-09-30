import uiucPic from "../assets/uiuc pic.png";

export default function ScreenTwo() {
  return (
    <section id="page2" className="screen">
      <div className="screen-content about-content">
        <div className="about-text">
          <h1>About</h1>
          <p className="about-paragraph">
            Join us for MTCHacks, a weekend of collaboration, learning, and
            creativity dedicated to solving challenges faced by the modern
            Ummah.
            <br />
            <br />
            Compete in one of our three tracks (two technical and one pitch
            competition) for a chance to win $2000. Whether you come solo or
            with a team, all are welcome!
          </p>
        </div>
        <img src={uiucPic} alt="UIUC campus" className="about-image" />
      </div>
    </section>
  );
}
