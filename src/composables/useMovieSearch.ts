import type { MovieDraft } from "@/types/Movie";
import { ref } from "vue";

const BASE_URL = 'https://swapi.dev/api/films/'

interface SwapiMovie {
    title: string
    episode_id: number
    director: string
    release_date: string
}

interface SwapiResponse {
    count: number
    next: string | null
    previous: string | null
    results: SwapiMovie[]
}
export function useMovieSearch() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<MovieDraft[]>([])
    let controller: AbortController | null = null

    async function search(query: string) {
        const q = query.trim()
        if (!q) return
        const c = new AbortController()
        controller?.abort()
        controller = c
        loading.value = true
        error.value = null

        try {
            const url = `${BASE_URL}?search=${encodeURIComponent(q)}`
            const response = await fetch(url, { signal: c.signal })
            if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
            const responseData = await response.json() as SwapiResponse
            data.value = responseData.results.map(m => ({
                posterURL: '',
                title: m.title,
                year: new Date(m.release_date).getFullYear(),
                genre: 'Star Wars',
            }))
        } catch (e) {
            if (c.signal.aborted) return
            error.value = e instanceof Error ? e.message : 'Network error'
            data.value = []
        } finally { if (!c.signal.aborted) loading.value = false }
    }
    return { loading, error, data, search }
}