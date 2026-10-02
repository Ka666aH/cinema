import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, Rating, Status } from '@/types/Movie'

const STORAGE_KEY = 'movies.v1'

function loadMovies(): Movie[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isMovie)
    } catch {
        return []
    }
}

function isMovie(x: unknown): x is Movie {
    return typeof x === 'object' && x !== null
        && typeof (x as Movie).id === 'string'
        && typeof (x as Movie).title === 'string'
}

export const useMovieStore = defineStore('movies', () => {
    const movies = ref<Movie[]>(loadMovies())
    watch(movies, (v) => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)) }
        catch { }
    }, { deep: true })

    const maxId = movies.value.reduce((max, m) => Math.max(max, Number(m.id)), 0)
    const _nextId = ref<number>(maxId + 1)
    const nextId = computed(() => _nextId.value)
    function getMovie(id: Movie['id']) { return movies.value.find(m => m.id === id) }
    function addMovie(movie: Movie) {
        movies.value.push(movie)
        _nextId.value++
    }
    function removeMovie(id: Movie['id']) { movies.value = movies.value.filter(m => m.id !== id) }
    function setStatus(id: Movie['id'], value: Status) {
        const m = getMovie(id)
        if (m) m.status = value
    }
    function setRating(id: Movie['id'], value: Rating) {
        const m = getMovie(id)
        if (m) m.rating = value
    }
    return { movies, nextId, getMovie, addMovie, removeMovie, setStatus, setRating }
})