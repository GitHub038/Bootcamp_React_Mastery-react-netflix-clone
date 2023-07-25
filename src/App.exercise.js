import * as React from 'react'
import './mocks'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {AuthApp} from 'AuthApp'
import {UnauthApp} from 'UnauthApp'

import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// 🐶 importe 'AuthContext' pour wrapper 'AuthApp' et 'UnauthApp'
import {AuthProvider} from './context/AuthContext'
import {useAuth} from './context/AuthContext'

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

function App() {
  // 🐶 créé objet contennant : authUser, authError, login, register, logout
  // il sera passé en 'props' 'value' de <AuthContext.Provider />

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
          <AppConsumer />
        </AuthProvider>
        {/* </AuthContext.Provider> */}
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  return authUser ? <AuthApp /> : <UnauthApp />
}
export {App}
