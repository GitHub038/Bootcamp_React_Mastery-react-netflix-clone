import * as React from 'react'
import * as authNetflix from '../utils/authNetflixProvider'
import {clientAuth, clientNetFlix} from '../utils/clientApi'
import {useFetchData} from '../utils/hooks'
import {useQueryClient} from 'react-query'
import {useClearHistory} from './HistoryMoviesContext'
import LoadingFullScreen from '../components/LoadingFullScreen'
const AuthContext = React.createContext()

// 🐶 optimise les performences de AuthProvider
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth() s'utilise avec <AuthContext.provider>")
  }
  return context
}

async function getUserByToken() {
  let user = null
  const token = await authNetflix.getToken()
  if (token) {
    const data = await clientAuth('me', {token})
    user = data.data.user
  }
  return user
}

const AuthProvider = props => {
  const queryclient = useQueryClient()
  const {data: authUser, execute, status, setData} = useFetchData()
  const clearHistory = useClearHistory()
  React.useEffect(() => {
    execute(getUserByToken())
  }, [execute])

  const [authError, setAuthError] = React.useState()

  // 🐶 utilise useCallback sur les fonctions 'login' , 'register' , 'logout'
  const login = React.useCallback(
    data =>
      authNetflix
        .login(data)
        .then(user => setData(user))
        .catch(err => setAuthError(err)),
    [setData],
  )
  const register = React.useCallback(
    data =>
      authNetflix
        .register(data)
        .then(user => setData(user))
        .catch(err => setAuthError(err)),
    [setData],
  )
  const logout = React.useCallback(() => {
    authNetflix.logout()
    queryclient.clear()
    clearHistory()
    setData(null)
  }, [clearHistory, queryclient, setData])

  const value = React.useMemo(() => {
    return {authUser, login, register, logout, authError}
  }, [authUser, login, register, logout, authError])

  if (status === 'fetching' || status === 'idle') {
    return <LoadingFullScreen />
  }

  if (status === 'done') {
    // 🐶 utilise useMemo pour mémoïser {authUser, login, register, logout, authError}
    // attention les hooks ne peuvent pas etre utiliser dans du code conditionnel
    // const value =  {authUser, login, register, logout, authError}
    return <AuthContext.Provider value={value} {...props} />
  }
  throw new Error('status invalide')
}

const useClientNetflix = () => {
  const {
    authUser: {token},
  } = useAuth()
  return (endpoint, data) => clientNetFlix(endpoint, {...data, token})
}

export {AuthContext, useAuth, AuthProvider, useClientNetflix}
