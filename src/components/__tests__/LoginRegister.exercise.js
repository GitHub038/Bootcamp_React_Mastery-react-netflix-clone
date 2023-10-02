import * as React from 'react'
// 🐶 importe {render, screen, waitForElementToBeRemoved} depuis 'test/test-utils'
import {render, screen, waitForElementToBeRemoved} from 'test/test-utils'
// va dans 'test/test-utils' pour creer le wrapper

// 🐶 importe 'userEvent'
// 🐶 importe le composant à tester : LoginRegister
import userEvent from '@testing-library/user-event'
import {LoginRegister} from '../LoginRegister'

// 🐶 dans ce test nous allons vérifier que :
// par defaut la popup est en mode connexion et lors que clique sur 'Nouveau chez Netflix'
// la popup passe en 'register'
test('Popup de login ou register', async () => {
  // 🐶 créé une constante qui contient le libellé de la popup en mode 'connexion'
  const connexion = 'Connexion'
  // 🐶 créé une constante qui contient le libellé de la popup en mode 'register'
  const register = 'Inscrivez vous'

  // 🐶 faire le rendu du composant avec 'render'
  render(<LoginRegister open={true} />)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  // 🐶 pour rappel la 'AuthProvider' retourne un <circularProgress/> le temps d'avoir le authUser
  // attend l'affichage avec 'waitForElementToBeRemoved' utilise screen.debug() pour voir sur quel element te baser
  // screen.debug()

  // 🐶 verifie que la page contient bien 'Connexion'
  // 🐶 simule un clique sur le boutton 'Nouveau sur Netflix ?'
  // 🐶 verifie que la page contient bien 'Inscrivez vous'

  // On récupère le rôle sur les headers.
  expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()
  userEvent.click(screen.getByRole('button', {name: /Nouveau sur Netflix ?/i}))
  expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()
})
