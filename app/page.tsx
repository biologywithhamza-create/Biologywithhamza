import { ArticleCard, Arrow, Footer, Header, PlayIcon, PyroMark } from "./components";
import { links, videos } from "./content";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "PYRO",
        url: "https://hamzaramzan.online",
        description: "Biology, MDCAT and Discovery by Hamza Ramzan.",
        publisher: { "@id": "https://hamzaramzan.online/#hamza" },
      },
      {
        "@type": "Person",
        "@id": "https://hamzaramzan.online/#hamza",
        name: "Hamza Ramzan",
        jobTitle: "Senior Biology Lecturer and Academic Lead",
        url: "https://hamzaramzan.online",
        image: "https://hamza-biology.teamdatanp.chatgpt.site/hamza-ramzan.png",
        sameAs: [links.youtube, links.instagram, links.linkedin, links.nearpeerProfile],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
          { "@type": "CollegeOrUniversity", name: "University of the Punjab" },
        ],
        knowsAbout: ["Biology", "MDCAT Biology", "Biotechnology", "Zoology"],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="ember-dot" />
              Independent biology publication by Hamza Ramzan
            </div>
            <h1>Biology made <em>clear.</em><br />Discovery made <em>relevant.</em></h1>
            <p className="hero-lead">
              PYRO connects classroom biology, MDCAT thinking, and the discoveries
              changing how we understand life.
            </p>
            <div className="hero-actions">
              <a className="button button-ember" href="/articles">Start reading <Arrow /></a>
              <a className="button button-ghost" href="/videos"><PlayIcon /> Watch lessons</a>
            </div>
            <div className="hero-byline">
              <span>Written &amp; taught by</span>
              <strong>Hamza Ramzan</strong>
              <i />
              <span>MS Biotechnology</span>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <div className="portrait-grid" aria-hidden="true" />
            <img src="/hamza-ramzan.png" alt="Hamza Ramzan, Biology lecturer and founder of PYRO" width="1136" height="1476" />
            <div className="portrait-card">
              <PyroMark inverse />
              <div><strong>Senior Biology Lecturer</strong><span>FSc · MDCAT · Academic Lead</span></div>
            </div>
            <span className="portrait-note">Concept → Application → MCQ</span>
          </div>
        </section>

        <section className="proof-strip" aria-label="Experience and teaching reach">
          <div><strong>8+</strong><span>Years teaching Biology</span></div>
          <div><strong>4,432+</strong><span>MDCAT course learners</span></div>
          <div><strong>74</strong><span>Lessons in the MDCAT course</span></div>
          <div><strong>5×</strong><span>Best Speaker of Punjab</span></div>
        </section>

        <section className="editorial-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest field notes</p>
              <h2>Ideas worth<br />understanding.</h2>
            </div>
            <p>
              No filler and no textbook copying—just the logic behind difficult
              concepts, the strategy behind better answers, and the science worth noticing.
            </p>
          </div>
          <div className="article-grid">
            <ArticleCard index={0} />
            <ArticleCard index={1} />
            <ArticleCard index={2} />
          </div>
          <div className="section-end-link"><a href="/articles">View every field note <Arrow /></a></div>
        </section>

        <section className="lanes-section">
          <div className="lanes-intro">
            <p className="eyebrow">Three ways in</p>
            <h2>What are you here to understand?</h2>
          </div>
          <div className="lane-grid">
            <a className="lane lane-mdcat" href="/videos">
              <span>01 · MDCAT</span>
              <h3>Think like the examiner.</h3>
              <p>Conceptual lessons, MCQ judgment, revision systems and exam strategy.</p>
              <Arrow />
            </a>
            <a className="lane lane-learn" href="/articles">
              <span>02 · Learn Biology</span>
              <h3>See how life works.</h3>
              <p>Clear explanations that connect mechanisms, structures and consequences.</p>
              <Arrow />
            </a>
            <a className="lane lane-discover" href="/articles#discoveries">
              <span>03 · Discoveries</span>
              <h3>Follow biology forward.</h3>
              <p>Research, findings and biological ideas translated without the noise.</p>
              <Arrow />
            </a>
          </div>
        </section>

        <section className="video-section" id="videos">
          <div className="section-heading section-heading-light">
            <div>
              <p className="eyebrow">Watch &amp; learn</p>
              <h2>The classroom,<br />without the walls.</h2>
            </div>
            <a className="text-link-light" href={links.youtube} target="_blank" rel="noreferrer">Open YouTube channel <Arrow /></a>
          </div>
          <div className="video-grid">
            {videos.map((video, index) => (
              <a className={`video-card${index === 0 ? " video-card-featured" : ""}`} href={video.href} target="_blank" rel="noreferrer" key={video.href}>
                <div className="video-image">
                  <img src={video.image} alt="" width="480" height="360" />
                  <span className="video-play"><PlayIcon /></span>
                  <span className="video-number">0{index + 1}</span>
                </div>
                <div className="video-copy"><p>{video.label}</p><h3>{video.title}</h3><span>Watch lesson <Arrow /></span></div>
              </a>
            ))}
          </div>
        </section>

        <section className="founder-section" id="about">
          <div className="founder-visual">
            <img src="/og.png" alt="PYRO — Biology, MDCAT and Discovery" width="1200" height="630" />
            <div className="founder-signature">Hamza Ramzan<span>Founder &amp; Biology educator</span></div>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">Behind PYRO</p>
            <h2>Science training.<br />Teacher&apos;s instinct.<br />Speaker&apos;s clarity.</h2>
            <p>
              Hamza Ramzan is a senior Biology lecturer and Academic Lead with eight
              years of classroom and online teaching experience. His method combines
              strong concepts, visual explanations, past-paper awareness and deliberate MCQ practice.
            </p>
            <div className="credential-list">
              <span><strong>MS Biotechnology</strong>UMT · 2022</span>
              <span><strong>BS Zoology</strong>University of the Punjab · 2018</span>
            </div>
            <a className="button button-ink" href="/about">Read Hamza&apos;s story <Arrow /></a>
          </div>
        </section>

        <section className="resources-section" id="resources">
          <div className="resources-header">
            <p className="eyebrow">Student resources</p>
            <h2>Useful by design.</h2>
            <p>Direct routes to lessons, structured learning, and the student community.</p>
          </div>
          <div className="resource-grid">
            <a href={links.playlist} target="_blank" rel="noreferrer">
              <span>Free library</span><strong>MDCAT Biology video playlist</strong><p>Long-form lessons and revision sessions, organised on YouTube.</p><Arrow />
            </a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">
              <span>Student community</span><strong>MDCAT Biology WhatsApp channel</strong><p>Class updates, revision prompts and important student announcements.</p><Arrow />
            </a>
            <a href={links.nearpeerCourse} target="_blank" rel="noreferrer">
              <span>Structured course</span><strong>Complete MDCAT Biology preparation</strong><p>A focused course with 74 lessons and thousands of enrolled learners.</p><Arrow />
            </a>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-mark"><PyroMark inverse /></div>
          <div>
            <p className="eyebrow">Stay close to the learning</p>
            <h2>One clear explanation can change an entire chapter.</h2>
            <p>Join the channel for new lessons, field notes and Biology updates.</p>
            <div className="closing-actions">
              <a className="button button-ember" href={links.whatsapp} target="_blank" rel="noreferrer">Join WhatsApp channel <Arrow /></a>
              <a className="button button-outline-light" href={links.instagram} target="_blank" rel="noreferrer">Follow @myn_hamza</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
