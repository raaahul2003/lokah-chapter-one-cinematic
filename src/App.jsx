import { useEffect, useRef, useState } from "react";
import "./App.css";

import heroImage from "./assets/hero/chandra-fire-hero.jpg";
import neonImage from "./assets/world/neon-chandra.jpg";
import worldImage from "./assets/characters/world.jpg";
import strangeImage from "./assets/characters/strange.jpg";
import powerImage from "./assets/characters/power.jpg";
import chandraImage from "./assets/characters/neeli.jpg";
import sunnyImage from "./assets/characters/sunny.jpg";
import venuImage from "./assets/characters/venu.jpg";
import naijilImage from "./assets/characters/naijil.jpg";
import nachiyappaImage from "./assets/characters/nachiyappa-gowda.jpg";
import kathanarImage from "./assets/characters/kathanar.jpg";
import chathanImage from "./assets/characters/chathan.jpg";
import endimage from "./assets/characters/end.jpg";

const TRAILER_URL = "https://www.youtube.com/watch?v=qCeEvbt0zec";
const WATCH_URL = "https://www.hotstar.com/in/movies/lokah-chapter-1-chandra/1271499938";

const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function Reveal({ children, className = "", onClick, onKeyDown }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

const cast = [
  { image: chandraImage, name: "CHANDRA", actor: "KALYANI PRIYADARSHAN", role: "A mysterious woman who arrives in Bengaluru with a mission.", number: "01", tone: "ember" },
  { image: sunnyImage, name: "SUNNY", actor: "NASLEN K GAFOOR", role: "A neighbour who becomes drawn into Chandra's mystery.", number: "02", tone: "warm" },
  { image: nachiyappaImage, name: "NACHIYAPPA GOWDA", nameLines: ["NACHIYAPPA", "GOWDA"], actor: "SANDY MASTER", role: "A distinctive presence in the growing world of Lokah.", number: "03", tone: "blue" },
  { image: chathanImage, name: "CHATHAN", actor: "TOVINO THOMAS", role: "A supernatural figure within the wider universe.", number: "04", tone: "crimson" },
  { image: naijilImage, name: "NAIJIL", actor: "ARUN KURIAN", role: "Part of Sunny's side of the story.", number: "05", tone: "violet" },
  { image: venuImage, name: "VENU", actor: "CHANDU SALIMKUMAR", role: "Another thread in the strange city around them.", number: "06", tone: "violet" },
  { image: kathanarImage, name: "KATHANAR", actor: "SUNNY WAYNE", role: "A folklore figure inside the mythic layer of Lokah.", number: "07", tone: "gold" },
];

const googleSearchUrl = (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

const makers = [
  { category: "DIRECTOR", people: [{ name: "DOMINIC ARUN" }] },
  { category: "WRITING", people: [{ name: "DOMINIC ARUN" }, { name: "SANTHY BALACHANDRAN" }] },
  { category: "PRODUCER", people: [{ name: "DULQUER SALMAAN" }, { name: "WAYFARER FILMS" }] },
  { category: "CINEMATOGRAPHY", people: [{ name: "NIMISH RAVI" }] },
  { category: "MUSIC", people: [{ name: "JAKES BEJOY" }] },
  { category: "EDITING", people: [{ name: "CHAMAN CHACKO" }] },
  { category: "PRODUCTION DESIGN", people: [{ name: "BANGLAN" }] },
  { category: "SOUND", people: [{ name: "DAWN VINCENT" }] },
];

const filmDetails = [
  ["RELEASE", "28 AUG 2025"],
  ["LANGUAGE", "MALAYALAM"],
  ["RUNTIME", "151 MIN"],
  ["GENRE", "SUPERNATURAL FANTASY / ACTION"],
  ["CHAPTER", "CHAPTER I : CHANDRA"],
];

function ExternalAction({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function App() {
  const sequenceRef = useRef(null);
  const worldRef = useRef(null);
  const charactersRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [worldProgress, setWorldProgress] = useState(0);
  const [characterProgress, setCharacterProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const sequence = sequenceRef.current;
      const world = worldRef.current;
      const characters = charactersRef.current;

      if (sequence) {
        const distance = Math.max(1, sequence.offsetHeight - window.innerHeight);
        setProgress(clamp(-sequence.getBoundingClientRect().top / distance));
      }

      if (world) {
        const distance = Math.max(1, world.offsetHeight - window.innerHeight);
        setWorldProgress(clamp(-world.getBoundingClientRect().top / distance));
      }

      if (characters) {
        const distance = Math.max(1, characters.offsetHeight - window.innerHeight);
        setCharacterProgress(clamp(-characters.getBoundingClientRect().top / distance));
      }

      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const fire = 1 - clamp(progress / 0.34);
  const night = clamp((progress - 0.2) / 0.64);
  const arrival = clamp((progress - 0.1) / 0.21) * (1 - clamp((progress - 0.33) / 0.18));
  const mission = clamp((progress - 0.34) / 0.2) * (1 - clamp((progress - 0.54) / 0.18));
  const enter = clamp((progress - 0.56) / 0.24);

  const worldPhase = worldProgress * 2.99;
  const activeWorld = Math.min(2, Math.floor(worldPhase));
  const activeCharacter = clamp(characterProgress * (cast.length - 0.001), 0, cast.length - 0.001);
  const activeCharacterIndex = Math.round(activeCharacter);

  const scrollCharacterTo = (index) => {
    const characters = charactersRef.current;
    if (!characters) return;
    const distance = Math.max(1, characters.offsetHeight - window.innerHeight);
    const ratio = index / (cast.length - 1);
    const top = characters.offsetTop + ratio * distance;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const worldLayers = [
    {
      label: "01 / OUR WORLD",
      title: <>BENGALURU,<br /><em>AFTER DARK.</em></>,
      copy: "A familiar city. Chandra arrives here, carrying a mission that no one around her can see.",
      image: worldImage,
      position: "center 28%",
      tone: "city",
    },
    {
      label: "02 / THE UNKNOWN",
      title: <>THEN THE<br /><em>STRANGE</em> BEGINS.</>,
      copy: "Sunny becomes curious. What starts as a neighbour's question opens the door to something much larger.",
      image: strangeImage,
      position: "center 34%",
      tone: "mystery",
    },
    {
      label: "03 / THE OTHER WORLD",
      title: <>MYTH<br />ENTERS <em>THE CITY.</em></>,
      copy: "Folklore, supernatural figures and a new cinematic universe begin to overlap.",
      image: powerImage,
      position: "center 35%",
      tone: "myth",
    },
  ];

  return (
    <main id="top">
      <section className="sequence" ref={sequenceRef} aria-label="Lokah opening title sequence">
        <div className="stage">
          <div className="scene-backdrop scene-backdrop--fire" style={{ opacity: fire }} />
          <div className="scene-backdrop scene-backdrop--night" style={{ opacity: night }} />

          <div className="fire-scene" style={{ opacity: fire }}>
            <img src={heroImage} alt="Fire-lit cinematic image of Chandra" />
            <div className="fire-wash" />
          </div>

          <div className="night-scene" style={{ opacity: night }}>
            <img src={neonImage} alt="Moonlit neon image from the Lokah visual world" />
            <div className="night-wash" />
          </div>

          <div className="grain" />

          <nav className="nav">
            <a href="#top" className="brand">LOKAH</a>
            <div className="nav-right">
              <button onClick={() => scrollTo("#world")}>EXPLORE <i>↘</i></button>
            </div>
          </nav>

          <div className="hero-copy" style={{ opacity: fire, transform: `translateY(${progress * -34}px)` }}>
            <p className="kicker malayalam-kicker">അദ്ധ്യായം ഒന്ന് <span>/</span> CHAPTER I</p>
            <h1>LOKAH</h1>
            <div className="chapter"><span>CHAPTER I</span><b /><span>CHANDRA</span></div>
            <p className="intro">
              Every world has a beginning.
              <br />
              This one begins in the dark.
            </p>
            <div className="hero-actions">
              <ExternalAction href={TRAILER_URL} className="solid-action">WATCH TRAILER <span>↗</span></ExternalAction>
              <ExternalAction href={WATCH_URL} className="line-action">WATCH THE FILM <span>↗</span></ExternalAction>
            </div>
          </div>

          <div className="sequence-story">
            <div className="story-beat story-beat--arrival" style={{ opacity: arrival, transform: `translate3d(-50%, ${18 - arrival * 18}px, 0)` }}>
              <p className="kicker">02 / THE ARRIVAL</p>
              <h2>CHANDRA<br />ARRIVES IN<br /><em>BENGALURU.</em></h2>
            </div>
            <div className="story-beat story-beat--mission" style={{ opacity: mission, transform: `translate3d(-50%, ${18 - mission * 18}px, 0)` }}>
              <p className="kicker">THE MYSTERY STARTS HERE</p>
              <h2>SHE HAS<br /><em>A MISSION.</em></h2>
              <p>Sunny becomes curious. A strange adventure begins.</p>
            </div>
            <div className="story-beat story-beat--enter" style={{ opacity: enter, transform: `translate3d(0, ${24 - enter * 24}px, 0)` }}>
              <p className="kicker">THE DOOR IS OPEN</p>
              <h2>STEP INTO<br /><em>LOKAH.</em></h2>
            </div>
          </div>

          <div className="edge-meta"><span>LOKAH / 01</span><span>SCROLL TO ENTER</span></div>
        </div>
      </section>

      <section className="world-experience" id="world" ref={worldRef}>
        <div className="world-sticky">
          <div className="world-progress">
            <span>03 / MEET THE WORLD</span>
            <span>{String(activeWorld + 1).padStart(2, "0")} / 03</span>
          </div>

          {worldLayers.map((layer, index) => {
            const distance = index - worldPhase;
            const opacity = clamp(1 - Math.abs(distance) * 1.55);
            const scale = 1 + clamp(Math.abs(distance), 0, 1) * 0.03;
            const imageOpacity = index === activeWorld ? 1 : 0;
            return (
              <div
                className={`world-panel world-panel--${layer.tone}`}
                key={layer.label}
                style={{ opacity, transform: `translate3d(${distance * 6}%,0,0) scale(${scale})`, zIndex: 10 - Math.abs(index - activeWorld) }}
              >
                <div className="world-image-wrap" style={{ opacity: imageOpacity || 0.25 }}>
                  <img src={layer.image} alt="" style={{ objectPosition: layer.position }} />
                </div>
                <div className="world-panel-overlay" />
                <div className="world-panel-content">
                  <p className="kicker">{layer.label}</p>
                  <h2>{layer.title}</h2>
                  <p>{layer.copy}</p>
                </div>
                <div className="world-panel-index">0{index + 1}</div>
              </div>
            );
          })}

          <div className="world-steps" aria-label="World layers">
            {worldLayers.map((layer, index) => (
              <button key={layer.label} className={index === activeWorld ? "is-active" : ""} onClick={() => scrollTo("#world")}>
                <span>0{index + 1}</span>
                <b>{layer.label.replace(/^\d+ \/ /, "")}</b>
              </button>
            ))}
          </div>

          <div className="world-bridge">
            <span>FROM THE CITY</span><i /> <span>TO THE MYTH</span>
          </div>
        </div>
      </section>

      <section className="character-sequence" id="characters" ref={charactersRef}>
        <div className="character-sticky">
          <div className="character-heading">
            <p className="kicker">04 / THE PEOPLE OF LOKAH</p>
            <span>SCROLL OR TAP A NAME</span>
          </div>

          <div className="cast-index-list">
            {cast.map((person, index) => (
              <button
                key={person.name}
                className={activeCharacterIndex === index ? "is-active" : ""}
                onClick={() => scrollCharacterTo(index)}
                aria-label={`View ${person.name}`}
              >
                <span>{person.number}</span>
                <b>{person.name}</b>
              </button>
            ))}
          </div>

          {cast.map((person, index) => {
            const distance = index - activeCharacter;
            const absDistance = Math.abs(distance);
            const opacity = clamp(1 - absDistance * 2.6);
            const x = distance * 5;
            const scale = 1 + clamp(absDistance, 0, 1) * 0.025;
            return (
              <article
                className={`character-frame character-frame--${person.tone}`}
                key={person.name}
                style={{ opacity, transform: `translate3d(${x}%,0,0) scale(${scale})`, zIndex: cast.length - index }}
                aria-hidden={activeCharacterIndex !== index}
              >
                <div className="character-art"><img src={person.image} alt={`${person.name}, played by ${person.actor}`} /></div>
                <div className="character-copy">
                  <span className="character-number">{person.number}</span>
                  <p className="kicker">CAST</p>
                  <h2>
                    {person.nameLines ? (
                      <>
                        <span className="character-name-line">{person.nameLines[0]}</span>
                        <span className="character-name-line">{person.nameLines[1]}</span>
                      </>
                    ) : (
                      person.name
                    )}
                  </h2>
                  <p className="character-actor">{person.actor}</p>
                  <p className="character-role">{person.role}</p>
                </div>
                <div className="character-progress"><span>01</span><i><b style={{ width: `${((index + 1) / cast.length) * 100}%` }} /></i><span>{String(cast.length).padStart(2, "0")}</span></div>
              </article>
            );
          })}

          <div className="character-hint">↓ KEEP SCROLLING</div>
        </div>
      </section>

      <section className="myth" id="myth">
        <div className="myth-art myth-art--primary"><img src={endimage} alt="Kathanar image representing the folklore layer of Lokah" /></div>
        <div className="myth-art myth-art--secondary"><img src={chathanImage} alt="Chathan image representing the supernatural layer" /></div>
        <div className="myth-overlay" />
        <div className="myth-copy">
          <Reveal><p className="kicker">05 / THE WORLD BEHIND THE WORLD</p></Reveal>
          <Reveal><h2>MYTH<br />ENTERS<br /><em>THE CITY.</em></h2></Reveal>
          <Reveal><p>The film reworks Yakshi–Kathanar lore inside a contemporary setting, bringing familiar folklore into a new cinematic universe.</p></Reveal>
          <div className="myth-links">
            <span><small>01</small> NEELI</span>
            <span><small>02</small> KATHANAR</span>
            <span><small>03</small> CHATHAN</span>
          </div>
        </div>
      </section>

      <section className="makers" id="makers">
        <div className="makers-topline"><span>06 / THE FILM</span><span>CRAFT / PEOPLE</span></div>
        <div className="makers-head">
          <Reveal><p className="kicker">THE PEOPLE BEHIND LOKAH</p></Reveal>
          <Reveal><h2>THE WORLD<br />HAS <em>MAKERS.</em></h2></Reveal>
          <Reveal><p className="makers-intro-copy">A film is more than its frame. Direction, writing, camera, music, design and sound shape the world you enter.</p></Reveal>
        </div>

        <div className="maker-stack">
          {makers.map((maker, index) => (
            <Reveal className="maker-credit" key={maker.category}>
              <span className="maker-count">{String(index + 1).padStart(2, "0")}</span>
              <div className="maker-text">
                <span className="maker-category">{maker.category}</span>
                <strong>
                  {maker.people.map((person, personIndex) => (
                    <a
                      key={person.name}
                      href={googleSearchUrl(person.name)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {person.name}{personIndex < maker.people.length - 1 ? " / " : ""}
                    </a>
                  ))}
                </strong>
              </div>
              <i>↗</i>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="film-details" id="details">
        <div className="details-head">
          <p className="kicker">07 / CHAPTER I : CHANDRA</p>
          <h2>THE FILM,<br /><em>IN FRAME.</em></h2>
          <p>Key details, kept compact so the story stays at the centre.</p>
        </div>
        <div className="details-grid">
          {filmDetails.map(([label, value], index) => (
            <div className="detail-tile" key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <ExternalAction href={WATCH_URL} className="details-watch">WATCH THE FILM <span>↗</span></ExternalAction>
      </section>

      <section className="finale" id="finale">
        <div className="finale-image"><img src={endimage} alt="Dark cinematic Kathanar image" /></div>
        <div className="finale-overlay" />
        <div className="finale-card">
          <p className="kicker">END OF CHAPTER I</p>
          <h2>LOKAH</h2>
          <div className="finale-lockup"><span>CHAPTER I</span><b /><strong>CHANDRA</strong></div>
          <p className="finale-line">The world has just begun.</p>
          <ExternalAction href={WATCH_URL} className="finale-button">WATCH THE FILM ↗</ExternalAction>
        </div>
        <div className="footer-mark"><span>LOKAH</span><span>CHAPTER I : CHANDRA</span></div>
      </section>
    </main>
  );
}

export default App;
