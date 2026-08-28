"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight, ArrowUpRight, Award, Check, ChevronRight,
  HeartHandshake, Mail, MapPin, Menu, Phone, Quote,
  Sparkles, Target, Users, X,
} from "lucide-react";
import { defaults, readPortfolio, type PortfolioData } from "@/lib/portfolio";

const nav = [["About", "about"], ["Expertise", "expertise"], ["Journey", "journey"], ["Education", "education"], ["Recognition", "recognition"]];
const skillIcons = [HeartHandshake, Target, Users];

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData>(defaults);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  useEffect(() => {
    // Admin content is intentionally browser-local for this no-backend edition.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(readPortfolio());
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); }
    }), { threshold: 0.13 });
    document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));
    return () => reveal.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-canvas text-ink">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav className="glass-nav mx-auto flex h-[68px] max-w-[1240px] items-center justify-between rounded-[22px] px-3 pl-4 sm:px-4 sm:pl-5" aria-label="Primary navigation">
          <a href="#top" className="group flex items-center gap-3" aria-label="Syeda Masooma Fatima, home">
            <span className="grid size-10 place-items-center rounded-[13px] bg-ink font-display text-sm font-semibold tracking-wider text-white transition-transform group-hover:-rotate-3">SM</span>
            <span className="hidden font-display text-lg font-semibold tracking-tight text-ink sm:block">Syeda Masooma</span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
          </div>
          <div className="flex items-center gap-2">
            <a href={`mailto:${data.contact.email}`} className="hidden rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl sm:block">Let&apos;s connect</a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center rounded-xl border border-ink/10 bg-white/60 lg:hidden" aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
          {menuOpen && <div className="absolute inset-x-0 top-[76px] mx-3 flex flex-col gap-1 rounded-[22px] border border-white bg-white/95 p-3 shadow-2xl backdrop-blur-2xl sm:mx-6 lg:hidden">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-mist">{label}</a>)}</div>}
        </nav>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[900px] max-w-[1380px] items-center gap-10 px-5 pb-24 pt-36 md:px-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:pt-28" aria-labelledby="hero-title">
        <div className="relative z-10 max-w-[760px]" data-reveal>
          <div className="eyebrow"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-sage" /></span>Available for meaningful collaboration</div>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(4.1rem,7.3vw,7.2rem)] font-medium leading-[.84] tracking-[-.065em] text-ink">
            Potential lives<br /><span className="relative italic text-rose">in every child.<svg className="absolute -bottom-5 left-3 h-5 w-[88%] text-gold/55" viewBox="0 0 500 30" fill="none" aria-hidden="true"><path d="M3 22C125 2 334 3 497 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>
          </h1>
          <p className="mt-12 max-w-xl text-base leading-8 text-muted sm:text-lg">{data.hero.tagline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#journey" className="button-primary group">Explore my journey <ArrowDownRight size={17} className="transition-transform group-hover:rotate-[-45deg]" /></a>
            <a href={`mailto:${data.contact.email}`} className="button-quiet"><Mail size={16} /> Send an email</a>
          </div>
          <div className="mt-12 grid max-w-[540px] grid-cols-3 border-t border-ink/10 pt-6">
            {[["10+", "Years of care"], ["7", "Credentials"], ["01", "Shared purpose"]].map(([value, label], i) => <div key={label} className={i ? "border-l border-ink/10 pl-5 sm:pl-8" : ""}><strong className="block font-display text-3xl font-semibold text-ink">{value}</strong><span className="text-[10px] font-bold uppercase tracking-[.14em] text-muted">{label}</span></div>)}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[570px] w-full max-w-[560px] items-center justify-center lg:min-h-[690px]" data-reveal>
          <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
          <div className="profile-frame relative z-10 w-[78%] max-w-[420px] rotate-[2deg] rounded-[40px] p-3">
            <div className="relative aspect-[.84] overflow-hidden rounded-[31px] bg-gradient-to-br from-[#dce8e3] via-[#cbdad4] to-[#d8c2c7]">
              {data.hero.photo ? <Image unoptimized fill sizes="(max-width: 1024px) 78vw, 420px" src={data.hero.photo} alt="Syeda Masooma Fatima" className="object-cover" /> : <div className="profile-art size-full"><span>SMF</span><svg viewBox="0 0 420 500" aria-hidden="true"><path d="M32 455C105 369 83 284 181 231C274 181 281 93 393 31" /><circle cx="99" cy="365" r="10" /><circle cx="181" cy="231" r="10" /><circle cx="292" cy="112" r="10" /><circle cx="393" cy="31" r="10" /></svg></div>}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white"><span className="block text-[9px] font-bold uppercase tracking-[.2em] text-white/70">Based in</span><strong className="font-display text-2xl font-medium">Kohat, Pakistan</strong></div>
            </div>
            <div className="flex items-center justify-between px-3 pb-1 pt-4"><div><span className="block text-[9px] font-bold tracking-[.17em] text-muted">CURRENT ROLE</span><strong className="text-xs text-ink">Army Special Education School</strong></div><span className="rounded-full bg-sage/15 px-3 py-1.5 text-[10px] font-bold text-[#617568]">ASES</span></div>
          </div>
          <div className="floating-card absolute right-0 top-[18%] z-20 flex rotate-[-4deg] items-center gap-3 rounded-2xl p-3.5 sm:right-1"><span className="grid size-10 place-items-center rounded-xl bg-rose/15 text-rose"><Award size={20} /></span><div><small>RECOGNITION</small><strong>Best Teacher Award</strong></div></div>
          <div className="floating-card absolute bottom-[12%] left-0 z-20 flex rotate-[3deg] items-center gap-3 rounded-2xl p-3.5"><span className="grid size-10 place-items-center rounded-xl bg-sage/15 text-sage"><Sparkles size={20} /></span><div><small>APPROACH</small><strong>Child-centred care</strong></div></div>
        </div>
      </section>

      <div className="marquee-band -rotate-[.7deg]" aria-hidden="true"><div>{["Inclusive education", "Individual growth", "Patient guidance", "Purposeful learning", "Inclusive education", "Individual growth"].map((x, i) => <span key={`${x}-${i}`}>{x}<i>✦</i></span>)}</div></div>

      <section id="content">
        <Section id="about" index="01" eyebrow="About me" title={<>Teaching with empathy.<br /><em>Leading with purpose.</em></>}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-24">
            <div className="lg:pl-[16.5%]" data-reveal><p className="font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.35] tracking-[-.02em] text-ink">{data.about}</p><div className="quote-glass mt-9 flex gap-4 rounded-3xl p-6"><Quote className="shrink-0 text-rose" size={28} /><p className="mb-0 font-display text-xl italic leading-relaxed text-ink/70">Progress looks different for every child. The work is to notice it, nurture it, and celebrate it.</p></div></div>
            <aside className="glass-card rounded-[30px] p-7 sm:p-8" data-reveal><div className="mb-3 flex items-center justify-between border-b border-ink/10 pb-5"><h3 className="font-display text-2xl font-semibold">Personal details</h3><Users size={20} className="text-rose" /></div><dl>{data.personal.map(([key, value]) => <div key={key} className="flex items-start justify-between gap-5 border-b border-ink/8 py-3.5 last:border-0"><dt className="text-xs text-muted">{key}</dt><dd className="m-0 text-right text-xs font-semibold text-ink">{value}</dd></div>)}</dl></aside>
          </div>
        </Section>

        <Section id="expertise" index="02" eyebrow="Capabilities" title={<>A thoughtful toolkit for<br /><em>meaningful outcomes.</em></>} tinted>
          <div className="grid gap-4 lg:grid-cols-3">{data.skills.map((skill, i) => { const Icon = skillIcons[i] || Sparkles; return <article key={skill.title} data-reveal style={{ "--card-delay": `${i * 80}ms` } as React.CSSProperties} className="skill-card group rounded-[28px] p-7 sm:p-8"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-rose">0{i + 1} · {skill.subtitle}</span><span className="skill-icon grid size-11 place-items-center rounded-2xl bg-ink text-white"><Icon size={19} /></span></div><h3 className="mb-8 mt-16 font-display text-3xl font-semibold tracking-tight">{skill.title}</h3><div className="flex flex-wrap gap-2">{skill.items.map(item => <span key={item} className="skill-pill rounded-full border border-ink/10 bg-white/45 px-3 py-2 text-[11px] font-medium">{item}</span>)}</div></article> })}</div>
        </Section>

        <Section id="journey" index="03" eyebrow="Experience" title={<>A decade devoted to<br /><em>helping children flourish.</em></>}>
          <div data-reveal className="journey-panel relative overflow-hidden rounded-[38px] p-6 sm:p-10 lg:p-14"><div className="absolute -bottom-48 -right-32 size-[430px] rounded-full bg-rose/10 blur-2xl" /><div className="growth-line"><span /><span /><span /></div><div className="mt-1 flex items-center justify-between"><span className="rounded-full bg-ink px-3 py-2 text-[9px] font-bold tracking-[.16em] text-white">10 YEARS</span><span className="text-[11px] text-muted">Army Special Education School · Kohat Cantt</span></div><div className="relative mt-12 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div><span className="eyebrow-text">SPECIAL EDUCATION · PRESENT</span><h3 className="mt-4 font-display text-5xl font-medium leading-none tracking-tight text-ink">Teacher &<br />learning advocate</h3><p className="mt-6 max-w-md text-sm leading-7 text-muted">Building structured, supportive learning experiences that honour each child&apos;s unique abilities and pace.</p></div><ul>{data.responsibilities.map(item => <li key={item} className="flex items-center gap-4 border-b border-ink/10 py-4 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-sage/15 text-sage"><Check size={14} /></span>{item}</li>)}</ul></div></div>
        </Section>

        <Section id="education" index="04" eyebrow="Education" title={<>Built on curiosity and<br /><em>continuous learning.</em></>} dark>
          <div className="education-timeline">{data.education.map((item, i) => <article key={`${item.degree}-${item.year}`} data-reveal style={{ "--card-delay": `${i * 90}ms` } as React.CSSProperties} className="education-item group grid grid-cols-[54px_1fr] gap-x-4 sm:grid-cols-[90px_40px_1.25fr_.75fr_45px] sm:items-center sm:gap-5"><span className="education-year font-display text-lg text-gold">{item.year}</span><span className="education-node hidden sm:grid" aria-hidden="true"><i /></span><div className="education-copy"><h3 className="font-display text-xl font-semibold text-white">{item.degree}</h3><p className="mt-1 text-xs text-white/50">{item.org}</p></div><p className="education-result col-start-2 mt-3 text-xs text-white/55 sm:col-auto sm:mt-0">{item.result}</p><span className="education-number hidden text-right font-display text-2xl italic text-white/15 sm:block">{String(i + 1).padStart(2, "0")}</span></article>)}</div>
        </Section>

        <Section id="recognition" index="05" eyebrow="Recognition" title={<>Learning, service and<br /><em>professional distinction.</em></>}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.credentials.map((item, i) => <article key={`${item.title}-${i}`} data-reveal style={{ "--card-delay": `${i * 75}ms` } as React.CSSProperties} className={`credential-card group relative min-h-[275px] overflow-hidden rounded-[26px] p-6 ${i === 0 ? "sm:col-span-2 featured" : ""}`}><div className="relative z-10 flex h-full flex-col"><span className="credential-icon relative mb-auto grid size-12 place-items-center overflow-hidden rounded-2xl bg-sage/15 text-sage">{item.image ? <Image unoptimized fill sizes="48px" src={item.image} alt="" className="object-cover" /> : <Award size={20} />}</span><span className="mt-12 text-[9px] font-bold tracking-[.18em] text-rose">{i === 0 ? "AWARD" : "CERTIFICATE"}</span><h3 className="mt-2 font-display text-xl font-semibold leading-tight">{item.title}</h3><p className="mt-2 text-[11px] text-muted">{item.issuer}</p>{item.image && <button onClick={() => setLightbox({ image: item.image, title: item.title })} className="credential-link mt-4 flex items-center gap-1 text-left text-[11px] font-bold text-rose">View credential <ArrowUpRight size={12} /></button>}</div></article>)}</div>
          {!!data.gallery.length && <div className="mt-20"><div className="mb-6 flex items-end justify-between"><div><span className="eyebrow-text">Certificate gallery</span><h3 className="mt-2 font-display text-3xl font-semibold">A closer look at the journey.</h3></div><span className="text-xs text-muted">{data.gallery.length} memories</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.gallery.map((item, i) => <button key={`${item.title}-${i}`} onClick={() => setLightbox(item)} className="gallery-image group relative aspect-[4/3] overflow-hidden rounded-3xl text-left"><Image unoptimized fill sizes="(max-width: 640px) 100vw, 33vw" src={item.image} alt={item.title} className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-ink/70 p-3 text-xs font-semibold text-white backdrop-blur-xl">{item.title}<ArrowUpRight size={14} /></span></button>)}</div></div>}
        </Section>

        <section id="contact" className="px-3 py-10 sm:px-6 sm:py-20"><div data-reveal className="contact-panel relative mx-auto max-w-[1240px] overflow-hidden rounded-[38px] px-5 py-20 text-center text-white sm:px-10 sm:py-28"><div className="contact-glow" /><span className="eyebrow-text relative !text-white/55">Let&apos;s connect</span><h2 className="relative mt-5 font-display text-[clamp(3.2rem,7vw,6.4rem)] font-medium leading-[.9] tracking-[-.055em]">Let&apos;s create room for<br /><em className="font-normal text-rose">every child to thrive.</em></h2><p className="relative mx-auto mt-8 max-w-xl text-sm leading-7 text-white/55">Open to meaningful conversations about inclusive education, learning support, and professional collaboration.</p><div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={`mailto:${data.contact.email}`} className="button-light"><Mail size={15} />{data.contact.email}</a><a href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`} className="button-dark"><Phone size={15} />{data.contact.phone}</a></div><div className="relative mt-9 flex items-center justify-center gap-2 text-[10px] text-white/45"><MapPin size={13} />{data.contact.location}</div></div></section>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-5 py-12 text-center text-xs text-muted sm:flex-row sm:text-left"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-ink font-display text-xs text-white">SM</span><p>Syeda Masooma Fatima<br />Special Education Teacher</p></div><p>References available on request.</p><div className="flex items-center gap-5"><Link href="/admin" className="hover:text-ink">Admin</Link><a href="#top" className="flex items-center gap-1 hover:text-ink">Back to top <ChevronRight className="-rotate-90" size={13} /></a></div></footer>

      {lightbox && <div role="dialog" aria-modal="true" aria-label={lightbox.title} className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white text-ink" aria-label="Close"><X /></button><div onClick={e => e.stopPropagation()} className="max-h-[88vh] max-w-5xl"><Image unoptimized width={1600} height={1200} src={lightbox.image} alt={lightbox.title} className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl" /><p className="mt-3 text-center font-display text-xl text-white">{lightbox.title}</p></div></div>}
    </main>
  );
}

function Section({ id, index, eyebrow, title, children, tinted = false, dark = false }: { id: string; index: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode; tinted?: boolean; dark?: boolean }) {
  return <section id={id} className={`section-shell scroll-mt-20 ${tinted ? "section-tinted" : ""} ${dark ? "section-dark" : ""}`}><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><div data-reveal className="mb-14 grid gap-7 lg:mb-20 lg:grid-cols-[.72fr_1.28fr]"><div className="flex items-center gap-3 self-start pt-2"><span className="font-display text-sm italic text-rose">{index}</span><span className={`eyebrow-text ${dark ? "!text-white/50" : ""}`}>{eyebrow}</span></div><h2 className={`section-title ${dark ? "text-white" : "text-ink"}`}>{title}</h2></div>{children}</div></section>;
}
