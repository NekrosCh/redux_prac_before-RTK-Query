// import { heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice";
// import {filtersFetched, filtersFetching, filtersFetchingError } from '../components/heroesFilters/filtersSlice'

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }
// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const heroesDelete = (id) => {
//     return {
//         type: 'HEROES_DELETE',
//         payload: id
//     }
// }

// export const heroesCreated = (newHero) => {
//     return {
//         type: 'HEROES_CREATED',
//         payload: newHero
//     }
// }

// export const activeFilterChanged = (activeFilter) => {  
//      return {
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: activeFilter
//         }
// }

// export const activeFilterChanged = (activeFilter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: activeFilter
//         })
//     }, 1000)
// }