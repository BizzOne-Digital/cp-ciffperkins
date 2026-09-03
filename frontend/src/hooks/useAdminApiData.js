import { useCallback, useEffect, useState } from 'react'
import { adminApi, getErrorMessage } from '../utils/api'

export default function useAdminApiData(path, { deps = [], transform } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadIndex, setReloadIndex] = useState(0)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.get(path)
      const raw = res.data?.data
      setData(transform ? transform(raw) : raw)
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load this content right now.'))
    } finally {
      setLoading(false)
    }
  }, [path]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, reloadIndex, ...deps])

  const retry = useCallback(() => setReloadIndex((i) => i + 1), [])

  return { data, loading, error, retry, refetch: retry }
}
