// 🐶 rien à faire pour l'exercice, mais sera utile pour l'exercice bonus 2 et 7

// 🐶 importe les 3 lignes suivantes elles seonrt utiles
// import {useQuery, useMutation, useQueryClient} from 'react-query'
// import {clientApi, clientNetFlix} from './clientApi'
// import * as authNetflix from './authNetflixProvider'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {clientApi, clientNetFlix} from './clientApi'
import * as authNetflix from './authNetflixProvider'

const useMovie = (type, id) => {
  // 🐶 utilise 'useQuery' pour faire appel à `${type}/${id}`
  // retourne 'data'
  const {data} = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`))
  return data
}

const useMovieFilter = (type, filter, param) => {
  // 🐶 réutilise le code de NetflixRow
  // const endpointLatest = `${type}/upcoming`
  // const endpointPopular = `${type}/popular`
  // const endpointTopRated = `${type}/top_rated`
  // const endpointGenre = `discover/${type}?with_genres=${param}`
  // const endpointTrending = `trending/${type}/day`
  // let endpoint
  // switch (filter) {
  //   case 'populaire':
  //     endpoint = endpointPopular
  //     break
  //   case 'latest':
  //     endpoint = endpointLatest
  //     break
  //   case 'toprated':
  //     endpoint = endpointTopRated
  //     break
  //   case 'genre':
  //     endpoint = endpointGenre
  //     break
  //   case 'trending':
  //     endpoint = endpointTrending
  //     break
  //   default:
  //     throw new Error('Type non supporté')
  // }
  // const {data, error, status} = useQuery(`${endpoint}`, () =>
  //   clientApi(`${endpoint}`),
  // )
  //retourne data?.data?.results
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
  // 🐶 utilise 'useQuery' pour faire appel à `bookmark`
  // utilise const token = await authNetflix.getToken()
  // pour avoir le token
  // retourne 'data'
  const {data} = useQuery(`bookmark`, async () => {
    const token = await authNetflix.getToken()
    return clientNetFlix(`bookmark`, {token})
  })

  return data
}

const useAddBookmark = (
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
) => {
  // 🐶 créé 'queryClient'
  const queryClient = useQueryClient()
  // 🐶 utilise 'useMutation' ajouter un bookmark
  // utilise le de la meme maniere que dans 'NetFlixHeader'
  // supprime les dependances aux states de 'NetFlixHeader'
  // à la place appelle les fonction passer en parametres
  // {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('bookmark')
  //     onSuccess()
  //   },
  //   onError: error => {
  //     onError()
  //   },
  //   onSettled: data => {
  //     onSettled()
  //   },
  //   onMutate:data => {
  //     onMutate()
  //   }
  // 🐶 tip : initialise les paramètres par des fonction vide par defaut comme
  // {onSuccess=()=>{}, onError=()=>{}, onSettled=()=>{} , onMutate=()=>{}}
  const addMutation = useMutation(
    async ({type, id}) => {
      const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        token,
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
      onMuted: data => {
        onMutate(data)
      },
    },
  )
  return addMutation
}

const useDeleteBookmark = (
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
) => {
  // const queryClient = useQueryClient()
  const queryClient = useQueryClient()
  // 🐶 utilise 'useMutation' supprimer un bookmark
  // utilise le de la meme maniere que dans 'NetFlixHeader'
  // supprime les dependances aux states de 'NetFlixHeader'
  // à la place appelle les fonction passer en parametres
  // {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('bookmark')
  //     onSuccess()
  //   },
  //   onError: error => {
  //     onError()
  //   },
  //   onSettled: data => {
  //     onSettled()
  //   },
  //   onMutate:data => {
  //     onMutate()
  //   }
  // 🐶 tip : initialise les paramètres par des fonction vide par defaut comme
  // {onSuccess=()=>{}, onError=()=>{}, onSettled=()=>{} , onMutate=()=>{}}
  const deleteMutation = useMutation(
    async ({type, id}) => {
      const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        token,
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
      onMuted: data => {
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
}
