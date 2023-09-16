/* eslint-disable no-unused-vars */
import * as React from 'react'
// 🐶 créé un contexte 'HistoryMovieContext' avec 'createContext'
// const HistoryMovieContext = null
const HistoryMovieContext = React.createContext()

// 🐶 créé un provider 'HistoryMovieProvider'
const HistoryMovieProvider = props => {
  // 🐶 créé 2 states 'movies' et 'series' initialisés à []
  const [movies, setMovies] = React.useState([])
  const [series, setSeries] = React.useState([])

  console.log('sao')
  console.log(series)
  console.log('series')

  const value = {movies, series, setMovies, setSeries}
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
export {HistoryMovieContext, useNavigateMovie, HistoryMovieProvider}
