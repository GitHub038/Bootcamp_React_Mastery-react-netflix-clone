import * as React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixHeader} from './NetflixHeader'
// ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
// import {useFetchData} from '../utils/hooks'
// 🐶 importe {useQuery}
import {useQuery} from 'react-query'
import {clientNetFlix, clientApi} from '../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import {Link} from 'react-router-dom'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'

const NetflixBookmark = ({logout}) => {
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data, execute} = useFetchData()
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data: headerMovie, execute: executeHeader} = useFetchData()

  // ⛏️ supprime le hook 'useEffect' car on utilisera 'useQuery
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
  const {data} = useQuery('bookmark', async () => {
    const token = await authNetflix.getToken()
    return clientNetFlix(`bookmark`, {token})
  })

  // 🐶 créé une constante 'id' qui sera soit le premier film en favoris ou 749274
  const id = data?.bookmark?.movies?.[0] ?? 749274
  // ⛏️ supprime le hook 'useEffect' car on utilisera 'useQuery
  // React.useEffect(() => {
  //   const id = data?.bookmark?.movies?.[0] ?? 749274
  //   executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
  // }, [data, executeHeader])

  // 🐶 Fait l'appel HTTP `${TYPE_MOVIE}/${id}` en utilisant 'useQuery'
  // 📑 https://react-query.tanstack.com/reference/useQueries
  //
  // par destructuration recupère {data: headerMovie}
  // 1. Le premier paramètre de 'useQuery' est un nom unique pour identifier la requette
  //  dans notre cas il s'agira de `${TYPE_MOVIE}/${id}
  //
  // 2. Le deuxieme paramètre est une fonction qui recupère les données
  // 🤖
  //clientApi(`${TYPE_MOVIE}/${id}`)
  const {data: headerMovie} = useQuery(
    `${TYPE_MOVIE}/${id}`,
    clientApi(`${TYPE_MOVIE}/${id}`),
  )

  return (
    <>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie?.data} type={TYPE_MOVIE} />
      <div className="row">
        <h2>Films favoris</h2>
        <div className="row__posters">
          {data?.bookmark.movies.map(id => {
            return (
              <Card
                key={id}
                id={id}
                type={TYPE_MOVIE}
                watermark={true}
                wideImage={true}
              />
            )
          })}
        </div>
      </div>

      <div className="row">
        <h2>Séries favorites</h2>
        <div className="row__posters">
          {data?.bookmark.series.map(id => {
            return <Card key={id} id={id} type={TYPE_TV} />
          })}
        </div>
      </div>
    </>
  )
}

const Card = ({id, type, watermark, wideImage}) => {
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data, execute} = useFetchData()

  // ⛏️ supprime le hook 'useEffect' car on utilisera 'useQuery
  // React.useEffect(() => {
  //   execute(clientApi(`${type}/${id}`))
  // }, [execute, id, type])

  // 🐶 Fait l'appel HTTP `${type}/${id}` en utilisant 'useQuery'
  // 📑 https://react-query.tanstack.com/reference/useQueries
  //
  // par destructuration recupère {data}
  // 1. Le premier paramètre de 'useQuery' est un nom unique pour identifier la requette
  //  dans notre cas il s'agira de `${type}/${id}`
  //
  // 2. Le deuxieme paramètre est une fonction qui recupère les données
  // 🤖
  //clientApi(`${type}/${id}`))
  const {data} = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`))

  const [image, setImage] = React.useState('')

  React.useEffect(() => {
    const buildImagePath = data => {
      const image = wideImage ? data?.backdrop_path : data?.poster_path
      return image ? `${imagePath400}${image}` : null
    }
    setImage(buildImagePath(data?.data))
  }, [data, wideImage])

  const watermarkClass = watermark ? 'watermarked' : ''
  return (
    <Link key={id} to={`/${type}/${id}`}>
      <div className={`row__poster row__posterLarge ${watermarkClass}`}>
        <img src={image} alt={data?.name} />
      </div>
    </Link>
  )
}
export {NetflixBookmark}
