import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, Rating, Status } from '@/types/Movie'

const STORAGE_KEY = 'movies'

function loadMovies(): Movie[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const useMovieStore = defineStore('movies', () => {
    const movies = ref<Movie[]>(loadMovies())
    watch(movies, (v) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
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