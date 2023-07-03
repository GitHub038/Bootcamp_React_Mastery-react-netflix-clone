import axios from 'axios'
import {apiKey, lang, API_URL} from '../config'

// utilise 'sleep' pour simuler des api longue
const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const clientApi = async endpoint => {
  const page = 1
  // uniquement pour tester api long sur certain endpoint
  // if (endpoint.includes('10759')) {
  //   await sleep(3000)
  // }
  await sleep(3000)

  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
