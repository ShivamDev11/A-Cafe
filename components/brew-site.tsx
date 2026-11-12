"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type FormEvent } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { CoffeeScene } from "@/components/coffee-scene"

gsap.registerPlugin(ScrollTrigger)

const drinks = [
  { name: "Espresso", descriptor: "Double shot · dark chocolate, dried cherry", price: "4.5", family: "HOT" },
  { name: "Cappuccino", descriptor: "Velvet microfoam · a little cocoa", price: "6", family: "HOT" },
  { name: "Caramel Macchiato", descriptor: "House caramel · vanilla · soft milk", price: "7.5", family: "HOT" },
  { name: "Cold Brew", descriptor: "18-hour steep · round, quietly bright", price: "6.5", family: "COLD" },
  { name: "Mocha", descriptor: "Single-origin cacao · double espresso", price: "7", family: "HOT" },
  { name: "Vanilla Latte", descriptor: "Madagascar vanilla · silky espresso", price: "6.5", family: "HOT" },
]

const gallery = [
  { src: "/images/story-coffee.png", alt: "A stream of espresso folding into dark crema", label: "THE FIRST POUR", className: "gallery-image--wide" },
  { src: "/images/coffee-craft.png", alt: "A barista pouring a rosetta into a ceramic cup", label: "MADE BY HAND", className: "gallery-image--tall" },
  { src: "/images/cafe-interior.png", alt: "Warm walnut and brass inside the Brew & Beyond coffee bar", label: "A PLACE TO STAY", className: "gallery-image--wide" },
]

