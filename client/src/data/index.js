import { comments } from './comments'
import { movies } from './movies'
import { default as users } from './users'

export const pages = 2
export const page1 = comments.slice(0, 9)
export const page2 = comments.slice(10)


export { comments, movies, users }