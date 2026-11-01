import { useCallback, useEffect, useState } from 'react'
import { fetchPeople } from '../services/aboutService'
import { groupPeople } from '../utils/people'

// Loads About people once, supports retry and cancels an active request on cleanup.
function usePeople() {
  const [groups, setGroups] = useState({ clergy: [], officials: [], societyLeaders: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    // Fetches and stores the list unless this effect has been cancelled.
    async function loadPeople() {
      setLoading(true)
      setError(null)
      try {
        const people = await fetchPeople({ signal: controller.signal })
        setGroups(groupPeople(people))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPeople()
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  return { ...groups, loading, error, retry }
}

export default usePeople
