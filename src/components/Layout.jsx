import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../content.js'
import { EASE } from '../lib/motion.js'

const links = [
  { label: 'Work', href: '#/#work' },
  { label: 'AI Tools', href: '#/tools', badge: 'NEW' },
  { label: 'About', href: '#/#about' },
  { label: 'Contact', href: '#/#contact' },
]

export function Nav({ page }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="relative z-30">
      <div className="wrap flex h-20 items-center justify-between md:h-24">
        <a href="#/" className="font-display text-xl font-extrabold tracking-tight">
          {site.name}
          <span className="text-lemon">.</span>
        </a>
        <nav className="hidden items-center gap-9 text-[15px] font-medium text-mist md:flex" aria-label="Main">
          {links.map((l) => {
            const active = (page === 'tools' && l.href === '#/tools') || (page === 'home' && l.label === 'Work')
            return (
              <a key={l.label} href={l.href} className={'inline-flex items-center gap-2 transition hover:text-white ' + (active ? 'text-white' : '')}>
                {l.label}
                {l.badge && <span className="rounded-full bg-lemon px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-ink">{l.badge}</span>}
              </a>
            )
          })}
        </nav>
        <div className="hidden items-center gap-2.5 text-sm text-mist md:flex">
          <span className="h-2 w-2 rounded-full bg-lemon shadow-[0_0_0_4px_rgba(198,242,78,.15)]" />
          {site.status}
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span className={'absolute left-0 top-0 h-0.5 w-5 bg-white transition ' + (open ? 'translate-y-[5px] rotate-45' : '')} />
            <span className={'absolute bottom-0 left-0 h-0.5 w-5 bg-white transition ' + (open ? '-translate-y-[5px] -rotate-45' : '')} />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="wrap absolute inset-x-0 top-full border-b border-line bg-ink pb-6 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            aria-label="Mobile"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-line py-4 font-display text-2xl font-bold"
              >
                {l.label}
                {l.badge && <span className="rounded-full bg-lemon px-1.5 py-0.5 font-body text-[10px] font-bold text-ink">{l.badge}</span>}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  const socials = site.contact.socials.filter((s) => s.url)
  return (
    <footer className="wrap flex flex-col items-center justify-between gap-5 pb-12 pt-6 text-sm text-dim md:flex-row">
      <span>© {new Date().getFullYear()} {site.name}</span>
      {socials.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3.5 py-1.5 text-mist transition hover:border-lemon hover:text-lemon">
              {s.label}
            </a>
          ))}
        </div>
      )}
      <a href="#/" className="hover:text-white">Back to top ↑</a>
    </footer>
  )
}
