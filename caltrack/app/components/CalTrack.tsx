'use client'

import { useState, useEffect, useRef } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const DAILY_TARGET = 2000

interface MealEntry {
  id: string
  date: string // YYYY-MM-DD
  food: string
  calories: number
}

interface FoodSuggestion {
  name: string
  calories: number
}

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getLast7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

function formatDayLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function CalTrack() {
  const [tab, setTab] = useState<'today' | 'history'>('today')
  const [entries, setEntries] = useState<MealEntry[]>([])
  const [foodInput, setFoodInput] = useState('')
  const [calorieInput, setCalorieInput] = useState('')
  const [suggestions, setSuggestions] = useState<FoodSuggestion[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFood, setEditFood] = useState('')
  const [editCalories, setEditCalories] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('caltrack-entries')
    if (stored) setEntries(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('caltrack-entries', JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    if (foodInput.length < 2) {
      setSuggestions([])
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoadingSuggestions(true)
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(foodInput)}&json=1&page_size=5&fields=product_name,nutriments`
        )
        const data = await res.json()
        const results: FoodSuggestion[] = (data.products || [])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((p: any) => p.product_name && p.nutriments?.['energy-kcal_100g'])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((p: any) => ({
            name: p.product_name,
            calories: Math.round(p.nutriments['energy-kcal_100g']),
          }))
          .slice(0, 5)
        setSuggestions(results)
      } catch {
        setSuggestions([])
      } finally {
        setLoadingSuggestions(false)
      }
    }, 400)
  }, [foodInput])

  const todayEntries = entries.filter((e) => e.date === getToday())
  const todayCalories = todayEntries.reduce((sum, e) => sum + e.calories, 0)
  const todayRemaining = DAILY_TARGET - todayCalories

  function addEntry() {
    const cal = parseInt(calorieInput)
    if (!foodInput.trim() || isNaN(cal) || cal <= 0) return
    const entry: MealEntry = {
      id: crypto.randomUUID(),
      date: getToday(),
      food: foodInput.trim(),
      calories: cal,
    }
    setEntries((prev) => [...prev, entry])
    setFoodInput('')
    setCalorieInput('')
    setSuggestions([])
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  function startEdit(entry: MealEntry) {
    setEditingId(entry.id)
    setEditFood(entry.food)
    setEditCalories(entry.calories.toString())
  }

  function saveEdit() {
    const cal = parseInt(editCalories)
    if (!editFood.trim() || isNaN(cal) || cal <= 0) return
    setEntries((prev) =>
      prev.map((e) => (e.id === editingId ? { ...e, food: editFood.trim(), calories: cal } : e))
    )
    setEditingId(null)
  }

  function selectSuggestion(s: FoodSuggestion) {
    setFoodInput(s.name)
    setCalorieInput(s.calories.toString())
    setSuggestions([])
  }

  const last7Days = getLast7Days()
  const chartData = last7Days.map((date) => {
    const consumed = entries
      .filter((e) => e.date === date)
      .reduce((sum, e) => sum + e.calories, 0)
    return { date, label: formatDayLabel(date), consumed }
  })

  const weekNetDeficit = chartData.reduce((sum, d) => sum + (DAILY_TARGET - d.consumed), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">CalTrack</h1>
          <p className="text-sm text-gray-500">Daily target: {DAILY_TARGET.toLocaleString()} kcal</p>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-xl mx-auto px-4 flex gap-6">
          {(['today', 'history'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-medium border-b-2 capitalize transition-colors ${
                tab === t
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {tab === 'today' && (
          <>
            {/* Summary card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm text-gray-500">Consumed</p>
                  <p className="text-4xl font-bold text-gray-900">{todayCalories.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">of {DAILY_TARGET.toLocaleString()} kcal</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{todayRemaining >= 0 ? 'Remaining' : 'Over by'}</p>
                  <p
                    className={`text-2xl font-semibold ${
                      todayRemaining >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {Math.abs(todayRemaining).toLocaleString()} kcal
                  </p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    todayCalories > DAILY_TARGET ? 'bg-red-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min((todayCalories / DAILY_TARGET) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Log meal card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Log a meal</h2>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Food name (e.g. Banana)"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {(suggestions.length > 0 || loadingSuggestions) && (
                  <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg top-full mt-1 left-0">
                    {loadingSuggestions && (
                      <div className="px-3 py-2 text-sm text-gray-400">Searching...</div>
                    )}
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex justify-between items-center border-t first:border-t-0"
                      >
                        <span className="truncate mr-2">{s.name}</span>
                        <span className="text-gray-400 text-xs shrink-0">{s.calories} kcal/100g</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Calories"
                  value={calorieInput}
                  onChange={(e) => setCalorieInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  min="1"
                />
                <button
                  onClick={addEntry}
                  disabled={!foodInput.trim() || !calorieInput}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Today's meals */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 pt-5 pb-3 border-b">
                <h2 className="text-sm font-semibold text-gray-700">
                  Today&apos;s meals{' '}
                  <span className="text-gray-400 font-normal">({todayEntries.length})</span>
                </h2>
              </div>
              {todayEntries.length === 0 ? (
                <p className="px-6 py-10 text-sm text-gray-400 text-center">No meals logged yet</p>
              ) : (
                <ul className="divide-y">
                  {todayEntries.map((entry) => (
                    <li key={entry.id} className="px-6 py-3">
                      {editingId === entry.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            value={editFood}
                            onChange={(e) => setEditFood(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                          <input
                            type="number"
                            value={editCalories}
                            onChange={(e) => setEditCalories(e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                          />
                          <button
                            onClick={saveEdit}
                            className="text-blue-500 text-sm font-medium hover:text-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-400 text-sm hover:text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-800">{entry.food}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600">
                              {entry.calories.toLocaleString()} kcal
                            </span>
                            <button
                              onClick={() => startEdit(entry)}
                              className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {tab === 'history' && (
          <>
            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-1">7-day overview</h2>
              <p className="text-xs text-gray-400 mb-4">
                Calories consumed vs {DAILY_TARGET.toLocaleString()} kcal target &mdash; blue = under, red = over
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: string) => v.split(',')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`${Number(value).toLocaleString()} kcal`, 'Consumed']}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  />
                  <ReferenceLine
                    y={DAILY_TARGET}
                    stroke="#3b82f6"
                    strokeDasharray="4 4"
                    label={{ value: 'Target', position: 'insideTopRight', fontSize: 10, fill: '#3b82f6' }}
                  />
                  <Bar dataKey="consumed" radius={[4, 4, 0, 0]} maxBarSize={44}>
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.consumed > DAILY_TARGET ? '#f87171' : '#60a5fa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Daily breakdown */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 pt-5 pb-3 border-b flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-700">Daily breakdown</h2>
                <span
                  className={`text-xs font-medium ${weekNetDeficit >= 0 ? 'text-green-600' : 'text-red-500'}`}
                >
                  7-day {weekNetDeficit >= 0 ? 'deficit' : 'surplus'}:{' '}
                  {Math.abs(weekNetDeficit).toLocaleString()} kcal
                </span>
              </div>
              <ul className="divide-y">
                {chartData.map((d) => {
                  const diff = DAILY_TARGET - d.consumed
                  return (
                    <li key={d.date} className="px-6 py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-600">{d.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-800">
                          {d.consumed.toLocaleString()} kcal
                        </span>
                        {d.consumed > 0 && (
                          <span
                            className={`ml-2 text-xs ${diff >= 0 ? 'text-green-500' : 'text-red-400'}`}
                          >
                            {diff >= 0 ? `−${diff.toLocaleString()}` : `+${Math.abs(diff).toLocaleString()}`}
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
