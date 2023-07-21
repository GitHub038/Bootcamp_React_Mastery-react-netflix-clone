import * as React from 'react'
import {TYPE_MOVIE, imagePath400} from '../config'
// ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
// import {useFetchData} from '../utils/hooks'
// 🐶 importe {useQuery}
import {useQuery} from 'react-query'
import {clientApi} from '../utils/clientApi'
import {Alert, AlertTitle} from '@mui/material'
import {RowSkeleton} from './skeletons/RowSkeleton'
import {Link} from 'react-router-dom'

const NetflixRow = ({
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = 'populaire',
  watermark = false,
}) => {
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data, error, status, execute} = useFetchData()
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

  // ⛏️ supprime le hook 'useEffect' car on utilisera 'useQuery'
  // React.useEffect(() => {
  //   execute(clientApi(`${endpoint}`))
  // }, [endpoint, execute])

  // 🐶 Fait l'appel HTTP en utilisant 'useQuery'
  // 📑 https://react-query.tanstack.com/reference/useQueries

  // par destructuration recupère {data, error, status}
  // 1. Le premier paramètre de 'useQuery' est un nom unique pour indentifier la requette
  //  utilise 'endpoint'
  //
  // 2. Le deuxieme paramètre est une fonction qui recupère les données
  //  dans notre cas on utilisera `clientApi(`${endpoint}`)`
  const {data, error, status} = useQuery(`${endpoint}`, () =>
    clientApi(`${endpoint}`),
  )

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  const watermarkClass = watermark ? 'watermarked' : ''

  // 🐶 change le status 'fetching' car 'useQuery' utilise 'loading' pour indiquer
  // un fetch en cours.
  if (status === 'loading' || status === 'idle') {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }
  if (status === 'error') {
    return (
      <Alert severity="error">
        <AlertTitle>Une erreur est survenue</AlertTitle>
        Detail : {error.message}
      </Alert>
    )
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data.data.results.map(movie => {
          return (
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <div className={`row__poster row__posterLarge ${watermarkClass}`}>
                <img src={buildImagePath(movie)} alt={movie.name} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export {NetflixRow}
