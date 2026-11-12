import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site, sections } from '../content.js'
import { EASE, reveal, stagger } from '../lib/motion.js'
import { thumb, useSectionVideos } from '../lib/videos.js'
import { PlayIcon, usePlayer, VideoCard } from './Video.jsx'

function Hero() {
  const h = site.hero
  return (
    <section className="relative overflow-hidden">
      <div className="gridbg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-16 top-5 h-[560px] w-[560px] md:h-[760px] md:w-[760px]"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,.42), transparent 62%)' }}
        aria-hidden="true"
      />
      <div className="wrap relative pb-10 pt-2 md:pt-5">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16 lg:grid-cols-[480px_1fr]">
          <motion.div
            className="relative mx-auto h-[360px] w-full max-w-[340px] md:h-[600px] md:max-w-none lg:h-[640px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img
              src={h.image || '/images/alaa-portrait.jpg'}
              alt={'Portrait of ' + site.name}
              className="portrait-mask h-full w-full object-cover object-[50%_15%]"
            />
          </motion.div>
          <div>
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
              {h.eyebrow}
            </motion.div>
            <h1 className="mt-6 font-display font-black leading-[0.86] tracking-[-0.04em]" style={{ fontSize: 'clamp(64px, 11vw, 150px)' }}>
              {[...h.titleLines, h.titleAccent].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className={'block ' + (i === h.titleLines.length ? 'text-purple' : '')}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-8 max-w-[560px] text-mist"
              style={{ fontSize: 'clamp(18px, 1.6vw, 21px)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            >
              {h.text}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
            >
              <a href="#/#contact" className="btn-lemon">{h.primaryButton} →</a>
              <a href="#/#work" className="link-line">{h.secondaryButton} ↓</a>
            </motion.div>
          </div>
        </div>
        <div className="ruler relative mt-12 h-[70px] border-t border-line md:mt-16" aria-hidden="true">
          <div className="absolute inset-x-0 top-8 flex justify-between text-[11px] tracking-[0.08em] text-dim">
            {['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00'].map((t, i) => (
              <span key={t} className={i % 2 ? 'hidden sm:inline' : ''}>{t}</span>
            ))}
          </div>
          <div className="playhead absolute bottom-0 top-0 w-0.5 bg-lemon">
            <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-sm bg-lemon" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Showreel() {
  const open = usePlayer()
  const r = site.showreel
  const [playing, setPlaying] = useState(false)
  const frameRef = useRef(null)

  // Show the video only once YouTube says it is really playing.
  // Until then the thumbnail stays on top, so YouTube's play button and loading spinner never show.
  useEffect(() => {
    setPlaying(false)
    const onMsg = (e) => {
      if (!String(e.origin).includes('youtube')) return
      let d = e.data
      try { if (typeof d === 'string') d = JSON.parse(d) } catch { return }
      const state = d?.info?.playerState ?? (d?.event === 'onStateChange' ? d.info : undefined)
      if (state === 1) setPlaying(true)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [r.videoId])

  if (!r.videoId) return null
  const bg =
    `https://www.youtube-nocookie.com/embed/${r.videoId}?autoplay=1&mute=1&loop=1&playlist=${r.videoId}` +
    '&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=0&enablejsapi=1' +
    '&origin=' + encodeURIComponent(window.location.origin)
  const listen = () => {
    const w = frameRef.current?.contentWindow
    if (!w) return
    const send = (o) => w.postMessage(JSON.stringify(o), '*')
    send({ event: 'listening', id: 'showreel' })
    send({ event: 'command', func: 'addEventListener', args: ['onStateChange'] })
  }
  return (
    <section className="pt-6 md:pt-10">
      <div className="wrap">
        <motion.button
          {...reveal}
          type="button"
          onClick={() => open({ id: r.videoId, title: 'Showreel' })}
          className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-line bg-panel text-left md:aspect-[16/8.2]"
          aria-label="Watch the showreel"
        >
          <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <iframe
              ref={frameRef}
              src={bg}
              title="Showreel preview"
              tabIndex={-1}
              allow="autoplay; encrypted-media"
              onLoad={listen}
              className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 scale-[1.18]"
              style={{ border: 0, aspectRatio: '16 / 9', height: 'auto' }}
            />
          </span>
          <img
            src={thumb(r.videoId)}
            alt=""
            className={'pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ' + (playing ? 'opacity-0' : 'opacity-100')}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-10 md:bottom-9">
            <span>
              <span className="eyebrow block">Showreel</span>
              <span className="mt-2 block font-display font-extrabold tracking-[-0.03em]" style={{ fontSize: 'clamp(24px, 3.4vw, 44px)' }}>{r.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-ink/50 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition duration-500 group-hover:border-lemon group-hover:text-lemon">
              Full screen ↗
            </span>
          </span>
        </motion.button>
      </div>
    </section>
  )
}

function WorkIntro() {
  return (
    <section id="work" className="scroll-mt-6 pt-24 md:pt-32">
      <div className="wrap">
        <motion.div {...reveal}>
          <div className="eyebrow">My work</div>
          <div className="mt-3.5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="font-display font-extrabold leading-none tracking-[-0.035em]" style={{ fontSize: 'clamp(44px, 6vw, 72px)' }}>Pick a field.</h2>
            <div className="flex flex-wrap gap-2.5">
              {sections.map((s, i) => (
                <a key={s.id} href={'#/#' + s.id} className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold transition hover:border-lemon hover:text-lemon">
                  <span className="mr-1.5 text-lemon">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function WorkSection({ section, index }) {
  const videos = useSectionVideos(section)
  const [showAll, setShowAll] = useState(false)
  const vertical = section.format === 'vertical'
  const shown = showAll ? videos : videos.slice(0, section.limit)
  const more = videos.length - shown.length
  const grid = vertical
    ? 'grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-[18px] lg:gap-y-6'
    : videos.length <= 2
      ? 'grid gap-6 sm:grid-cols-2'
      : 'grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section id={section.id} className="scroll-mt-6 pt-24 md:pt-28">
      <div className="wrap">
        <motion.div {...reveal} className="mb-9 flex items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <div className="font-display text-xl font-extrabold text-lemon">{String(index + 1).padStart(2, '0')}</div>
            <h3 className="mt-2 font-display font-extrabold leading-none tracking-[-0.035em]" style={{ fontSize: 'clamp(36px, 4.6vw, 56px)' }}>{section.title}</h3>
            <p className="mt-3 text-mist">{section.text}</p>
          </div>
          {videos.length > 0 && <span className="hidden shrink-0 text-sm text-mist sm:block">{videos.length} videos</span>}
        </motion.div>

        {videos.length === 0 ? (
          <motion.div {...reveal} className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-line2 bg-panel/40 p-10 text-center">
            <span className="h-2.5 w-2.5 rounded-full bg-lemon" />
            <p className="font-display text-2xl font-bold">{section.emptyText || 'Coming soon.'}</p>
          </motion.div>
        ) : (
          <div className={grid}>
            <AnimatePresence initial={false}>
              {shown.map((v, i) => (
                <motion.div key={v.id} {...stagger(i)} exit={{ opacity: 0 }} layout="position">
                  <VideoCard video={v} vertical={vertical} showTitle={section.showTitles} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {more > 0 && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAll(true)} className="rounded-full border border-line2 px-7 py-3.5 font-semibold transition hover:border-lemon hover:text-lemon">
              Show all {videos.length} videos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function Clients() {
  const list = site.clients
  if (!list.length) return null
  return (
    <section className="pt-28 md:pt-36">
      <div className="wrap">
        <motion.div {...reveal}>
          <div className="eyebrow">Clients</div>
          <h2 className="mt-3.5 font-display font-extrabold leading-none tracking-[-0.035em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>Brands I worked with.</h2>
        </motion.div>
        <motion.ul {...reveal} className="mt-9 grid grid-cols-2 overflow-hidden rounded-2xl border border-line sm:grid-cols-3 lg:grid-cols-5">
          {list.map((c) => (
            <li key={c.name} className="-mb-px -mr-px flex h-24 items-center justify-center border-b border-r border-line px-4 text-center font-display text-lg font-bold text-mist transition hover:text-white md:h-[120px] md:text-xl">
              {c.logo ? <img src={c.logo} alt={c.name} className="max-h-12 max-w-[70%] object-contain opacity-80 transition hover:opacity-100" loading="lazy" /> : c.name}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function About() {
  const a = site.about
  return (
    <section id="about" className="scroll-mt-6 pt-28 md:pt-36">
      <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <motion.div {...reveal}>
          <div className="eyebrow">About</div>
          <h2 className="mt-3.5 font-display font-extrabold leading-none tracking-[-0.035em]" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
            {a.title.map((t) => <span key={t} className="block">{t}</span>)}
            <span className="block text-purple">{a.titleAccent}</span>
          </h2>
        </motion.div>
        <motion.div {...reveal} className="text-mist lg:pt-11" style={{ fontSize: 19 }}>
          <p>{a.text}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {a.tools.map((t) => <span key={t} className="chip px-3.5 py-2 text-sm">{t}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const c = site.contact
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  return (
    <section id="contact" className="scroll-mt-6 pb-10 pt-24 md:pt-32">
      <div className="wrap">
        <motion.div {...reveal} className="flex flex-col justify-between gap-10 rounded-[28px] bg-lemon p-8 text-ink md:p-14 lg:flex-row lg:items-end lg:p-[72px]">
          <div className="min-w-0">
            <div className="text-[13px] font-bold tracking-[0.16em]">CONTACT</div>
            <h2 className="mt-4 font-display font-black leading-[0.95] tracking-[-0.035em]" style={{ fontSize: 'clamp(44px, 6.4vw, 84px)' }}>
              {c.title.map((t) => <span key={t} className="block">{t}</span>)}
            </h2>
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-[340px]">
            {c.email ? (
              <div className="flex items-center gap-2">
                <a href={'mailto:' + c.email} className="flex h-[60px] min-w-0 flex-1 items-center justify-center truncate rounded-full bg-ink px-6 text-lg font-semibold text-lemon">
                  {c.email}
                </a>
                <button onClick={copy} className="h-[60px] shrink-0 rounded-full border border-ink/30 px-5 font-semibold" aria-live="polite">
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            ) : (
              <span className="flex h-[60px] items-center justify-center rounded-full bg-ink text-lg font-semibold text-lemon">[Your email]</span>
            )}
            <div>
              <div className="mb-3 text-[13px] font-bold tracking-[0.16em]">FOLLOW ME</div>
              <div className="flex flex-wrap gap-2">
                {c.socials.map((s) =>
                  s.url ? (
                    <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple">
                      {s.label} ↗
                    </a>
                  ) : (
                    <span key={s.label} className="rounded-full border border-ink/25 px-4 py-2.5 text-sm font-semibold text-ink/45">{s.label}</span>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
      <WorkIntro />
      {sections.map((s, i) => <WorkSection key={s.id} section={s} index={i} />)}
      <Clients />
      <About />
      <Contact />
    </>
  )
}
