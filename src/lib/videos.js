import { useEffect, useState } from 'react'
import snapshot from '../data/snapshot.json'
import { hiddenVideos, titles, tags } from '../content.js'

const cache = new Map()

async function loadPlaylist(id) {
  if (cache.has(id)) return cache.get(id)
  const p = (async () => {
    try {
      const r = await fetch('/api/playlist?id=' + encodeURIComponent(id))
      if (!r.ok) throw new Error(String(r.status))
      const data = await r.json()
      if (Array.isArray(data.videos) && data.videos.length) return data.videos
      throw new Error('empty')
    } catch {
      return snapshot[id] || []
    }
  })()
  cache.set(id, p)
  return p
}

function mixLists(lists) {
  const out = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i])
  return out
}

function initial(section) {
  // Show the backup copy right away, so the page is never empty while loading.
  const lists = section.playlists.map((id) => snapshot[id] || [])
  return prepare(section, lists)
}

function prepare(section, lists) {
  const hidden = new Set(hiddenVideos)
  const clean = lists.map((l) => l.filter((v) => v.id && !hidden.has(v.id)))
  const all = section.mix ? mixLists(clean) : clean.flat()
  const seen = new Set()
  return all
    .filter((v) => (seen.has(v.id) ? false : (seen.add(v.id), true)))
    .map((v) => ({ id: v.id, title: titles[v.id] || v.title || '', tag: tags[v.id] || '' }))
}

export function useSectionVideos(section) {
  const [videos, setVideos] = useState(() => initial(section))
  useEffect(() => {
    let alive = true
    Promise.all(section.playlists.map(loadPlaylist)).then((lists) => {
      if (alive) setVideos(prepare(section, lists))
    })
    return () => {
      alive = false
    }
  }, [section])
  return videos
}

export const thumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
export const thumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`
