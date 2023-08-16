import {useQuery, useMutation, useQueryClient} from 'react-query'
// ⛏️ supprimer 'clientNetFlix' car nous utiliseront le hook 'useClientNetflix'
import {clientApi} from './clientApi'
import * as authNetflix from './authNetflixProvider'
import {useClientNetflix} from 'context/AuthContext'
// 🐶 importe le Hook 'useClientNetflix' car nous l'utiliseront à la place
// de 'clientNetFlix'
// il permettra de ne plus avoir à se préocuper du Token

const useSearchMovie = query => {
  const {data} = useQuery(`search/multi?query=${query}`, () =>
    clientApi(`search/multi?query=${query}`),
  )
  return data?.data.results ?? []
}

const useMovie = (type, id) => {
  const {data} = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`))
  return data?.data
}

const useMovieFilter = (type, filter, param) => {
  const endpointLatest = `${type}/upcoming`
  const endpointPopular = `${type}/popular`
  const endpointTopRated = `${type}/top_rated`
  const endpointGenre = `discover/${type}?with_genres=${param}`
  const endpointTrending = `trending/${type}/day`

  let endpoint
  switch (filter) {
    case 'populaire':
      endpoint = endpointPopular
      break
    case 'latest':
      endpoint = endpointLatest
      break
    case 'toprated':
      endpoint = endpointTopRated
      break
    case 'genre':
      endpoint = endpointGenre
      break
    case 'trending':
      endpoint = endpointTrending
      break
    default:
      throw new Error('Type non supporté')
  }

  const {data} = useQuery(`${endpoint}`, () => clientApi(`${endpoint}`))
  return data?.data?.results ?? []
}

const useBookmark = () => {
  // 🐶 utilise  'useClientNetflix' pour récupérer 'clientNetFlix'
  // Change le deuxième paramètre de 'useQuery'.
  // Au lieu de lui passer une fonction fléché asynchrone qui récupère le token.
  // passe lui une fonction fleché normale et fait directement appel à 🤖 `clientNetFlix(`bookmark`)`
  // const {data} = useQuery(`bookmark`, async () => {
  //   const token = await authNetflix.getToken()
  //   return clientNetFlix(`bookmark`, {token})
  // })
  const clientNetFlix = useClientNetflix()
  const {data} = useQuery(`bookmark`, () => clientNetFlix(`bookmark`))
  return data
}

const useAddBookmark = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
}) => {
  const queryClient = useQueryClient()
  // 🐶 utilise  'useClientNetflix' pour récupérer 'clientNetFlix'
  const clientNetFlix = useClientNetflix()
  const addMutation = useMutation(
    // ⛏️ supprime 'async' car la fonction n'a plus besoin d'etre asynchrone
    // car nous n'avons plus besoin de faire appel à `await authNetflix.getToken()`
    /*async*/ ({type, id}) => {
      // const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        // ⛏️ supprime 'token' car il est maintenant gérer automatiquement par 'useClientNetflix'
        // token,
        data: {id},
        method: 'POST',
      })
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries('bookmark')
        onSuccess(data)
      },
      onError: error => {
        onError(error)
      },
      onSettled: data => {
        onSettled(data)
      },
      onMutate: data => {
        onMutate(data)
      },
    },
  )
  return addMutation
}

const useDeleteBookmark = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
}) => {
  // 🐶 utilise  'useClientNetflix' pour récupérer 'clientNetFlix'
  const queryClient = useQueryClient()
  const clientNetFlix = useClientNetflix()
  const deleteMutation = useMutation(
    // ⛏️ supprime 'async' car la fonction n'a plus besoin d'etre asynchrone
    // car nous n'avons plus besoin de faire appel à `await authNetflix.getToken()`
    /*async*/ ({type, id}) => {
      // const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        // ⛏️ supprime 'token' car il est maintenant gérer automatiquement par 'useClientNetflix'
        // token,
        data: {id},
        method: 'DELETE',
      })
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries('bookmark')
        onSuccess(data)
      },
      onError: error => {
        onError(error)
      },
      onSettled: data => {
        onSettled(data)
      },
      onMutate: data => {
        onMutate(data)
      },
    },
  )
  return deleteMutation
}

export {
  useMovie,
  useMovieFilter,
  useBookmark,
  useAddBookmark,
  useDeleteBookmark,
  useSearchMovie,
}
