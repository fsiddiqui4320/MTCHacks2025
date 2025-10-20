import { type MouseEvent } from "react";

type SectionLink = {
  id: string;
  label: string;
};

const NAV_HEIGHT = 72;

const sectionLinks: SectionLink[] = [
  { id: "page2", label: "Schedule" },
  { id: "page3", label: "About" },
  { id: "page4", label: "Apply" },
  { id: "page5", label: "FAQ" },
  { id: "page6", label: "Sponsors" },
];

export default function Navbar() {
  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const scrollContainer = document.querySelector(
      ".snap-container"
    ) as HTMLElement | null;

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: Math.max(target.offsetTop - NAV_HEIGHT, 0),
        behavior: "smooth",
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar" aria-label="Primary">
      {sectionLinks.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="navbar-link"
          onClick={(event) => handleLinkClick(event, id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
