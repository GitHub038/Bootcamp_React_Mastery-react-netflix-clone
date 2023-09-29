// 🐶 importe les fonctions et constates que tu vas avoir besoins de tester
//import {clientAuth} from 'utils/clientApi'

// 🐶 importe {server, rest} depuis mocks, il contiennent la config MSW pour mocker les appels HTTPS
//import {server, rest} from 'mocks'
//import {AUTH_URL} from '../../config'
import {server, rest} from 'mocks'
import {AUTH_URL} from '../../config'
import {clientAuth, clientNetFlix} from 'utils/clientApi'

import * as authNetflix from '../../utils/authNetflixProvider'
jest.mock('../../utils/authNetflixProvider')

// 🐶 appelle 'server.listen()' avant tous les tests
// 🐶 appelle 'server.close()' après tous les tests
// 🐶 appelle 'server.resetHandlers()' après chaque test
// 📝 https://jestjs.io/fr/docs/setup-teardown
// beforeEach(() => {
//   server.listen()
// })

// afterEach(() => {
//   server.close()
// })

// afterAll(() => {
//   server.resetHandlers()
// })

// 🐶 pour ce test créé une fonction asynchrone pour executer le test : async () => {}
test('faire une requette HTTP GET vers un endpoint', async () => {
  // 🐶 créé une constante pour pointer vers un fake endpoint 'fake-endpoint'
  // 🐶 crée un fake result
  // 🤖 const resultRequest = {mockResult: 'TEST'}
  // 🐶 mock le endpoint `${AUTH_URL}/${endpoint}` grace à MSW
  // 🤖
  // server.use(
  //   rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
  //     return res(ctx.json(resultRequest))
  //   }),
  // )
  // 🐶 execute l'appel à `clientAuth(endpoint)` et récupère le resultat dans'result' (utilise await)
  // 🐶 vérifie que que 'result.data' (les données retourné du serveur par axios)
  // soit égale à 'resultRequest'

  const fakeEndpoint = 'fake-endpoint'

  const resultRequest = {mockResult: 'TEST'}

  server.use(
    rest.get(`${AUTH_URL}/${fakeEndpoint}`, async (req, res, ctx) => {
      return res(ctx.json(resultRequest))
    }),
  )

  const result = await clientAuth(fakeEndpoint)

  expect(result.data).toEqual(resultRequest)
})

test('Verifier les data passées en parameters', async () => {
  // 🐶 a peu pret identique au précedent à la diference que nous voulons tester des data
  // passées à clientAuth :
  // 🤖 await clientAuth(endpoint, {data})

  // 🐶 créé une constante data
  // 🤖 const data = {fake: 'fakedata'}
  const data = {fake: 'fakedata'}
  // pour rapppel lorsque l'on passe des 'data' a clientAuth, on utilise la méthode POST,
  // tu vas donc devoir mocker via la methode POST
  // 🤖 rest.post(`${AUTH_URL}/${endpoint}`,

  // affecte la requete 'req' de msw à une variable request pour pouvoir faire l'essertion
  // 🤖 let request
  const fakeEndpoint = 'fake-endpoint'
  const resultRequest = {fake: 'fakedata'}

  let request
  server.use(
    rest.post(`${AUTH_URL}/${fakeEndpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )

  // 🐶 fait l'appel a clientAuth
  // 🐶 verifie que 'data' et 'request.body' soit egale
  await clientAuth(fakeEndpoint, {data})
  expect(data).toEqual(request.body)
})

test('Verifier le token  passé en parameters', async () => {
  // 🐶 la meme chose mais pour le Token, on veut tester l'appel
  // 🤖 await clientAuth(endpoint, {token})
  // 🐶 créé une constante token = 'faketoken'
  // 🐶 mock a nouveau sur la methode GET
  // 🤖 rest.get(`${AUTH_URL}/${endpoint}`,
  const fakeEndpoint = 'fake-endpoint'
  const token = 'faketoken'
  const resultRequest = {mockResult: 'TEST'}
  let request
  console.log('tata')
  server.use(
    rest.get(`${AUTH_URL}/${fakeEndpoint}`, async (req, res, ctx) => {
      request = req
      console.log('toto')
      return res(ctx.json(resultRequest))
    }),
  )
  console.log('titi')

  const result = await clientAuth(fakeEndpoint, {token})
  console.log(result)
  // 🐶 verifie que le header 'Authorization' contienne `Bearer ${token}`
  // pour acceder au header utilise : request.headers.get('Authorization')
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
  console.log('tyty')
})

test('Verifier le couple token/data passé en parameters', async () => {
  // 🐶 on veut veirfie token et data
  // la méthode est en POST dans ce cas
  // await clientAuth(endpoint, {token})
  // 🐶 verifie les data et le token

  const data = {fake: 'fakedata'}
  const fakeEndpoint = 'fake-endpoint'
  const token = 'faketoken'
  const resultRequest = {fake: 'fakedata'}

  let request
  server.use(
    rest.post(`${AUTH_URL}/${fakeEndpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )

  // 🐶 fait l'appel a clientAuth
  // 🐶 verifie que 'data' et 'request.body' soit egale
  await clientAuth(fakeEndpoint, {token, data})
  expect(data).toEqual(request.body)
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

// const mockCallback = jest.fn(authNetflix.logout())

test('Verifier le message d erreur sur 401', async () => {
  const fakeEndpoint = 'fake-endpoint'
  const resultRequest = {message: 'Test'}
  const token = 'faketoken'
  const data = {fake: 'fakedata'}

  server.use(
    rest.post(`${AUTH_URL}/${fakeEndpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(resultRequest))
    }),
  )

  const error = await clientNetFlix(fakeEndpoint, {
    token,
    data,
    method: 'POST',
  }).catch(error => error) // on catch car si on le fait pas le test d'arrete sur l'erreur.
  console.log('============')
  console.log(error)
  console.log('============')
  expect(error.message).toMatchInlineSnapshot(`"Authentification incorrecte"`)
  expect(authNetflix.logout).toHaveBeenCalledTimes(1)
})

test('Verifier le message d erreur sur 400', async () => {
  const endpoint = 'fake-endpoint'
  const resultError = {message: 'Fake Error'}

  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(resultError))
    }),
  )

  await expect(clientNetFlix(endpoint)).rejects.toEqual(resultError)
})
