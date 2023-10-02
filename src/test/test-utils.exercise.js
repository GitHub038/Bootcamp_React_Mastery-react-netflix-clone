// 🐶 Toutes les dependances necessaires

// import * as React from 'react'
// import {render as renderReactTestingLib} from '@testing-library/react'
// import {AuthProvider} from '../context/AuthContext'
// import {createTheme, ThemeProvider} from '@mui/material/styles'
// import {QueryClient, QueryClientProvider} from 'react-query'
// import {HistoryMovieProvider} from '../context/HistoryMoviesContext'
import * as React from 'react'
import {render as renderReactTestingLib} from '@testing-library/react' // on renomme le render car on va créer notre propre render.
import {AuthProvider} from '../context/AuthContext'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {QueryClient, QueryClientProvider} from 'react-query'
import {HistoryMovieProvider} from '../context/HistoryMoviesContext'
import {AppProviders} from 'context'

// 🐶 créé une instance de 'queryClient' et 'theme'
// 🤖
// const queryClient = new QueryClient()
// const theme = createTheme()
// const queryClient = new QueryClient()
// const theme = createTheme()

const wrapperHistoryContext = ({children}) => {
  return <HistoryMovieProvider>{children}</HistoryMovieProvider>
  // } // note met en commun ce wrapper pour tous les tests
}

// 🐶 créé une fonction 'render' qui contiendra le wrapper qui contiendra tous les providers de src/context.index.js

// SAO : Attention là on a optimisé pour utilisé directement le wrapper de l'appli mais
// si on a des themes ou autres choses de custom que l'on veut tester alors
// faudra repasser par un wrapper custom comme ci dessous
function render(ui, {...options} = {}) {
  // const wrapper = ({children}) => {
  // retourne l'arbre de ces composants avec les bons props
  // QueryClientProvider
  // ThemeProvider
  // HistoryMovieProvider
  // AuthProvider
  // return (
  // <QueryClientProvider client={queryClient}>
  //   <ThemeProvider theme={theme}>
  //     <HistoryMovieProvider>
  //       <AuthProvider>{children}</AuthProvider>
  //     </HistoryMovieProvider>
  //   </ThemeProvider>
  // </QueryClientProvider>
  // )
  // }
  // return null //renderReactTestingLib(ui, {wrapper, ...options})
  return renderReactTestingLib(ui, {wrapper: AppProviders, ...options})
}

export * from '@testing-library/react'
// surcharge de render
export {render, wrapperHistoryContext}
