import { useCallback, useEffect, useRef, useState } from 'react'

// Shares an event URL natively when possible and falls back to copying it.
function useShareEvent(event) {
  const [status, setStatus] = useState('idle')
  const timerRef = useRef(null)

  const share = useCallback(async () => {
    const url = `${window.location.origin}/events?event=${event.slug}`
    const text = event.tagline || event.summary || ''
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text, url })
        setStatus('shared')
        return
      } catch (error) {
        if (error.name === 'AbortError') return
      }
      try {
        await navigator.clipboard.writeText(url)
        setStatus('copied')
      } catch {
        setStatus('failed')
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setStatus('copied')
      } catch {
        setStatus('failed')
      }
    }
  }, [event])

  useEffect(() => {
    if (status === 'idle') return undefined
    timerRef.current = window.setTimeout(() => setStatus('idle'), 3000)
    return () => window.clearTimeout(timerRef.current)
  }, [status])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])
  return { share, status }
}

export default useShareEvent
