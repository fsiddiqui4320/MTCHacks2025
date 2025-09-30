import { useEffect, useState } from "react";
import { useViewport } from "../hooks/useViewport";

const faqs = [
  {
    question: "Who can join?",
    answer: "Any university student, regardless of major or skill level.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all, MTCHacks is for everyone. Coders, designers, storytellers, and big thinkers from any background are welcome.",
  },
  {
    question: "Do I need a team?",
    answer:
      "You can work solo or with a team of up to 4. Don’t have one yet? We’ll help you find teammates at the kickoff.",
  },
  {
    question: "What do I need to submit?",
    answer: "A demo, prototype, or pitch submitted by Sunday.",
  },
  {
    question: "Is there a cost?",
    answer:
      "Nope, participation is free. Meals, space, and resources will be provided.",
  },
  {
    question: "What can I expect?",
    answer:
      "A weekend of hacking, learning, mentorship, and fun capped off with demos, prizes, and most importantly, free food + free swag.",
  },
];

export default function ScreenFour() {
  const { width } = useViewport();
  const isMobile = width <= 768;
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setExpandedIndex(0);
    }
  }, [isMobile]);

  const handleToggle = (index: number) => {
    if (!isMobile) return;
    setExpandedIndex(index);
  };

  return (
    <section id="page4" className="screen">
      <div className="screen-content faq-section">
        <h1>FAQ</h1>
        <p className="faq-intro">Key details to help you plan for MTCHacks.</p>
        <div className="faq-grid">
          {faqs.map(({ question, answer }, index) => {
            if (isMobile) {
              const isOpen = expandedIndex === index;
              return (
                <article
                  className={`faq-item faq-item--mobile${
                    isOpen ? " faq-item--open" : ""
                  }`}
                  key={question}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{question}</span>
                    <span className="faq-indicator" aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p id={`faq-answer-${index}`} className="faq-answer">
                      {answer}
                    </p>
                  )}
                </article>
              );
            }

            return (
              <article className="faq-item" key={question}>
                <h2>{question}</h2>
                <p>{answer}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
