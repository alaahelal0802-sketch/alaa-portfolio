import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'
import { thumb, thumbFallback, watchUrl } from '../lib/videos.js'

const PlayerCtx = createContext(() => {})
export const usePlayer = () => useContext(PlayerCtx)

export function PlayerProvider({ children }) {
  const [video, setVideo] = useState(null)
  const close = useCallback(() => setVideo(null), [])

  useEffect(() => {
    if (!video) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [video, close])

  return (
    <PlayerCtx.Provider value={setVideo}>
      {children}
      <AnimatePresence>
        {video && (
          <motion.div
            key="player"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={video.title || 'Video'}
          >
            <motion.div
              className={
                'relative overflow-hidden rounded-2xl border border-line bg-black shadow-2xl ' +
                (video.vertical ? 'aspect-[9/16] h-[86vh] max-w-full' : 'aspect-video w-full max-w-5xl')
              }
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title || 'Video'}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </motion.div>
            <div className="absolute right-4 top-4 flex items-center gap-3" style={{ top: 'max(16px, env(safe-area-inset-top))' }}>
              <a
                href={watchUrl(video.id)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hidden rounded-full border border-line2 px-4 py-2 text-sm text-mist hover:text-white sm:inline-flex"
              >
                Open on YouTube ↗
              </a>
              <button
                onClick={close}
                aria-label="Close video"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PlayerCtx.Provider>
  )
}

export function PlayIcon({ size = 64 }) {
  return (
    <span
      className="flex items-center justify-center rounded-full border border-white/25 bg-ink/55 backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:border-lemon group-hover:bg-lemon"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.32} height={size * 0.32} viewBox="0 0 24 24" className="ml-[3px] fill-white transition group-hover:fill-ink">
        <path d="M6 4l15 8-15 8z" />
      </svg>
    </span>
  )
}

export function VideoCard({ video, vertical, showTitle }) {
  const open = usePlayer()
  const [src, setSrc] = useState(thumb(video.id))
  return (
    <div>
      <button
        type="button"
        onClick={() => open({ id: video.id, title: video.title, vertical })}
        className={
          'group relative block w-full overflow-hidden rounded-2xl border border-line bg-panel ' +
          (vertical ? 'aspect-[9/16]' : 'aspect-video')
        }
        aria-label={'Play ' + (video.title || 'video')}
      >
        <img
          src={src}
          onError={() => src !== thumbFallback(video.id) && setSrc(thumbFallback(video.id))}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition group-hover:opacity-90" />
        <span
          className={
            'absolute inset-0 flex items-center justify-center transition duration-500 ' +
            (vertical ? 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100' : '')
          }
        >
          <PlayIcon size={vertical ? 52 : 64} />
        </span>
      </button>
      {showTitle && (video.title || video.tag) && (
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <span className="truncate text-[17px] font-semibold">{video.title}</span>
          {video.tag && <span className="chip shrink-0">{video.tag}</span>}
        </div>
      )}
    </div>
  )
}
