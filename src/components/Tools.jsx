import { motion } from 'framer-motion'
import { tools } from '../content.js'
import { EASE, reveal } from '../lib/motion.js'

export default function Tools() {
  return (
    <section className="pb-10 pt-10 md:pt-16">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <div className="eyebrow">AI Tools</div>
          <h1 className="mt-4 font-display font-black leading-[0.92] tracking-[-0.04em]" style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}>
            Tools I build<br />for <span className="text-purple">editors.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-mist" style={{ fontSize: 20 }}>
            Plugins that save hours in After Effects and Premiere Pro. More tools are coming.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-8">
          {tools.map((t) => (
            <motion.article key={t.name} {...reveal} className="grid items-center gap-10 rounded-3xl border border-line bg-panel p-6 md:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div className="grid grid-cols-2 gap-4">
                {(t.images || []).map((src) => (
                  <img key={src} src={src} alt={t.name} className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
                ))}
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {(t.hosts || []).map((h) => (
                    <span key={h} className="rounded-full border border-lemon/35 bg-lemon/10 px-3 py-1 text-xs font-semibold text-lemon">{h}</span>
                  ))}
                </div>
                <h2 className="mt-5 font-display font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>{t.name}</h2>
                <p className="mt-4 text-mist" style={{ fontSize: 19 }}>{t.text}</p>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {(t.features || []).map((f, i) => (
                    <li key={f.title + i} className="flex items-baseline gap-3.5">
                      <span className="font-bold text-lemon">{String(i + 1).padStart(2, '0')}</span>
                      <span><b className="font-semibold">{f.title}</b> <span className="text-mist">{f.text}</span></span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  {t.downloadUrl ? (
                    <a href={t.downloadUrl} target="_blank" rel="noreferrer" className="btn-lemon">Download →</a>
                  ) : (
                    <span className="btn-lemon cursor-default opacity-60">Coming soon</span>
                  )}
                  {t.price && <span className="text-mist">{t.price}</span>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
