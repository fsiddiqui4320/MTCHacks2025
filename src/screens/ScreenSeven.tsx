import { Trophy, Medal, Award } from "lucide-react";

const prizes = [
  {
    title: "1st Place",
    amount: "$2,000",
    icon: <Medal size={48} />,
  },
  {
    title: "2nd Place",
    amount: "$500",
    icon: <Trophy size={48} />,
  },
  {
    title: "3rd Place",
    amount: "$250",
    icon: <Award size={48} />,
  },
];

export default function ScreenSeven() {
  return (
    <section id="page7" className="screen">
      <div className="screen-content prizes-section">
        <h1>Prizes</h1>
        <p className="prizes-intro">
          Each track awards the following prizes to first, second, and third place teams.
        </p>
        <div className="prizes-grid">
          {prizes.map(({ title, amount, icon }) => (
            <article key={title} className="prize-card">
              <div className="prize-icon">{icon}</div>
              <h2 className="prize-title">{title}</h2>
              <span className="prize-amount">{amount}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
