import Link from "next/link";
import { Arrow, Footer, Header } from "./components";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found-page" id="main-content">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This path does not lead to a Biology lesson.</h1>
        <p>The page may have moved. Continue with the practice centre, article library, or Cambridge O Level route.</p>
        <div>
          <Link className="button button-ember" href="/">Return home <Arrow /></Link>
          <Link className="button button-ghost" href="/practice">Start MDCAT practice <Arrow /></Link>
          <Link className="button button-ghost" href="/articles">Browse articles <Arrow /></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
