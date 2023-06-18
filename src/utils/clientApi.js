import axios from 'axios'
import {apiKey, lang, API_URL} from '../config'

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const clientApi = async endpoint => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  await sleep(2000)
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  console.log(`${API_URL}/${endpoint}${keyLang}`)
  return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
