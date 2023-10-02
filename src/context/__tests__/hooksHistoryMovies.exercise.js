// 🐶 importe renderHook et act depuis '@testing-library/react-hooks'
//import {renderHook, act} from '@testing-library/react-hooks'
import {renderHook, act} from '@testing-library/react-hooks'
// 🐶 importe les hook a tester
// import {
//   useClearHistory,
//   useNavigateMovie,
//   useAddToHistory,
// } from '../../context/HistoryMoviesContext'
import {
  useClearHistory,
  useNavigateMovie,
  useAddToHistory,
} from '../../context/HistoryMoviesContext'
import {HistoryMovieProvider} from '../../context/HistoryMoviesContext'
import {TYPE_MOVIE, TYPE_TV} from 'config'

const wrapperHistoryContext = ({children}) => {
  return <HistoryMovieProvider>{children}</HistoryMovieProvider>
} // note met en commun ce wrapper pour tous les tests

// 🐶 test du hook useNavigateMovie() et des valeurs par default
test('useNavigateMovie() valeurs par defauts', async () => {
  // 🐶 utilise 'renderHook' pour faire le rendu du hook useNavigateMovie()
  // 📝 https://react-hooks-testing-library.com/usage/basic-hooks
  // const {result} = renderHook(() => useNavigateMovie())
  const {result} = renderHook(() => useNavigateMovie(), {
    wrapper: wrapperHistoryContext,
  })
  // 🐶 passe lui un wrapper
  // 🐶 passe lui un wrapper
  // const wrapperHistoryContext = ({children}) => {
  //   return <HistoryMovieProvider>{children}</HistoryMovieProvider>
  // } // note met en commun ce wrapper pour tous les tests
  // 🐶 verifie que le resultat 'result.current' contienne
  // movies: [],
  // series: [],
  // addMovie: expect.any(Function),
  // addSerie: expect.any(Function),
  // clearHistory: expect.any(Function),
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

// 🐶 test du hook useClearHistory()
test('useClearHistory() est bien une fonction', async () => {
  const {result} = renderHook(() => useClearHistory(), {
    wrapper: wrapperHistoryContext,
  })
  // 🐶 verifie que le resultat 'result.current' contienne une fonction
  expect(result.current).toEqual(expect.any(Function))
})

// 🐶 test du hook useClearHistory() et addMovie
test('useNavigateMovie() addMovie', async () => {
  // 🐶 fait le rendu de useNavigateMovie()
  // créé un const movie
  // 🤖 const movie = {id: '550', name: 'fakeMovie'}
  // utilise 'act' pour faire appel à addMovie(movie)
  // note : addMovie se trouve dans current 🤖 result.current.addMovie()
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(() => useNavigateMovie(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
  act(() => {
    result.current.addMovie(movie)
  })
  expect(result.current).toEqual({
    movies: [movie],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

// 🐶 teste maintenant l'ajout via le hook useAddToHistory()
test('ajout de films via useAddToHistory()', async () => {
  // 🐶 fait le rendu de 3 hooks en meme temps dans 'renderHook' mais ne retourne que useNavigateMovie()
  // useAddToHistory(movie, TYPE_MOVIE)
  // useAddToHistory(movie, TYPE_TV)
  // return useNavigateMovie()
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(
    () => {
      useAddToHistory(movie, TYPE_MOVIE)
      useAddToHistory(movie, TYPE_TV)
      return useNavigateMovie()
    },
    {
      wrapper: wrapperHistoryContext,
    },
  )

  expect(result.current).toEqual({
    movies: [movie],
    series: [movie],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
  // 🐶 verifie le resultat contient bien 1 fims et 1 serie
})
