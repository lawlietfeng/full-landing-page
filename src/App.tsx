import { useState, useEffect, useMemo, useCallback } from 'react'
import { SchemaRenderer, ComponentRegistry } from '@lawlietfeng/faui/full'
import type { Content } from '@lawlietfeng/faui/full'

import shellJson from './schemas/shell.json'
import homeJson from './schemas/home.json'
import componentsJson from './schemas/components.json'
import showcaseJson from './schemas/showcase.json'
import guideJson from './schemas/guide.json'
import tableJson from './schemas/table.json'
import dashboardJson from './schemas/dashboard.json'
import { mockHttpRequest } from './mock'

const VALID_PAGES = new Set(['home', 'components', 'showcase', 'guide', 'table', 'dashboard'])
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

function getPageFromPath(): string {
  const pathname = window.location.pathname
  const path = BASE_PATH ? pathname.replace(BASE_PATH, '') : pathname
  const segment = path.replace(/^\//, '')
  return VALID_PAGES.has(segment) ? segment : 'home'
}

type Screen = 'mobile' | 'tablet' | 'desktop'

function useMediaQuery(): Screen {
  const [screen, setScreen] = useState<Screen>(() => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    if (w < 768) return 'mobile'
    if (w < 1200) return 'tablet'
    return 'desktop'
  })

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)')
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)')

    const update = () => {
      if (mobile.matches) setScreen('mobile')
      else if (tablet.matches) setScreen('tablet')
      else setScreen('desktop')
    }

    mobile.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => {
      mobile.removeEventListener('change', update)
      tablet.removeEventListener('change', update)
    }
  }, [])

  return screen
}

const pageSchemas: Record<string, Content> = {
  home: homeJson as unknown as Content,
  components: componentsJson as unknown as Content,
  showcase: showcaseJson as unknown as Content,
  guide: guideJson as unknown as Content,
  table: tableJson as unknown as Content,
  dashboard: dashboardJson as unknown as Content,
}

function mergeSchemas(shell: Content, pages: Record<string, Content>): Content {
  const allComponents = [...(shell.components || [])]
  const mergedDataModel = { ...(shell.dataModel || {}) }

  for (const [key, page] of Object.entries(pages)) {
    if (page.components) {
      allComponents.push(...page.components)
    }
    if (page.dataModel) {
      (mergedDataModel as Record<string, unknown>)[key] = page.dataModel[key] ?? page.dataModel
    }
  }

  return {
    ...shell,
    components: allComponents,
    dataModel: mergedDataModel,
  }
}

export default function App() {
  const screen = useMediaQuery()
  const [currentPage, setCurrentPage] = useState(getPageFromPath)

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getPageFromPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const schema = useMemo(() => {
    return mergeSchemas(shellJson as unknown as Content, pageSchemas)
  }, [])

  const liveData = useMemo(() => ({ screen, currentPage }), [screen, currentPage])

  const handleAction = useCallback((action: { action: string; path?: string; value?: unknown }) => {
    if (action.action === 'update_data' && action.path === '/currentPage') {
      const page = String(action.value || 'home')
      setCurrentPage(page)
      window.scrollTo(0, 0)
      const url = page === 'home' ? `${BASE_PATH}/` : `${BASE_PATH}/${page}`
      history.pushState(null, '', url)
    }
  }, [])

  return (
    <SchemaRenderer
      schema={schema}
      componentRegistry={ComponentRegistry}
      liveData={liveData}
      httpRequest={mockHttpRequest}
      onAction={handleAction}
    />
  )
}
