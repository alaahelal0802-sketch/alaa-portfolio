// Vercel serverless function: GET /api/playlist?id=PLAYLIST_ID
// Returns { videos: [{ id, title }] } for a YouTube playlist.
// 1) If YOUTUBE_API_KEY is set in Vercel, it uses the official YouTube Data API.
// 2) Otherwise it reads the public playlist page.
// Vercel caches the answer for 1 hour, so YouTube is not called on every visit.

const ID_RE = /^[\w-]{10,64}$/

async function fromApi(id, key) {
  const videos = []
  let pageToken = ''
  for (let i = 0; i < 4; i++) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet,status')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', id)
    url.searchParams.set('key', key)
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const r = await fetch(url)
    if (!r.ok) throw new Error('YouTube API ' + r.status)
    const data = await r.json()
    for (const item of data.items || []) {
      const s = item.snippet || {}
      const status = item.status?.privacyStatus
      if (status === 'private' || status === 'privacyStatusUnspecified') continue
      const vid = s.resourceId?.videoId
      if (vid) videos.push({ id: vid, title: s.title || '' })
    }
    if (!data.nextPageToken) break
    pageToken = data.nextPageToken
  }
  return videos
}

async function fromPage(id) {
  const r = await fetch('https://www.youtube.com/playlist?list=' + id + '&hl=en', {
    headers: { 'accept-language': 'en-US,en;q=0.9', 'user-agent': 'Mozilla/5.0' },
  })
  if (!r.ok) throw new Error('YouTube page ' + r.status)
  const html = await r.text()
  const videos = []
  const seen = new Set()
  const re = /"playlistVideoRenderer":\{"videoId":"([\w-]{11})".*?"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/gs
  for (const m of html.matchAll(re)) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    let title = m[2]
    try { title = JSON.parse('"' + m[2] + '"') } catch {}
    videos.push({ id: m[1], title })
  }
  if (!videos.length) {
    for (const m of html.matchAll(/"videoId":"([\w-]{11})"/g)) {
      if (!seen.has(m[1])) { seen.add(m[1]); videos.push({ id: m[1], title: '' }) }
    }
  }
  return videos
}

export default async function handler(req, res) {
  const id = String(req.query?.id || '')
  if (!ID_RE.test(id)) {
    res.status(400).json({ error: 'Bad playlist id' })
    return
  }
  try {
    const key = process.env.YOUTUBE_API_KEY
    const videos = key ? await fromApi(id, key) : await fromPage(id)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ videos })
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=300')
    res.status(502).json({ error: String(e.message || e) })
  }
}
