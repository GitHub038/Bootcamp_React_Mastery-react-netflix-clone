import React, {useState} from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'
import {Link} from 'react-router-dom'
import {RowSkeleton} from './skeletons/RowSkeleton'
// 🐶 import 'useParams' de 'react-router-dom'
import {useParams} from 'react-router-dom'

// 🐶 import 'useSearchMovie' et  'useMovie'
//import {useSearchMovie, useMovie} from '../utils/hooksMovies'
import {useSearchMovie, useMovie} from '../utils/hooksMovies'

import './Netflix.css'

const NetflixSearch = ({logout}) => {
  // 🐶 utilise le hook 'useParams' pour récuperer {query}
  let {query} = useParams()

  // 🐶 utilise le hook 'useSearchMovie' pour récuperer 'data' : les réultats de recherche
  // const data = []
  const data = useSearchMovie(query)
  // 🐶 utilise le hook 'useMovie(TYPE_MOVIE, 785752)' pour récuperer un film par defaut (defaultMovie)
  // si aucun résultat n'est trouvé, cela permettra d'avoir un film dans le header
  const defaultMovie = useMovie(TYPE_MOVIE, 785752)
  // 🐶 créé une constante 'headerMovie' qui sera le film passé dans le <NetflixHeader>
  // prendre le premier element de 'data' si disponible
  // sinon prendre 'defaultMovie'
  const headerMovie = data?.[0] ?? defaultMovie
  // 🐶 créé une constante type  `headerMovie?.media_type`
  // qui sera passé en props de <NetflixHeader>
  const type = 'headerMovie?.media_type'
  // 🐶 filtre les series et les films grace au champ 'media_type'
  // des résultats retournés dans 'data'
  // media_type === TYPE_MOVIE
  // media_type === TYPE_TV
  const movies = data?.filter(currData => currData.media_type === TYPE_MOVIE)
  const series = data?.filter(currData => currData.media_type === TYPE_TV)

  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie} type={type} />
      {data?.length === 0 ? (
        <div className="row">
          <h2>Pas de résultat</h2>
        </div>
      ) : (
        <>
          <NetflixRowView
            data={movies}
            wideImage={true}
            watermark={true}
            type={TYPE_MOVIE}
            filter="trending"
            title="Films correspondants"
          />
          <NetflixRowView
            data={series}
            wideImage={false}
            watermark={true}
            type={TYPE_TV}
            filter="trending"
            title="Série correspondantes"
          />
        </>
      )}

      <NetFlixFooter color="secondary" si />
    </div>
  )
}
// 🐶'NetflixRowView' est le meme composant que 'NetflixRow' sauf qu'on
// peut lui passer un 'array'(data) de films/series
const NetflixRowView = ({
  data = [],
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }
  const watermarkClass = watermark ? 'watermarked' : ''

  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data.map(movie => {
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

export {NetflixSearch}
