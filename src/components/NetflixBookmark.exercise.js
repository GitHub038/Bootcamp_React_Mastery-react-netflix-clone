import * as React from 'react'
// 🐶 importe les ressouces suivantes :
// import {NetflixAppBar} from './NetflixAppBar'
// import {NetflixHeader} from './NetflixHeader'
// import {useFetchData} from '../utils/hooks'
// import {clientNetFlix, clientApi} from '../utils/clientApi'
// import * as authNetflix from '../utils/authNetflixProvider'
// import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixHeader} from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientNetFlix, clientApi} from '../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'
import {Link} from 'react-router-dom'

// 🐶 'NetflixBookmark' devra faire deux appels API
// 1. Le premier vers `bookmark` pour recuperer les favorie
// 2. Un appel vers API TMDB pour afficher le header
const NetflixBookmark = ({logout}) => {
  // 🐶 utilise le hook 'useFetchData' et ''useEffect'' pour appeler `bookmark`
  // 🤖 const {data, execute}
  const {data, execute} = useFetchData()

  // 🐶 utilise a nouveau le hook 'useFetchData' et ''useEffect'' pour appeler `TMDV`
  // pour eviter la collision de nom nous créons des alias pour 'data' et 'execute'
  // 🤖 const {data: headerMovie, execute: executeHeader}
  const {data: headerMovie, execute: executeHeader} = useFetchData()

  // 🐶 appelle 'bookmark' en utilisant
  React.useEffect(() => {
    // - execute et clientNetFlix
    // - await authNetflix.getToken()
    async function getTokenExecute() {
      const token = await authNetflix.getToken()
      execute(clientNetFlix(`bookmark`, {token}))
    }
    getTokenExecute()
  }, [execute])

  // 🐶 appelle 'api TMDB' APRES le premier appelle à 'bookmark' grace à la dependance 'data'
  // et utilise :
  React.useEffect(() => {
    // - executeHeader et clientApi
    // 🐶 utilise le premier films de la liste pour l'appel API TMBD sinon la le film 749274
    // 🤖 const id = data?.movies?.[0] ?? 749274
    const id = data?.bookmark.movies?.[0] ?? 749274
    executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
  }, [data, executeHeader])

  return (
    <>
      {/* 🐶 utilise <NetflixAppBar /> */}
      <NetflixAppBar logout={logout} />
      {/* 🐶 utilise <NetflixHeader type={TYPE_MOVIE} /> */}
      <NetflixHeader type={TYPE_MOVIE} movie={headerMovie?.data} />
      {/* passe 'headerMovie.data' en prop 'movie' et 'type' 'movie' de <NetflixHeader> */}
      <div className="row">
        <h2>Films favoris</h2>
        <div className="row__posters">
          {/* 🐶 boucle sur 'data?.bookmark.movies' grace a `.map` et
        retourne le composant <Card> avec les props 'id' 'type' 'watermark' 'wideImage'*/}
          {data?.bookmark?.movies.map(id => (
            <Card
              key={id}
              id={id}
              type={TYPE_MOVIE}
              watermark={true}
              wideImage={true}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <h2>Séries favorites</h2>
        <div className="row__posters">
          {/* 🐶 boucle sur 'data?.bookmark.series' grace à `.map` et
        retourne le composant <Card> avec les props 'id' 'type' 'watermark' 'wideImage'*/}
          {data?.bookmark?.series.map(id => (
            <Card key={id} id={id} type={TYPE_TV} />
          ))}
        </div>
      </div>
    </>
  )
}
// 🐶 Le composant 'Card' à le même rendu que 'NetflixRow'
// La difference est qu'au lieu de passer le 'movie' en prop, on passera l'id en props
// Ensuite avec ce 'id' il faudra appeler l'api TMBD et afficher les donneés.
const Card = ({id, type, watermark, wideImage}) => {
  // 🐶 Créé un state 'image' qui sera mis à jour image' après l'appel d'API
  const [image, setImage] = React.useState('')
  // 🐶 Fais l'appel API `${type}/${id}`

  const {data, execute} = useFetchData()

  React.useEffect(() => {
    execute(clientApi(`${type}/${id}`))
  }, [execute, type, id])

  // 🐶 utilise useEffect avec la dependance sur 'data' pour mettre à jour l'image
  // rappel de la fonction 'buildImagePath'
  // 🤖
  // const buildImagePath = data => {
  //   const image = wideImage ? data?.backdrop_path : data?.poster_path
  //   return image ? `${imagePath400}${image}` : null
  // }
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
        {/* 🐶 renseigne correctement src et alt */}
        <img src={image} alt={data?.name} />
      </div>
    </Link>
  )
}
export {NetflixBookmark}
