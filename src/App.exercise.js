import * as React from 'react'
// 🐶 'mocks' permet de simuler le backend netflix avec MSW,
// ne t'en preocupe pas pour le moment
import './mocks'
// 🐶 'authNetflix' notre outils founis par les devs back qui permet de se connecter
// 🤖 import * as authNetflix from './utils/authNetflixProvider'
import * as authNetflix from './utils/authNetflixProvider'
import {createTheme, ThemeProvider} from '@mui/material/styles'
// 🐶 'AuthApp' contient tout ce qu'il y avait avant dans 'App'
// il est importé est retourné, nous avons donc le meme comportement qu'avant
import {AuthApp} from 'AuthApp'
import {UnauthApp} from 'UnauthApp.exercise'
// 🐶 'UnauthApp' qui contiendra le contenu de l'application en mode non connecté

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

// 🐶 on veut afficher soit <AuthApp /> soit <UnauthApp />
// en fonction d'un user connecté ou non
function App() {
  // 🐶 créé un state 'authUser' qui contiendra le 'user' connecté

  const [authUser, setAuthUser] = React.useState(user)
  // 🐶 créé une fonction 'login' avec un paramètre 'data' (objet avec 'username' et 'password')
  // cette fonction appellera ensuite la fonction 'login' de 'authNetflix' avec data en parametre
  // met ensuite à jour 'authUser' avec le resultat de la fonction
  const login = data => {
    setAuthUser(authNetflix.login(data))
  }

  // 🐶 créé une fonction 'register' avec un paramètre 'data' (objet avec 'username' et 'password')
  // cette fonction appellera ensuite la fonction 'register' de  'authNetflix' avec data en parametre
  // met ensuite à jour 'authUser' avec le resultat de la fonction
  const register = data => {
    setAuthUser(authNetflix.register(data))
  }
  // 🐶 créé une fonction 'logout' qui appelle la fonction 'logout' de  'authNetflix'
  // et met à jour 'authUser' à null
  // note : pour tester la deconnexion on poura cliquer sur le logo avatar (haut droite de la Appbar)
  const logout = () => {
    authNetflix.logout()
    setAuthUser(null)
  }

  return (
    <ThemeProvider theme={theme}>
      {/* 🐶 conditionne l'affichage de <AuthApp /> <UnauthApp /> en fonction de 'authUser'   */}
      {/* 🐶 passe le prop 'logout' à  <AuthApp />    */}
      {/* 🐶 passe les prop 'login' et 'register'  à  <UnauthApp />    */}
      {authUser === null ? (
        <UnauthApp login={login} register={register} />
      ) : (
        <AuthApp logout={logout} />
      )}
    </ThemeProvider>
  )
}

export {App}
