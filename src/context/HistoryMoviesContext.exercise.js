/* eslint-disable no-unused-vars */
import * as React from 'react'
import {TYPE_TV} from 'config'

// 🐶 créé un contexte 'HistoryMovieContext' avec 'createContext'
// const HistoryMovieContext = null
const HistoryMovieContext = React.createContext()
const MAX_ELEMENTS = 3
// Bonus 1
const reducer = (state, action) => {
  switch (action.type) {
    case 'addSerie':
      return {
        ...state,
        series: [action.payload, ...state.series.slice(0, MAX_ELEMENTS - 1)],
      }
    case 'addMovie':
      return {
        ...state,
        movies: [action.payload, ...state.movies.slice(0, MAX_ELEMENTS - 1)],
      }
    case 'clear':
      return {
        movies: [],
        series: [],
      }
    default:
      throw new Error('Action non supporté')
  }
}

const initialState = {
  series: [],
  movies: [],
}

// 🐶 créé un provider 'HistoryMovieProvider'
const HistoryMovieProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {series, movies} = state
  // 🐶 créé 2 states 'movies' et 'series' initialisés à []
  // const [movies, setMovies] = React.useState([])
  // const [series, setSeries] = React.useState([])
  // const value = {movies, series, setMovies, setSeries}

  const addSerie = React.useCallback(
    serie => dispatch({type: 'addSerie', payload: serie}),
    [dispatch],
  )

  const addMovie = React.useCallback(
    movie => dispatch({type: 'addMovie', payload: movie}),
    [dispatch],
  )

  const clearHistory = React.useCallback(
    () => dispatch({type: 'clear'}),
    [dispatch],
  )

  const value = {movies, series, addSerie, addMovie, clearHistory}

  // retourne <HistoryMovieContext.Provider> en passant les props suivants :
  // - value = movies, series, setMovies, setSeries
  // - laisse passer ensuite tous les autres props avec un spread opérator {...props}
  // return null
  return <HistoryMovieContext.Provider value={value} {...props} />
}
// 🐶 créé un hook  'useNavigateMovie' qui retourn le contexte 'HistoryMovieContext'
// ou une Error :"useNavigateMovie() s'utilise avec <HistoryMovieContext.Provider>"
// si le context est null

const useNavigateMovie = () => {
  const context = React.useContext(HistoryMovieContext)
  if (!context) {
    throw new Error(
      "useNavigateMovie() s'utilise avec <HistoryMovieContext.provider>",
    )
  }
  return context
}

//Bonus 2
const useAddToHistory = (movie, type = TYPE_TV) => {
  const {addMovie, addSerie} = useNavigateMovie()

  React.useEffect(() => {
    if (movie) {
      type === TYPE_TV ? addSerie(movie) : addMovie(movie)
    }
  }, [movie])
}

//Bonus 3
const useClearHistory = () => {
  const {clearHistory} = useNavigateMovie()
  return clearHistory
}

export {
  HistoryMovieContext,
  useNavigateMovie,
  HistoryMovieProvider,
  useAddToHistory,
  useClearHistory,
}