export function BrewSite() {
  const siteRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [bookingMessage, setBookingMessage] = useState("")
  const visibleDrinks = activeFilter === "ALL" ? drinks : drinks.filter((drink) => drink.family === activeFilter)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const staticContext = gsap.context(() => gsap.set("[data-hero-intro], [data-reveal]", { autoAlpha: 1, y: 0 }), siteRef)
      return () => staticContext.revert()
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85 })
    const raf = (time: number) => lenis.raf(time * 1000)
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      gsap.fromTo("[data-hero-intro]", { autoAlpha: 0, y: 32 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.15,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.2,
      })

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 38 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        })
      })

      gsap.to("[data-story-image]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: "#story", start: "top bottom", end: "bottom top", scrub: 0.6 },
      })
    }, siteRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      context.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  const openReservation = () => {
    setBookingMessage("")
    dialogRef.current?.showModal()
  }

  const submitReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBookingMessage("Online booking isn’t connected yet. Email hello@brewandbeyond.cafe to confirm your table.")
    event.currentTarget.reset()
  }

  return (
    <div className="brew-site" ref={siteRef}>
      <header className={`lux-nav ${menuOpen ? "lux-nav--open" : ""}`}>
        <nav className="lux-nav__inner" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Brew & Beyond home" onClick={() => setMenuOpen(false)}>
            <span className="wordmark__main">BREW <i>&amp;</i> BEYOND</span>
            <span className="wordmark__sub">MORE THAN COFFEE</span>
          </a>
          <button className="nav-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
          <div className="lux-nav__links">
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#menu" onClick={() => setMenuOpen(false)}>The menu</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>The experience</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Visit us</a>
            <button className="nav-booking" type="button" onClick={openReservation}>Reserve <span>↗</span></button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="lux-hero" aria-labelledby="hero-heading">
          <div className="lux-hero__backdrop" />
          <div className="lux-hero__grain" />
          <CoffeeScene className="lux-hero__scene" />
          <div className="lux-hero__glow lux-hero__glow--one" />
          <div className="lux-hero__glow lux-hero__glow--two" />
          <div className="lux-hero__content">
            <p className="eyebrow" data-hero-intro><span className="eyebrow__line" /> A NEW RITUAL IN BROOKLYN</p>
            <h1 className="lux-hero__title" id="hero-heading" data-hero-intro>More than<br /><em>coffee.</em></h1>
            <p className="lux-hero__tagline" data-hero-intro>More Than Coffee. It&apos;s an Experience.</p>
            <div className="lux-hero__actions" data-hero-intro>
              <a className="button button--gold" href="#menu">Explore the menu <span>↗</span></a>
              <a className="button button--text" href="#story">Discover our story <span>↓</span></a>
            </div>
          </div>
          <div className="lux-hero__meta"><span>SMALL BATCH · SLOW MOMENTS</span><span>EST. 2018&nbsp;&nbsp; / &nbsp;&nbsp;WILLIAMSBURG, NY</span></div>
          <div className="lux-hero__scroll" aria-hidden="true"><span>SCROLL TO SAVOR</span><i /></div>
          <div className="lux-hero__side-note">THE ART OF THE EVERYDAY</div>
        </section>

        <div className="ticker" aria-label="Thoughtfully sourced, carefully made, meant to be savored">
          <div className="ticker__track"><span>THOUGHTFULLY SOURCED</span><i>✳</i><span>CAREFULLY MADE</span><i>✳</i><span>MEANT TO BE SAVORED</span><i>✳</i><span>THOUGHTFULLY SOURCED</span><i>✳</i><span>CAREFULLY MADE</span><i>✳</i><span>MEANT TO BE SAVORED</span><i>✳</i></div>
        </div>

        <section className="story-section" id="story" aria-labelledby="story-heading">
          <div className="story-section__copy">
            <p className="eyebrow eyebrow--dark" data-reveal><span className="eyebrow__line" /> OUR STORY · EST. 2018</p>
            <h2 className="display-heading story-section__title" id="story-heading" data-reveal>Made for the<br /><em>in-between.</em></h2>
            <p className="story-section__body" data-reveal>We started with one simple thought: a cup of coffee can change the shape of a day. So we built a little world around that idea—good beans, thoughtful hands, and room to just be.</p>
            <a className="inline-link" href="#experience" data-reveal>Get to know us <span>↗</span></a>
            <div className="story-section__signature" data-reveal><span className="signature-mark">B<span>&amp;</span>B</span><span>GOOD THINGS, MADE WITH INTENTION</span></div>
          </div>
          <div className="story-section__visual" data-reveal>
            <div className="story-section__image-frame" data-story-image>
              <Image src="/images/story-coffee.png" alt="Fresh espresso and rich crema in a hand-thrown coffee cup" fill sizes="(max-width: 800px) 100vw, 48vw" />
            </div>
            <span className="story-section__image-caption">A LITTLE CARE IN EVERY CUP &nbsp; / &nbsp; 01</span>
            <span className="story-section__seal" aria-hidden="true">B<br />&amp;<br />B</span>
          </div>
        </section>

        <section className="menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="section-topline" data-reveal><span>THE HOUSE SELECTION</span><span>01 — 06 / MADE TO ORDER</span></div>
          <div className="menu-section__heading" data-reveal><div><p className="eyebrow"><span className="eyebrow__line" /> SIGNATURE MENU</p><h2 className="display-heading" id="menu-heading">A little <em>indulgence.</em></h2></div><p>Six favorites, each one a reason to slow down.</p></div>
          <div className="menu-filters" role="group" aria-label="Filter drinks">
            {["ALL", "HOT", "COLD"].map((filter) => <button className={activeFilter === filter ? "menu-filter is-active" : "menu-filter"} key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter === "ALL" ? "Everything" : filter === "HOT" ? "Slow & warm" : "Over ice"}</button>)}
          </div>
          <div className="menu-grid" aria-live="polite">
            {visibleDrinks.map((drink, index) => (
              <article className="drink-card" key={drink.name} data-reveal>
                <div className={`drink-card__art drink-card__art--${drink.family.toLowerCase()}`} aria-hidden="true"><span className="drink-card__halo" /><span className="drink-card__cup"><i /></span><span className="drink-card__number">0{drinks.indexOf(drink) + 1}</span></div>
                <div className="drink-card__details"><div><h3>{drink.name}</h3><p>{drink.descriptor}</p></div><span className="drink-card__price">${drink.price}</span></div>
                <span className="drink-card__index">SIGNATURE DRINK &nbsp; · &nbsp; {String(index + 1).padStart(2, "0")}</span>
              </article>
            ))}
          </div>
          <div className="menu-section__foot"><span>ASK US ABOUT TODAY&apos;S SINGLE ORIGIN</span><a className="inline-link" href="#visit">Come taste for yourself <span>↗</span></a></div>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-heading">
          <div className="experience-section__visual" data-reveal>
            <Image src="/images/coffee-craft.png" alt="A barista pouring delicate latte art into a handmade ceramic cup" fill sizes="(max-width: 800px) 100vw, 54vw" />
            <div className="experience-section__image-label"><span>02 — THE CRAFT</span><span>HAND-POURED, NEVER RUSHED</span></div>
            <div className="experience-section__stamp" aria-hidden="true"><span>BREWED<br />WITH<br /><i>INTENTION</i></span></div>
          </div>
          <div className="experience-section__copy">
            <p className="eyebrow eyebrow--dark" data-reveal><span className="eyebrow__line" /> COFFEE, CLOSELY CONSIDERED</p>
            <h2 className="display-heading" id="experience-heading" data-reveal>From first<br />crack to <em>last sip.</em></h2>
            <p className="experience-section__body" data-reveal>We know our farmers by name. We roast in small, thoughtful batches. And every drink gets the time it deserves—because the details are the whole point.</p>
            <div className="experience-steps">
              <div data-reveal><span>01</span><p><strong>Grown with care</strong><small>Direct relationships. Exceptional harvests.</small></p></div>
              <div data-reveal><span>02</span><p><strong>Roasted in rhythm</strong><small>Small batches, dialed in every morning.</small></p></div>
              <div data-reveal><span>03</span><p><strong>Finished by hand</strong><small>One cup at a time. Always.</small></p></div>
            </div>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-heading">
          <div className="gallery-heading" data-reveal><div><p className="eyebrow eyebrow--dark"><span className="eyebrow__line" /> NOTES FROM OUR HOUSE</p><h2 className="display-heading" id="gallery-heading">The everyday, <em>elevated.</em></h2></div><span>FRAGMENTS OF A GOOD DAY &nbsp; / &nbsp; 03</span></div>
          <div className="gallery-grid">
            {gallery.map((image, index) => <figure className={`gallery-image ${image.className}`} key={image.src} data-reveal><div className="gallery-image__frame"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 40vw" /></div><figcaption><span>{image.label}</span><span>0{index + 1}</span></figcaption></figure>)}
          </div>
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-heading">
          <div className="visit-section__left">
            <p className="eyebrow" data-reveal><span className="eyebrow__line" /> COME FIND US</p>
            <h2 className="display-heading" id="visit-heading" data-reveal>Your corner<br />of <em>the city.</em></h2>
            <p className="visit-section__copy" data-reveal>Just off the corner of Wythe &amp; North. Come for a cup, stay for the conversation.</p>
            <a className="button button--outline" href="https://maps.google.com/?q=187+Wythe+Avenue+Brooklyn+NY" target="_blank" rel="noreferrer" data-reveal>Get directions <span>↗</span></a>
          </div>
          <div className="visit-card" data-reveal>
            <div className="visit-card__top"><span>BREW &amp; BEYOND</span><span>WILLIAMSBURG, NY</span></div>
            <div className="visit-card__map" aria-label="Illustrated café location in Williamsburg, Brooklyn"><span className="map-road map-road--one">WYTHE AVENUE</span><span className="map-road map-road--two">NORTH 7TH STREET</span><span className="map-road map-road--three">BERRY STREET</span><span className="map-block map-block--one"/><span className="map-block map-block--two"/><span className="map-block map-block--three"/><span className="map-location">B&amp;B<span /></span></div>
            <div className="visit-card__address"><div><strong>187 Wythe Avenue</strong><span>Brooklyn, New York 11249</span></div><a href="mailto:hello@brewandbeyond.cafe" aria-label="Email Brew & Beyond">↗</a></div>
            <div className="visit-card__hours"><span>MON—FRI <b>7:00 — 17:00</b></span><span>SAT—SUN <b>8:00 — 18:00</b></span></div>
          </div>
        </section>

        <section className="reserve-section" aria-labelledby="reserve-heading">
          <div className="reserve-section__orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="reserve-section__content" data-reveal><p className="eyebrow"><span className="eyebrow__line" /> THERE&apos;S A PLACE FOR YOU</p><h2 className="display-heading" id="reserve-heading">Stay for<br /><em>one more.</em></h2><p>Your table. Your favorite cup. A little more of the good stuff.</p><button className="button button--gold" type="button" onClick={openReservation}>Reserve your moment <span>↗</span></button></div>
          <span className="reserve-section__note">MORE THAN COFFEE. IT&apos;S AN EXPERIENCE.</span>
        </section>
      </main>

      <footer className="lux-footer">
        <div className="lux-footer__main"><a className="wordmark" href="#top"><span className="wordmark__main">BREW <i>&amp;</i> BEYOND</span><span className="wordmark__sub">MORE THAN COFFEE</span></a><p>Made with patience<br />in Williamsburg, Brooklyn.</p><a href="mailto:hello@brewandbeyond.cafe">HELLO@BREWANDBEYOND.CAFE <span>↗</span></a></div>
        <div className="lux-footer__bottom"><span>© 2025 BREW &amp; BEYOND. ALL GOOD THINGS.</span><a href="#top">BACK TO THE TOP ↑</a><span>BUILT TO BE SAVORED</span></div>
      </footer>

      <dialog className="reservation-dialog" ref={dialogRef} aria-labelledby="reservation-title">
        <div className="reservation-dialog__inner"><button className="reservation-dialog__close" type="button" aria-label="Close reservation form" onClick={() => dialogRef.current?.close()}>×</button><p className="eyebrow eyebrow--dark"><span className="eyebrow__line" /> A PLACE FOR YOU</p><h2 className="display-heading" id="reservation-title">Save a <em>seat.</em></h2><p>Tell us when you&apos;re coming by, and we&apos;ll make room.</p><form onSubmit={submitReservation}><label htmlFor="guest-name">Your name</label><input id="guest-name" name="name" autoComplete="name" placeholder="Name" required /><div className="reservation-dialog__fields"><div><label htmlFor="guest-date">Date</label><input id="guest-date" name="date" type="date" required /></div><div><label htmlFor="guest-count">Party size</label><select id="guest-count" name="guests"><option>2 guests</option><option>1 guest</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></div></div><button className="button button--dark" type="submit">Request a table <span>↗</span></button><p className="reservation-dialog__status" aria-live="polite">{bookingMessage}</p></form></div>
      </dialog>
    </div>
  )
}
