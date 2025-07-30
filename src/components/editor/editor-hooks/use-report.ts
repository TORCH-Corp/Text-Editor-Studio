import { useCallback, useEffect, useRef } from 'react'

const getElement = (): HTMLElement | null => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null
  }
  
  let element = document.getElementById('report-container')

  if (element === null) {
    element = document.createElement('div')
    element.id = 'report-container'
    element.style.position = 'fixed'
    element.style.top = '50%'
    element.style.left = '50%'
    element.style.fontSize = '32px'
    element.style.transform = 'translate(-50%, -50px)'
    element.style.padding = '20px'
    element.style.background = 'rgba(240, 240, 240, 0.4)'
    element.style.borderRadius = '20px'

    if (document.body) {
      document.body.appendChild(element)
    }
  }

  return element
}

export function useReport(): (arg0: string) => ReturnType<typeof setTimeout> | null {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cleanup = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }
    
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }

    const element = getElement()
    if (document.body && element) {
      try {
        document.body.removeChild(element)
      } catch (error) {
        // Element might not be in DOM, ignore
      }
    }
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return useCallback(
    (content) => {
      if (typeof window === 'undefined') {
        return null
      }
      
      console.log(content)
      const element = getElement()
      if (!element) {
        return null
      }
      
      if (timer.current !== null) {
        clearTimeout(timer.current)
      }
      element.innerHTML = content
      timer.current = setTimeout(cleanup, 1000)
      return timer.current
    },
    [cleanup]
  )
}
