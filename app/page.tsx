import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, BiologyMark, Footer, Header, PlayIcon } from "./components";
import { articles, links, videos } from "./content";
import { getArticleReadTime } from "./article-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = articles[3];
  const articleQueue = [articles[9], articles[18], articles[4]];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Biology with Hamza",
        url: "https://hamzaramzan.online",
        description: "MDCAT and Cambridge O Level Biology by Hamza Ramzan.",
        publisher: { "@id": "https://hamzaramzan.online/#hamza" },
      },
      {
        "@type": "Person",
        "@id": "https://hamzaramzan.online/#hamza",
        name: "Hamza Ramzan",
        jobTitle: "Senior Biology Lecturer and Academic Lead",
        url: "https://hamzaramzan.online",
        image: "https://hamzaramzan.online/hamza-ramzan.webp",
        sameAs: [links.youtube, links.instagram, links.linkedin, links.nearpeerProfile],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
          { "@type": "CollegeOrUniversity", name: "University of the Punjab" },
        ],
        knowsAbout: ["Biology", "MDCAT Biology", "Cambridge O Level Biology", "Biotechnology", "Zoology"],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="home-v2">
        <section className="home-v2-hero" id="top">
          <div className="home-v2-hero-grid">
            <div className="home-v2-hero-copy">
              <p className="home-v2-kicker"><span /> MDCAT · Cambridge O Level · Biology</p>
              <h1>
                Don&apos;t just<br />
                study Biology.<br />
                <em>See how it works.</em>
              </h1>
              <p className="home-v2-hero-lead">
                Clear, concept-first teaching that turns difficult chapters into connected ideas—and connected ideas into confident exam answers.
              </p>
              <div className="home-v2-actions">
                <Link className="home-v2-primary" href="/articles">Explore the library <Arrow /></Link>
                <Link className="home-v2-secondary" href="/videos"><PlayIcon /> Watch a lesson</Link>
              </div>
              <div className="home-v2-signoff">
                <span>Teaching with</span>
                <strong>clarity · logic · exam purpose</strong>
              </div>
            </div>

            <div className="home-v2-hero-stage">
              <span className="home-v2-stage-word" aria-hidden="true">BIO</span>
              <div className="home-v2-stage-orbit" aria-hidden="true" />
              <Image src="/hamza-ramzan.webp" alt="Hamza Ramzan, senior Biology lecturer" width={1136} height={1476} sizes="(max-width: 1120px) 85vw, 46vw" priority />
              <div className="home-v2-profile-chip">
                <BiologyMark inverse />
                <div>
                  <strong>Hamza Ramzan</strong>
                  <span>Senior Biology Lecturer · Academic Lead</span>
                </div>
              </div>
              <div className="home-v2-stage-note">
                <span>01</span>
                <p>Concept</p>
                <i />
                <span>02</span>
                <p>Application</p>
                <i />
                <span>03</span>
                <p>Exam mastery</p>
              </div>
            </div>
          </div>

          <div className="home-v2-proof" aria-label="Teaching experience and reach">
            <div><strong>9+</strong><span>years teaching Biology</span></div>
            <div><strong>100K+</strong><span>students reached</span></div>
            <div><strong>2</strong><span>focused learning tracks</span></div>
            <div><strong>5×</strong><span>Best Speaker of Punjab</span></div>
          </div>
        </section>

        <section className="home-v2-paths">
          <div className="home-v2-section-label"><span>01</span> Choose your route</div>
          <div className="home-v2-paths-head">
            <h2>One teacher.<br />Two serious tracks.</h2>
            <p>Start with the outcome you need. Every route is built around understanding first and exam performance second.</p>
          </div>
          <div className="home-v2-path-grid">
            <Link href="/videos" className="home-v2-path home-v2-path-mdcat">
              <span className="home-v2-path-number">01</span>
              <div>
                <p>MDCAT Biology</p>
                <h3>Build fast, accurate biological judgment.</h3>
                <ul>
                  <li>Concept-driven video lessons</li>
                  <li>MCQ reasoning and distractor analysis</li>
                  <li>High-yield revision routes</li>
                </ul>
              </div>
              <Arrow />
            </Link>
            <Link href="/cambridge-o-level" className="home-v2-path home-v2-path-cambridge">
              <span className="home-v2-path-number">02</span>
              <div>
                <p>Cambridge O Level Biology</p>
                <h3>Understand, investigate and explain with precision.</h3>
                <ul>
                  <li>5090 concept guides</li>
                  <li>Practical and data-handling skills</li>
                  <li>Structured-answer technique</li>
                </ul>
              </div>
              <Arrow />
            </Link>
          </div>
        </section>

        <section className="home-v2-library">
          <div className="home-v2-section-label home-v2-section-label-light"><span>02</span> Deep-reading library</div>
          <div className="home-v2-library-head">
            <h2>Articles that actually<br />finish the explanation.</h2>
            <p>Mechanisms, diagrams, comparisons, misconceptions, recaps and exam checks—built into every long-form guide.</p>
          </div>
          <div className="home-v2-library-grid">
            <Link className="home-v2-feature-article" href={`/articles/${featured.slug}`}>
              <div className="home-v2-feature-meta">
                <span>{featured.category}</span>
                <span>{getArticleReadTime(featured)}</span>
              </div>
              <div className="home-v2-feature-visual" aria-hidden="true">
                <span>04</span>
                <small>Acellular life</small>
              </div>
              <div>
                <p>{featured.topic}</p>
                <h3>{featured.title}</h3>
                <span className="home-v2-read-link">Read the full guide <Arrow /></span>
              </div>
            </Link>
            <div className="home-v2-article-queue">
              {articleQueue.map((article, index) => (
                <Link href={`/articles/${article.slug}`} key={article.slug}>
                  <span className="home-v2-queue-number">{String(index + 2).padStart(2, "0")}</span>
                  <div>
                    <p>{article.category} · {getArticleReadTime(article)}</p>
                    <h3>{article.title}</h3>
                    <span>{article.topic}</span>
                  </div>
                  <Arrow />
                </Link>
              ))}
              <Link className="home-v2-all-articles" href="/articles">
                <span>Browse all {articles.length} in-depth articles</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section className="home-v2-cambridge" id="cambridge">
          <div className="home-v2-section-label"><span>03</span> Cambridge direction</div>
          <div className="home-v2-cambridge-layout">
            <div className="home-v2-cambridge-intro">
              <p className="home-v2-cambridge-tag">O Level Biology · 5090</p>
              <h2>Knowledge is only half the paper.</h2>
              <p>Students also need evidence, interpretation and precise scientific language. This track brings all four together.</p>
              <Link href="/cambridge-o-level">Open the Cambridge 5090 route <Arrow /></Link>
            </div>
            <div className="home-v2-cambridge-map">
              <div><span>01</span><strong>Know</strong><p>Definitions, processes and connected systems.</p></div>
              <div><span>02</span><strong>Investigate</strong><p>Variables, controls, methods and reliability.</p></div>
              <div><span>03</span><strong>Interpret</strong><p>Tables, graphs, calculations and unfamiliar data.</p></div>
              <div><span>04</span><strong>Communicate</strong><p>Command words and mark-scheme precise answers.</p></div>
            </div>
          </div>
        </section>

        <section className="home-v2-watch" id="videos">
          <div className="home-v2-section-label"><span>04</span> Watch the classroom</div>
          <div className="home-v2-watch-head">
            <h2>Press play.<br />Stay for the logic.</h2>
            <a href={links.youtube} target="_blank" rel="noreferrer">Visit the YouTube channel <Arrow /></a>
          </div>
          <div className="home-v2-video-grid">
            <a className="home-v2-video-main" href={videos[0].href} target="_blank" rel="noreferrer">
              <div className="home-v2-video-image">
                <Image src={videos[0].image} alt={`Thumbnail for ${videos[0].title}`} width={1280} height={720} sizes="(max-width: 1120px) 100vw, 56vw" />
                <span><PlayIcon /></span>
              </div>
              <div className="home-v2-video-main-copy">
                <p>Start here · {videos[0].label}</p>
                <h3>{videos[0].title}</h3>
                <span>Watch now <Arrow /></span>
              </div>
            </a>
            <div className="home-v2-video-stack">
              {videos.slice(1).map((video, index) => (
                <a href={video.href} target="_blank" rel="noreferrer" key={video.href}>
                  <Image src={video.image} alt={`Thumbnail for ${video.title}`} width={1280} height={720} sizes="(max-width: 680px) 100vw, (max-width: 1120px) 50vw, 18vw" />
                  <div>
                    <p>0{index + 2} · {video.label}</p>
                    <h3>{video.title}</h3>
                    <span>Play lesson <Arrow /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-v2-profile" id="about">
          <div className="home-v2-profile-statement">
            <BiologyMark />
            <p>Biology with Hamza</p>
            <h2>Science training.<br />Teacher&apos;s instinct.<br /><em>Speaker&apos;s clarity.</em></h2>
          </div>
          <div className="home-v2-profile-copy">
            <span>Meet your teacher</span>
            <p>Hamza Ramzan is a senior Biology lecturer and Academic Lead with more than nine years of classroom and online teaching experience. Hundreds of thousands of students have studied through his lectures, courses and free academic communities.</p>
            <dl>
              <div><dt>MS Biotechnology</dt><dd>UMT · 2022</dd></div>
              <div><dt>BS Zoology</dt><dd>University of the Punjab · 2018</dd></div>
            </dl>
            <Link href="/about">Read Hamza&apos;s story <Arrow /></Link>
          </div>
        </section>

        <section className="home-v2-resources" id="resources">
          <div className="home-v2-resource-title">
            <span>05 · Student resources</span>
            <h2>Everything useful.<br />Nothing buried.</h2>
            <p>Direct access to the places students use most.</p>
          </div>
          <div className="home-v2-resource-list">
            <a href={links.playlist} target="_blank" rel="noreferrer"><span>01</span><div><strong>YouTube lesson library</strong><p>Complete MDCAT lessons and revision sessions.</p></div><Arrow /></a>
            <a href={links.studentDrive} target="_blank" rel="noreferrer"><span>02</span><div><strong>Student Resource Drive</strong><p>Lecture notes, diagrams and revision material.</p></div><Arrow /></a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer"><span>03</span><div><strong>WhatsApp student channel</strong><p>Class updates, prompts and announcements.</p></div><Arrow /></a>
            <a href={links.nearpeerCourse} target="_blank" rel="noreferrer"><span>04</span><div><strong>Structured MDCAT course</strong><p>Conceptual teaching with exam-oriented practice.</p></div><Arrow /></a>
          </div>
        </section>

        <section className="home-v2-closing">
          <div>
            <p>Keep learning with Hamza</p>
            <h2>Your next clear explanation is one click away.</h2>
          </div>
          <div className="home-v2-closing-links">
            <a href={links.youtube} target="_blank" rel="noreferrer">YouTube <Arrow /></a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
            <a href={links.instagram} target="_blank" rel="noreferrer">Instagram <Arrow /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
