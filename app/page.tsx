import Script from "next/script"

const menuItems = [
  { name: "The signature flat white", note: "Double ristretto · silky oat or whole milk", price: "6", tag: "HOUSE FAVORITE" },
  { name: "Single-origin pour over", note: "Rotating harvest · slow brewed to order", price: "8", tag: "SINGLE ORIGIN" },
  { name: "Brown butter morning bun", note: "Laminated in-house · orange sugar", price: "7", tag: "BAKED DAILY" },
]

export default function Home() {
  return (
    <>
      <header className="site-header" id="top">
        <nav className="navbar navbar-expand-lg navbar-dark container-fluid px-4 px-lg-5" aria-label="Main navigation">
          <a className="navbar-brand brand-mark" href="#top" aria-label="Brew and Beyond home">BREW <span>&</span> BEYOND<small>COFFEE, CONSIDERED.</small></a>
          <button className="navbar-toggler" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mainNav" data-menu-toggle><span className="menu-glyph" /></button>
          <div className="collapse navbar-collapse" id="mainNav" data-menu-panel>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
              <li className="nav-item"><a className="nav-link" href="#story">Our philosophy</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">The menu</a></li>
              <li className="nav-item"><a className="nav-link" href="#visit">Find us</a></li>
              <li className="nav-item ms-lg-3"><button className="btn btn-gold nav-reserve" data-open-reservation>Reserve a table <span aria-hidden="true">↗</span></button></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="A rich espresso in a handmade ceramic cup, resting in a shaft of warm light" />
          <div className="hero-shade" />
          <div className="hero-content container-fluid px-4 px-lg-5">
            <p className="eyebrow gold-eyebrow reveal">A quieter kind of coffee house <span className="eyebrow-line" /></p>
            <h1 id="hero-title" className="hero-title reveal">Make room<br />for <em>the moment.</em></h1>
            <div className="hero-bottom row align-items-end g-4">
              <div className="col-lg-5"><p className="hero-copy reveal">Thoughtfully sourced coffee, made slowly. A little space to settle in, and stay a while.</p><a className="text-link reveal" href="#story">Discover our point of view <span>↓</span></a></div>
              <div className="col-lg-7 hero-aside d-flex justify-content-lg-end align-items-end"><span className="hero-location">EST. 2018&nbsp; · &nbsp;BROOKLYN, NY</span><span className="hero-index">01 / 03</span></div>
            </div>
          </div>
          <div className="hero-caption"><span>GOOD THINGS TAKE A LITTLE TIME</span><span>40°41&apos; N &nbsp; 73°59&apos; W</span></div>
        </section>

        <section className="intro-section section-pad" id="story" aria-labelledby="story-title">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row align-items-start g-5">
              <div className="col-lg-3"><p className="eyebrow dark-eyebrow reveal"><span className="eyebrow-line" /> A note on slowing down</p></div>
              <div className="col-lg-8 offset-lg-1"><h2 className="intro-title reveal" id="story-title">Coffee is the beginning.<br /><em>Everything else is the reason.</em></h2><div className="intro-detail row g-4 mt-4"><div className="col-md-5"><p>We believe the best rituals are the ones that ask nothing of you but to be here. So we found the farms, learned the craft, and made a place for the in-between.</p></div><div className="col-md-4 offset-md-2"><a className="text-link dark-link" href="#visit">Come find your corner <span>↗</span></a></div></div></div>
            </div>
          </div>
        </section>

        <section className="craft-section" aria-label="Coffee prepared with care">
          <div className="craft-photo" role="img" aria-label="A barista preparing a pour-over coffee" />
          <div className="craft-caption"><span>01 — THE CRAFT</span><span>Measured by hand. Never hurried.</span></div>
          <div className="craft-note"><span className="note-mark">B&amp;B</span><p>From the first crack<br />to the final pour.</p></div>
        </section>

        <section className="menu-section section-pad" id="menu" aria-labelledby="menu-title">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row align-items-end menu-heading g-4"><div className="col-lg-7"><p className="eyebrow gold-eyebrow reveal">A few things we love</p><h2 id="menu-title" className="section-title light-title reveal">On the <em>menu.</em></h2></div><div className="col-lg-5"><p className="menu-intro">Seasonal by nature. Familiar by design. Everything here has a story worth tasting.</p></div></div>
            <div className="menu-tabs" role="tablist" aria-label="Menu categories"><button className="menu-tab active" role="tab" aria-selected="true" data-menu-category="coffee">Coffee &amp; tea</button><button className="menu-tab" role="tab" aria-selected="false" data-menu-category="from-oven">From the oven</button><button className="menu-tab" role="tab" aria-selected="false" data-menu-category="all-day">All day</button></div>
            <div className="menu-list" data-menu-list data-category="coffee">
              {menuItems.map((item, index) => <article className="menu-item reveal" key={item.name}><span className="menu-number">0{index + 1}</span><div className="menu-item-copy"><span className="menu-tag">{item.tag}</span><h3>{item.name}</h3><p>{item.note}</p></div><span className="menu-price">${item.price}</span></article>)}
            </div>
            <div className="menu-foot"><span>OUR MENU CHANGES WITH THE SEASONS</span><a className="text-link" href="#visit">See you at the counter <span>↗</span></a></div>
          </div>
        </section>

        <section className="visit-section section-pad" id="visit" aria-labelledby="visit-title">
          <div className="container-fluid px-4 px-lg-5"><div className="row g-5 align-items-center"><div className="col-lg-6"><p className="eyebrow dark-eyebrow reveal"><span className="eyebrow-line" /> Your table is waiting</p><h2 id="visit-title" className="section-title dark-title reveal">A good place<br />to <em>land.</em></h2><p className="visit-copy reveal">Corner of Wythe &amp; North. Come for the coffee, stay for whatever the day has left in it.</p><button className="btn btn-dark-coffee reveal" data-open-reservation>Make a reservation <span aria-hidden="true">↗</span></button></div><div className="col-lg-5 offset-lg-1"><div className="visit-card reveal"><div className="visit-card-top"><span>FIND YOUR WAY</span><span>01 / WILLIAMSBURG</span></div><div className="map-art" aria-label="Illustrated map showing the cafe near Wythe Avenue and North 7th Street"><span className="map-street street-one">WYTHE AVENUE</span><span className="map-street street-two">N 7TH STREET</span><span className="map-street street-three">BERRY STREET</span><span className="map-block block-one"/><span className="map-block block-two"/><span className="map-block block-three"/><span className="map-pin">B&amp;B</span></div><div className="visit-card-bottom"><div><strong>187 Wythe Avenue</strong><span>Brooklyn, New York 11249</span></div><a href="https://maps.google.com/?q=187+Wythe+Avenue+Brooklyn+NY" target="_blank" rel="noreferrer" aria-label="Get directions to 187 Wythe Avenue">↗</a></div></div></div></div></div>
        </section>

        <section className="closing-section"><div className="container-fluid px-4 px-lg-5"><p className="eyebrow gold-eyebrow reveal">Come as you are</p><h2 className="closing-title reveal">A little more<br /><em>room to be.</em></h2><button className="btn btn-gold reveal" data-open-reservation>Save yourself a seat <span aria-hidden="true">↗</span></button><div className="closing-seal" aria-hidden="true">B<br />&amp;<br />B</div></div></section>
      </main>

      <footer className="site-footer"><div className="container-fluid px-4 px-lg-5"><div className="footer-main row g-5"><div className="col-lg-5"><a className="brand-mark footer-brand" href="#top">BREW <span>&</span> BEYOND<small>COFFEE, CONSIDERED.</small></a><p className="footer-blurb">An everyday escape, in the middle of everything.</p></div><div className="col-6 col-lg-2 offset-lg-1"><span className="footer-label">COME BY</span><p>187 Wythe Avenue<br />Brooklyn, NY 11249</p></div><div className="col-6 col-lg-2"><span className="footer-label">THE HOURS</span><p>Mon—Fri &nbsp; 7—5<br />Sat—Sun &nbsp; 8—6</p></div><div className="col-lg-2"><span className="footer-label">SAY HELLO</span><a className="footer-email" href="mailto:hello@brewandbeyond.cafe">Write us a note ↗</a></div></div><div className="footer-bottom"><span>© 2025 BREW &amp; BEYOND. MADE WITH INTENTION.</span><a href="#top">BACK TO THE TOP ↑</a></div></div></footer>

      <dialog className="reservation-dialog" data-reservation-dialog aria-labelledby="reservation-title"><div className="dialog-inner"><button className="dialog-close" type="button" aria-label="Close reservation form" data-close-reservation>×</button><p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> A place for you</p><h2 id="reservation-title">Save a <em>seat.</em></h2><p className="dialog-copy">A small gathering? A slow morning? Tell us when, and we&apos;ll make room.</p><form data-reservation-form><label htmlFor="guest-name">Your name</label><input id="guest-name" name="name" autoComplete="name" required placeholder="Name"/><div className="row g-3"><div className="col-6"><label htmlFor="guest-date">Date</label><input id="guest-date" name="date" type="date" required/></div><div className="col-6"><label htmlFor="guest-count">Party size</label><select id="guest-count" name="guests"><option>2 guests</option><option>1 guest</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></div></div><button className="btn btn-dark-coffee w-100" type="submit">Request a table <span aria-hidden="true">↗</span></button><p className="form-status" data-form-status aria-live="polite"></p></form></div></dialog>
      <Script src="/brew.js" strategy="afterInteractive" />
    </>
  )
}
