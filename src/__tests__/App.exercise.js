// 🐶 importe tout ce dont tu as besoin pour les tests
// import * as React from 'react'
// 🐶 importe 'render' 'screen' 'waitForElementToBeRemoved' depuis 'test/test-utils'
// 🐶 importe également
import {render, screen, waitForElementToBeRemoved} from 'test/test-utils'
// import userEvent from '@testing-library/user-event'
// import {App} from 'App'
import userEvent from '@testing-library/user-event'
import {App} from 'App'

// 🐶 fait un test en async
test("rendu de l'app avec page de Login", async () => {
  const connexion = 'Connexion'
  const register = 'Inscrivez vous'
  // 🐶 fait le rendu de <App>
  render(<App />)
  // 🐶 attend la suppression du composant de loading
  // grace à waitForElementToBeRemoved et  'screen.getByRole('alert'))'
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  // 🐶 vérifie que 'Connexion' est dans le document
  expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()
  // 🐶 simule un click sur 'Nouveau sur Netflix ?'
  userEvent.click(screen.getByRole('button', {name: /Nouveau sur Netflix ?/i}))
  // 🐶 vérifie que 'Inscrivez vous' est dans le document
  expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()
})

//bonus-1
test.todo("rendu de l'app en mode connecté")

//bonus-2
test.todo('rendu de route la /series')
