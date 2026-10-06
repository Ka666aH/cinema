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
export function useFilmSearch() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<MovieDraft[]>([])
    let controller: AbortController | null = null

    async function search(query: string) {
        const q = query.trim()
        if (!q) return
        if (controller) controller.abort()
        controller = new AbortController()
        loading.value = true
        error.value = null

        try {
            const url = `${BASE_URL}?search=${encodeURIComponent(q)}`
            const response = await fetch(url, { signal: controller.signal })
            if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
            const responseData = await response.json() as SwapiResponse
            data.value = responseData.results.map(m => ({
                posterURL: '',
                title: m.title,
                year: new Date(m.release_date).getFullYear(),
                genre: 'Star Wars',
            }))
        } catch (e) {
            if (controller.signal.aborted) return
            error.value = e instanceof Error ? e.message : 'Network error'
            data.value = []
        } finally { if (!controller.signal.aborted) loading.value = false }
    }
    return { loading, error, data, search }
}