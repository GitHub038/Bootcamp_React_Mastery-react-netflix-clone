// pas d'exercise ici mais utile pour le bonus-3
import * as React from 'react'
import './../mocks'
import {createTheme, ThemeProvider} from '@mui/material/styles'

import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// 🐶 importe 'AuthContext' pour wrapper 'AuthApp' et 'UnauthApp'
import {AuthProvider} from './AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: (failureCount, error) => {
        if (error.status === 404) return false
        else if (error.status === 401) return false
        else if (failureCount > 3) return false
        else return true
      },
    },
    mutations: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: 1,
      // mutation options
    },
  },
})

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#767676',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

const AppProviders = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* 🐶 wrappe 'Backdrop', 'AuthApp' 'UnauthApp' avec <AuthContext.Provider /> */}
        {/* <AuthContext.Provider value={authObj}> */}
        <AuthProvider>
          {/* {status === 'fetching' ? (
            <Backdrop open={true}>
              <CircularProgress color="primary" />
            </Backdrop>
          ) :  */}
          {/* {authUser ? (
            // <AuthApp logout={logout} />
            <AuthApp />
          ) : (
            // <UnauthApp login={login} register={register} error={authError} />
            <UnauthApp />
          )} */}
          {children}
        </AuthProvider>
        {/* </AuthContext.Provider> */}
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export {AppProviders}
