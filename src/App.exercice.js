import * as React from 'react'
import './mocks'
// 🐶 Note que pour 'AuthApp' et 'UnauthApp' on a utilisé un 'export default'
// 🤖 ancien code
// import {AuthApp} from 'AuthApp'
// import {UnauthApp} from 'UnauthApp'
// ceci est necessaire pour React.Lazy

// ⛏️ supprime les deux imports de 'AuthApp' et 'UnauthApp' car nous allons les importer dynamiquement
// import AuthApp from 'AuthApp'
// import UnauthApp from 'UnauthApp'
import {useAuth} from './context/AuthContext'
import {AppProviders} from './context'

// 🐶 importe 'LoadingFullScreen' le composant qui sera utilisé en fallback de React.Suspense
// 🤖 import LoadingFullScreen from './components/LoadingFullScreen'
import LoadingFullScreen from './components/LoadingFullScreen'

// 🐶 importe dynamiquement 'AuthApp' et 'UnauthApp' grace a 'React.Lazy'
// 📝 https://reactjs.org/docs/code-splitting.html#reactlazy
const AuthApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthApp'),
)
const UnauthApp = React.lazy(() => import('./UnauthApp'))

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  // 🐶 wrappe le rendu avec  <React.Suspense> et utilisel le prop 'fallback'
  // pour passer le composant de chargement <LoadingFullScreen />
  return (
    <React.Suspense fallback={LoadingFullScreen}>
      <section>{authUser ? <AuthApp /> : <UnauthApp />}</section>
    </React.Suspense>
  )
}

export {App}
