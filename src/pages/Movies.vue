<script setup lang="ts">
import { computed, ref } from 'vue';
import MoviesList from '@/components/MoviesList.vue';
import MoviesControls from '@/components/MoviesControls.vue';
import type { Movie, Rating, Status, SortOrder, RatingFilter, StatusFilter } from '@/types/Movie';
import MovieStats from '@/components/MovieStats.vue';

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

const sortKey = ref('number')
const sortOrder = ref<SortOrder>('asc')
const sorted = computed(() => {
    const dir = sortOrder.value === 'asc' ? 1 : -1

    return [...movies.value].sort((a, b) => {
        switch (sortKey.value) {
            case 'number': return a.id.localeCompare(b.id) * dir
            case 'title': return a.title.localeCompare(b.title) * dir
            case 'date': return (a.year - b.year) * dir
            case 'rating': {
                if (a.rating === null && b.rating === null) return 0
                if (a.rating === null) return 1
                if (b.rating === null) return -1
                return (a.rating - b.rating) * dir
            }
            default: { return 0 }
        }
    })
})

const statusFilter = ref<StatusFilter>('all')
const ratingFilter = ref<RatingFilter>('all')
const filtered = computed(() =>
    sorted.value.filter(m => {
        if (statusFilter.value !== 'all' && statusFilter.value !== m.status) return false
        if (ratingFilter.value === 'rated' && m.rating === null) return false
        if (ratingFilter.value === 'unrated' && m.rating !== null) return false
        return true
    })
)

const search = ref('')
const searched = computed(() => filtered.value.filter(m => m.title.toLowerCase().includes(search.value.trim().toLowerCase())))

function setRating(id: Movie['id'], value: Rating) {
    const m = movies.value.find(m => m.id === id)
    if (m) m.rating = value
}
function setStatus(id: Movie['id'], value: Status) {
    const m = movies.value.find(m => m.id === id)
    if (m) m.status = value
}
const addMovie = (movie: Movie) => movies.value.push(movie)
const removeMovie = (movieId: string) => movies.value = movies.value.filter(m => m.id !== movieId)
</script>

<template>
    <div class="movie-wrap">
        <div class="controls-stats-wrap">
            <MoviesControls class="controls" v-model:sortKey="sortKey" v-model:sortOrder="sortOrder"
                v-model:statusFilter="statusFilter" v-model:ratingFilter="ratingFilter" v-model:search="search"
                @add-movie="addMovie" />
            <MovieStats class="stats" :movies="movies" />
        </div>
        <MoviesList :movies="searched" @set-rating="setRating" @set-status="setStatus" @remove-movie="removeMovie" />
    </div>
</template>

<style scoped>
.movie-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.controls-stats-wrap {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "controls stats";
    gap: 20px;
}

.controls {
    grid-area: controls;
}

.stats {
    grid-area: stats;
}

@media (max-width: 900px) {
    .controls-stats-wrap {
        grid-template-columns: 1fr;
        grid-template-areas:
            "stats"
            "controls";
    }
}
</style>