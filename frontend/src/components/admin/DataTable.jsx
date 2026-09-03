import React, { useMemo, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'

/**
 * Generic, lightly-sortable admin table.
 * columns: [{ key, label, render?(row) }]
 */
export default function DataTable({ columns, rows, loading, error, onRetry, emptyMessage = 'No records found.', getRowKey }) {
  const [sort, setSort] = useState({ key: null, dir: 'asc' })

  const sortedRows = useMemo(() => {
    if (!rows) return []
    if (!sort.key) return rows
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (av == null) return 1
      if (bv == null) return -1
      if (av < bv) return sort.dir === 'asc' ? -1 : 1
      if (av > bv) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [rows, sort])

  const toggleSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
  }

  if (loading) return <Loader rows={5} />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (!rows || rows.length === 0) return <EmptyState title="Nothing here yet" message={emptyMessage} />

  return (
    <div className="overflow-x-auto border border-gold/20 rounded-md bg-ivory">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr className="text-left border-b border-gold/20 text-warmbrown text-xs uppercase tracking-wide">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">
                {col.sortable ? (
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-gold"
                  >
                    {col.label}
                    {sort.key === col.key ? (
                      sort.dir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : null}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr key={getRowKey ? getRowKey(row) : row._id || row.id || i} className="border-b border-gold/10 last:border-0 hover:bg-cream/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle text-charcoal/80">
                  {col.render ? col.render(row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
