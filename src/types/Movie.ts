export interface Movie {
    id: string
    posterURL: string
    title: string
    year: number
    genre: string
    status: Status
    rating: Rating
}
export type Status = 'planned' | 'watched';
export type Rating = number | null;
export type SortOrder = 'asc' | 'desc'

export type StatusFilter = 'all' | Status
export type RatingFilter = 'all' | 'rated' | 'unrated'