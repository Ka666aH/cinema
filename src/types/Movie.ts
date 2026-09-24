import type { MovieRating } from "./MovieRating"
import type { MovieStatus } from "./MovieStatus"

export interface Movie {
    id: string
    posterURL: string
    title: string
    year: number
    genre: string
    status: MovieStatus
    rating: MovieRating
}