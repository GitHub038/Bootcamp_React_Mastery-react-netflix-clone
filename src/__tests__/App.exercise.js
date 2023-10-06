// 🐶 importe tout ce dont tu as besoin pour les tests
// import * as React from 'react'
// 🐶 importe 'render' 'screen' 'waitForElementToBeRemoved' depuis 'test/test-utils'
// 🐶 importe également
import {
  render,
  screen,
  waitForElementToBeRemoved,
  sampleMovie,
  bookmark,
  resultsMovies,
} from 'test/test-utils'
// import userEvent from '@testing-library/user-event'
// import {App} from 'App'
import userEvent from '@testing-library/user-event'
import {App} from 'App'
import {AUTH_URL, API_URL, localStorageTokenKey} from 'config'
import {server, rest} from 'mocks'
import * as authNetflix from '../utils/authNetflixProvider'

beforeEach(() => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  server.use(
    rest.get(`${AUTH_URL}/me`, async (req, res, ctx) => {
      return res(ctx.json({user}))
    }),
    rest.get(`${API_URL}/movie/:id`, async (req, res, ctx) => {
      return res(ctx.json({sampleMovie}))
    }),
    rest.get(`${API_URL}/tv/:id`, async (req, res, ctx) => {
      return res(ctx.json({sampleMovie}))
    }),
    rest.get(`${AUTH_URL}/bookmark`, async (req, res, ctx) => {
      return res(ctx.json({bookmark}))
    }),
    rest.get(`${API_URL}/*`, async (req, res, ctx) => {
      return res(ctx.json({resultsMovies}))
    }),
  )
})

afterEach(async () => {
  await authNetflix.logout()
})

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
test("rendu de l'app en mode connecté", async () => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  window.localStorage.setItem(localStorageTokenKey, user.token)
  render(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(screen.queryByText(/Connexion/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Inscrivez vous/i)).not.toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Accueil'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Series'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Films'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Nouveautés les plus regardées'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Ma liste'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Films Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les mieux notés'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Action & aventure'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les meilleurs Thriller'}),
  ).toBeInTheDocument()
})

//bonus-2
test('rendu de route la /series', async () => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  window.localStorage.setItem(localStorageTokenKey, user.token)
  const route = `/series`
  window.history.pushState({}, 'Page series Netflix', route)
  render(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(
    screen.getByRole('heading', {name: 'Séries tendances Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries les mieux notées'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les séries populaires'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les documentaires'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les séries criminelles'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
