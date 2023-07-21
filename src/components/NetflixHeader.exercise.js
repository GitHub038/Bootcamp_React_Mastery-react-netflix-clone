import React, {useState} from 'react'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
// ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
// import {useFetchData} from '../utils/hooks'
// 🐶 importe {useQuery , queryClient ,useMutation}
import {useQuery, queryClient, useMutation} from 'react-query'
import {clientNetFlix} from '../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import DeleteIcon from '@mui/icons-material/Delete'
import {useQueryClient} from 'react-query'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data, error, status, execute} = useFetchData()

  // 🐶 Utilise le hook 'useQueryClient' qui nous permettra de supprimer
  // les données en cache avec 🤖 `queryClient.invalidateQueries('idquery')`
  // 🤖 const queryClient = useQueryClient()
  const queryClient = useQueryClient()

  // ⛏️ supprime 'callBookmark' car nous ne l'utiliseront plus ici
  // const [callBookmark, setCallBookmark] = React.useState(false)
  // ce boolean permettait d'afficher les notifications uniquement
  // après un clique sur Ajouter/supprimer favoris.
  // Comme maintenant tu vas utiliser 'useMutation' on pourra detecter
  // un succès ou une erreur 'onSuccess' 'onError', nous mettrons à jour un state
  // dédié pour l'erreur de mutation 'mutateBookmarkError'
  // 📑 https://react-query.tanstack.com/guides/migrating-to-react-query-3#mutationmutate-no-longer-return-a-promise

  // 🐶 créé un state 'mutateBookmarkError'
  const [mutateBookmarkError, setMutateBookmarkError] = useState()

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }

  // ⛏️ supprime le hook 'useEffect' qui fait appel à la liste des favoris
  // 'bookmark' car on utilisera 'useQuery'
  // React.useEffect(() => {
  //   async function getTokenExecute() {
  //     const token = await authNetflix.getToken()
  //     execute(clientNetFlix(`bookmark`, {token}))
  //   }
  //   getTokenExecute()
  // }, [execute])

  // 🐶 Fait l'appel HTTP 'bookmark' en utilisant 'useQuery'
  // 📑 https://react-query.tanstack.com/reference/useQueries
  //
  // par destructuration recupère {data}
  // 1. Le premier paramètre de 'useQuery' est un nom unique pour identifier la requette
  //  dans notre cas il s'agira de 'bookmark'
  //
  // 2. Le deuxieme paramètre est une fonction qui recupère les données
  //  dans notre cas on utilisera un fonction asynchrone car on a besoin de recuperer le token
  //
  // 🤖
  // async () => {
  //   const token = await authNetflix.getToken()
  //   return clientNetFlix(`bookmark`, {token})
  // }
  const {data} = useQuery(`bookmark`, async () => {
    const token = await authNetflix.getToken()
    return clientNetFlix(`bookmark`, {token})
  })

  // ⛏️ supprime le hook 'useEffect'
  // React.useEffect(() => {
  //   setSnackbarOpen(true)
  // }, [status])

  // 🐶 utilise le hook 'useMutation' pour ajouter aux favoris
  // 🤖 `const addMutation = useMutation`
  // 📑 https://react-query.tanstack.com/reference/useMutation#_top
  // utilise ce hook pour faire un appel HTTP pour ajouter une bookmark
  // 1. le premier parametre est une fonction permetant de faire l'appel HTTP
  // passe un fontion async avec les caractéristiques suivantes:
  // - un objet en paramètre avec les propriétés {type, id}
  // - appelle `await authNetflix.getToken()` pour récuperer le token
  // - retourne `return clientNetFlix` avec les bon paramètres
  //  a. le endpoint : `bookmark/${type}`
  //  b. un objet contenant
  //  - 'token'
  //  - 'data' contenant l'id
  //  - 'method' : 'POST'
  //
  // 2. Le deuxième paramètre est un objet {onSuccess,onError}
  //  a. onSucces : une fonction qui supprime la memoire cache,
  //    - queryClient.invalidateQueries('bookmark')
  //    - setSnackbarOpen(true)
  //    - setMutateBookmarkError()
  //  b. onError : une fonction avec un parametre (error)
  //    - setSnackbarOpen(true)
  //    - setMutateBookmarkError(error)
  const {addMutation} = useMutation(
    async ({type, id}) => {
      const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id},
        method: 'POST',
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookmark')
        setSnackbarOpen(true)
        setMutateBookmarkError()
      },
      onError: error => {
        setSnackbarOpen(true)
        setMutateBookmarkError(error)
      },
    },
  )

  // 🐶 utilise le hook 'useMutation' pour supprimer aux favoris
  // 🤖 `const deleteMutation = useMutation`
  // 📑 https://react-query.tanstack.com/reference/useMutation#_top
  // utilise ce hook pour faire un appel HTTP pour ajouter une bookmark
  // 1. le premier parametre est une fonction permetant de faire l'appel HTTP
  // passe un fontion async avec les caractéristiques suivantes:
  // - un objet en paramètre avec les propriétés {type, id}
  // - appelle `await authNetflix.getToken()` pour récuperer le token
  // - retourne `return clientNetFlix` avec les bon paramètres
  //  a. le endpoint : `bookmark/${type}`
  //  b. un objet contenant
  //  - 'token'
  //  - 'data' contenant l'id
  //  - 'method' : 'DELETE'
  //
  // 2. Le deuxième paramètre est un objet {onSuccess,onError}
  //  a. onSucces : une fonction qui supprime la memoire cache,
  //    - queryClient.invalidateQueries('bookmark')
  //    - setSnackbarOpen(true)
  //    - setMutateBookmarkError()
  //  b. onError : une fonction avec un parametre (error)
  //    - setSnackbarOpen(true)
  //    - setMutateBookmarkError(error)
  const {deleteMutation} = useMutation(
    async ({type, id}) => {
      const token = await authNetflix.getToken()
      return clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id},
        method: 'DELETE',
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookmark')
        setSnackbarOpen(true)
        setMutateBookmarkError()
      },
      onError: error => {
        setSnackbarOpen(true)
        setMutateBookmarkError(error)
      },
    },
  )

  // 🐶 'handleAddToListClick' va appeler la fonction 'mutate' de 'useMutation'
  // 📑 https://react-query.tanstack.com/guides/migrating-to-react-query-3#mutationmutate-no-longer-return-a-promise
  // const handleAddToListClick = async () => {
  const handleAddToListClick = () => {
    // ⛏️ supprime le contenu de la fonction (elle n'a plus besoin d'etre async)
    // const token = await authNetflix.getToken()
    // setCallBookmark(true)
    // execute(
    //   clientNetFlix(`bookmark/${type}`, {
    //     token,
    //     data: {id: movie.id},
    //     method: 'POST',
    //   }),
    // )
    // 🐶 utilise `addMutation.mutate` pour declancher la mutation
    // passe en paramètre un object avec {type,id}
    addMutation.mutate({type, id: movie.id})
  }

  // 🐶 'handleDeleteToListClick' va appeler la fonction 'mutate' de 'useMutation'
  // 📑 https://react-query.tanstack.com/guides/migrating-to-react-query-3#mutationmutate-no-longer-return-a-promise
  // const handleDeleteToListClick = async () => {
  const handleDeleteToListClick = () => {
    // ⛏️ supprime le contenu de la fonction (elle n'a plus besoin d'etre async)
    // const token = await authNetflix.getToken()
    // execute(
    //   clientNetFlix(`bookmark/${type}`, {
    //     token,
    //     data: {id: movie.id},
    //     method: 'DELETE',
    //   }),
    // )
    // setCallBookmark(true)
    // 🐶 utilise `deleteMutation.mutate` pour declancher la mutation
    // passe en paramètre un object avec {type,id}
    deleteMutation.mutate({type, id: movie.id})
  }
  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(movie?.id)

  if (!movie) {
    return <HeaderSkeleton></HeaderSkeleton>
  }
  return (
    <header style={banner}>
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__buttonplay">Lecture</button>
          {isInList ? (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleDeleteToListClick}
            >
              <DeleteIcon
                color="secondary"
                style={{marginRight: '5px'}}
                fontSize={'small'}
              />
              Supprimer de ma liste
            </button>
          ) : (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleAddToListClick}
            >
              Ajouter à ma liste
            </button>
          )}
        </div>
        <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
      {/* 🐶 n'utilise plus 'callBookmark' et 'status' mais 'mutateBookmarkError'   */}
      {/* {callBookmark && status === 'done' ? ( */}
      {!mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success" sx={{width: '100%'}}>
            Liste modifiée avec succès
          </Alert>
        </Snackbar>
      ) : null}
      {mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="error" sx={{width: '100%'}}>
            Problème lors de l'ajout : {mutateBookmarkError.error}
          </Alert>
        </Snackbar>
      ) : null}
    </header>
  )
}

export {NetflixHeader}
