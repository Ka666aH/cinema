import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, Rating, Status } from '@/types/Movie'
export const useMovieStore = defineStore('movies', () => {
    const movies = ref<Movie[]>(
        [
            {
                id: '1',
                posterURL: 'https://m.media-amazon.com/images/M/MV5BZTk3ZThjZjgtYjhlMi00YjFlLWFkMjQtOGM0MTQxMGNmMzhjXkEyXkFqcGc@._V1_.jpg',
                title: 'Stay',
                year: 2005,
                genre: 'Mistery',
                status: 'watched',
                rating: 9
            },
            {
                id: '2',
                posterURL: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
                title: 'Fight Club',
                year: 1999,
                genre: 'Action',
                status: 'planned',
                rating: null
            },
            {
                id: '3',
                posterURL: 'https://m.media-amazon.com/images/M/MV5BM2Y0YmM5MWYtZTYzNi00ZjU5LTlmOGYtZDQ4ODQyMjAzNjQ2XkEyXkFqcGc@._V1_.jpg',
                title: 'The Prestige',
                year: 2006,
                genre: 'Nolan',
                status: 'watched',
                rating: 8
            },
            {
                id: '4',
                posterURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHSoSnuHdECIHnajW_x_xfUadR_fI4lZDe8d8WRgZUA&s',
                title: "Schindler's List",
                year: 1993,
                genre: 'Drama',
                status: 'planned',
                rating: 9
            }
        ]
    )
    function getMovie(id: Movie['id']) { return movies.value.find(m => m.id === id) }
    function addMovie(movie: Movie) { movies.value.push(movie) }
    function removeMovie(id: Movie['id']) { movies.value = movies.value.filter(m => m.id !== id) }
    function setStatus(id: Movie['id'], value: Status) {
        const m = getMovie(id)
        if (m) m.status = value
    }
    function setRating(id: Movie['id'], value: Rating) {
        const m = getMovie(id)
        if (m) m.rating = value
    }
    return { movies, getMovie, addMovie, removeMovie, setStatus, setRating }
})