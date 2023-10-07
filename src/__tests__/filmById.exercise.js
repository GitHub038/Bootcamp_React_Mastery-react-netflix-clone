/* eslint-disable no-unused-vars */
import * as React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  sampleMovie,
  resultsMovies,
  bookmark,
} from 'test/test-utils'
//import userEvent from '@testing-library/user-event'
import {
  AUTH_URL,
  API_URL,
  imagePathOriginal,
  localStorageTokenKey,
  TYPE_MOVIE,
} from 'config'
//import {App} from 'App'
import {App} from 'App'
import * as authNetflix from '../utils/authNetflixProvider'
import {server, rest} from 'mocks'
import userEvent from '@testing-library/user-event'

afterEach(async () => {
  await authNetflix.logout()
})

beforeEach(() => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  server.use(
    rest.get(`${AUTH_URL}/me`, async (req, res, ctx) => {
      return res(ctx.json({user}))
    }),
    rest.get(`${API_URL}/movie/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${API_URL}/tv/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${AUTH_URL}/bookmark`, async (req, res, ctx) => {
      return res(ctx.json({bookmark}))
    }),
    rest.get(`${API_URL}/*`, async (req, res, ctx) => {
      return res(ctx.json(resultsMovies))
    }),
    //bonus-4 bookmark
    rest.post(`${API_URL}/bookmark/:type`, async (req, res, ctx) => {
      const {id} = req.body
      const {type} = req.params
      const newbookmark = {...bookmark}
      newbookmark[type === TYPE_MOVIE ? 'movies' : 'series']?.push(id)
      return res(ctx.json({bookmark: newbookmark}))
    }),
  )
})

//bonus-3
test("rendu de l'app avec Token et NetFlixById", async () => {
  // 🐶 créé une route qui à le meme id que sampleMovie
  // 🤖 const route = `/movie/645886`
  const route = `/movie/645886`

  // mock windows.scrollTo avec jest.fn()
  window.scrollTo = jest.fn()
  // 🐶 change de route avec window.history.pushState
  window.history.pushState({}, 'Page id movie', route)
  // 🐶 met le token dans le localstorage
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  const filmName = sampleMovie.title
  const overview = sampleMovie.overview
  const imageUrl = `${imagePathOriginal}${sampleMovie?.backdrop_path}`
  window.localStorage.setItem(localStorageTokenKey, user.token)

  // 🐶 fait le rendu de app
  render(<App />)

  expect(screen.getByRole('alert')).toBeInTheDocument()
  // attend que le chargement ne soit plus la (screen.getByRole('alert'))
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  // attend que le skeleton ne soit plus la (screen.getByRole('button', {name: "Plus d'infos"}),)
  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: "Plus d'infos"}),
  )
  // 🐶 verifie le nom du film, la description et que le style contienne l'url de l'image
  expect(screen.getByRole('heading', {name: filmName})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: overview})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: 'banner'})).toHaveAttribute(
    'style',
    expect.stringContaining(imageUrl),
  )
})

//bonus-4
test("rendu de l'app et click", async () => {
  // 🐶 Meme chose que précedement pour le rendu
  const route = `/movie/645886`
  window.scrollTo = jest.fn()
  window.history.pushState({}, 'Page id movie', route)
  const user = {
    id: '1',
    username: 'fakeUsername',
    token: 'YWRtaW46bHVveGlueGlhbjkx',
  }
  const filmName = sampleMovie.title
  const overview = sampleMovie.overview
  const imageUrl = `${imagePathOriginal}${sampleMovie?.backdrop_path}`
  window.localStorage.setItem(localStorageTokenKey, user.token)
  render(<App></App>)

  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  // await waitForElementToBeRemoved(() =>
  //   screen.getByRole('button', {name: "Plus d'infos"}),
  // )
  // 🐶 simule un clique sur 'Ajouter à ma liste'
  expect(screen.getByRole('heading', {name: filmName})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: overview})).toBeInTheDocument()
  expect(screen.getByRole('banner', {name: 'banner'})).toHaveAttribute(
    'style',
    expect.stringContaining(imageUrl),
  )
  userEvent.click(screen.getByRole('button', {name: /Ajouter à ma liste/i}))
  // 🐶 attend que le boutton 'Ajouter à ma liste' disparaisse
  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /Ajouter à ma liste/i}),
  )
  // 🐶 verifie la présencde du boutton Supprimer de ma liste
  expect(
    screen.getByRole('button', {name: /Supprimer de ma liste/i}),
  ).toBeInTheDocument()
})
