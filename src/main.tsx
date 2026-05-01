import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

document.addEventListener('mousemove', (e) => {
  const hero = (e.target as HTMLElement).closest('.hero-glow') as HTMLElement | null
  if (!hero) return
  const rect = hero.getBoundingClientRect()
  hero.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  hero.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  hero.style.setProperty('--glow-opacity', '1')
})

document.addEventListener('mouseover', (e) => {
  const hero = (e.target as HTMLElement).closest('.hero-glow') as HTMLElement | null
  if (hero) return
  document.querySelectorAll<HTMLElement>('.hero-glow').forEach(el => {
    el.style.setProperty('--glow-opacity', '0')
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
