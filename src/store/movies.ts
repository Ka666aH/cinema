import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_RATING, DEFAULT_STATUS, type Movie, type MovieDraft, type Rating, type Status } from '@/types/Movie'

const STORAGE_KEY = 'movies.v1'

function loadMovies(): Movie[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isMovie)
    } catch { return [] }
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
    function createMovie(draft: MovieDraft): Movie {
        return {
            id: nextId.value.toString(),
            posterURL: draft.posterURL,
            title: draft.title,
            year: draft.year,
            genre: draft.genre,
            status: DEFAULT_STATUS,
            rating: DEFAULT_RATING
        }
    }
    function addMovie(draft: MovieDraft) {
        movies.value.push(createMovie(draft))
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
    return { movies, nextId, getMovie, createMovie, addMovie, removeMovie, setStatus, setRating }
})