// 🐶 importe les fonctions et constates que tu vas avoir besoins de tester
// import {
//   getRandomIntInclusive,
// } from '../helper'
import {TYPE_MOVIE} from 'config'
import {
  getRandomIntInclusive,
  getRandomType,
  getRandomMovie,
  getRandomSerie,
  getRandomId,
} from '../helper'
import {TYPE_TV} from 'config'

// 🐶 test la fonction 'getRandomIntInclusive', tu peux utiliser 'toBeGreaterThanOrEqual' et 'toBeLessThanOrEqual'
// test.todo('Retourne une nombre entier alétoire')
test('Retourne une nombre entier alétoire', () => {
  const min = 0
  const max = 10
  expect(getRandomIntInclusive(min, max)).toBeGreaterThanOrEqual(min)
  expect(getRandomIntInclusive(min, max)).toBeLessThanOrEqual(max)
})

// 🐶 test la fonction 'getRandomType' : tu peux utiliser 'toContain'
test('Retourne un type aléatoire', () => {
  const tv_type = [TYPE_MOVIE, TYPE_TV]
  expect(tv_type).toContain(getRandomType())
})

// 🐶 test la fonction 'getRandomMovie' : tu peux utiliser 'toContain'
test('Retourne un film aléatoire', () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  expect(moviesIds).toContain(getRandomMovie())
})

// 🐶 test la fonction 'getRandomSerie' : tu peux utiliser 'toContain'
test('Retourne une série aléatoire', () => {
  const tvIds = [71446, 60574, 1399, 66732]
  expect(tvIds).toContain(getRandomSerie())
})

// 🐶 test la fonction 'getRandomId' : tu peux utiliser 'toContain'
test('Retourne une série ou un film aléatoire', () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  const tvIds = [71446, 60574, 1399, 66732]
  expect(tvIds).toContain(getRandomId(TYPE_TV))
  expect(moviesIds).toContain(getRandomId(TYPE_MOVIE))
})
