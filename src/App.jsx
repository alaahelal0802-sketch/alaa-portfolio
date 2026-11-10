import { useEffect, useState } from 'react'
import { Footer, Nav } from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Tools from './components/Tools.jsx'
import { PlayerProvider } from './components/Video.jsx'

// Simple routes:  #/  = home,  #/tools = AI Tools page,  #/#work = home and scroll to "work"
function readRoute() {
  const h = window.location.hash || '#/'
  if (h.startsWith('#/tools')) return { page: 'tools', anchor: '' }
  const anchor = h.startsWith('#/#') ? h.slice(3) : h.startsWith('#') && !h.startsWith('#/') ? h.slice(1) : ''
  return { page: 'home', anchor }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (route.anchor) {
      const el = document.getElementById(route.anchor)
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0 })
    }
    document.title = route.page === 'tools' ? 'AI Tools | Alaa Helal' : 'Alaa Helal | Motion Designer & Video Editor'
  }, [route])

  return (
    <PlayerProvider>
      <Nav page={route.page} />
      <main>{route.page === 'tools' ? <Tools /> : <Home />}</main>
      <Footer />
    </PlayerProvider>
  )
}
