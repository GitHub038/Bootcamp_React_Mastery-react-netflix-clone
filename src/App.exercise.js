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
import {AppProviders} from './context'

function App() {
  // 🐶 créé objet contennant : authUser, authError, login, register, logout
  // il sera passé en 'props' 'value' de <AuthContext.Provider />

  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  return authUser ? <AuthApp /> : <UnauthApp />
}
export {App}
