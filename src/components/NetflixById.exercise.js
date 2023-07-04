import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
// 🐶 supprime 'getRandomType' et 'getRandomId' car nous n'utiliseront plus de films aléatoires
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import {makeStyles} from '@mui/styles'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {useFetchData} from '../utils/hooks'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'
import {useLocation, useParams} from 'react-router-dom'

// 🐶 importe les hooks 'useParams' et 'useLocation' de "react-router-dom"

const useStyles = makeStyles(theme => ({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
}))

const NetflixById = () => {
  const classes = useStyles()
  const {data: headerMovie, error, status, execute} = useFetchData()
  // 🐶 utilise le hook 'useParams' pour récuperer les valeurs de 'tvId' et 'movieId'
  const {tvId, movieId} = useParams()
  // 🐶 utilise le hook 'useLocation' pour récuperer la valeur de 'pathname'
  // cela nous permetra de savoir si l'url est /tv/:tvId ou /movie/:movieId
  // donc de pouvoir determiner le 'type' (TYPE_TV ou TYPE_MOVIE)
  const location = useLocation()

  // ⛏️ supprime 'getRandomType()' et met la valeur de type determinée plus haut.
  // const [type] = React.useState(getRandomType())
  const [type, setType] = React.useState(
    location.pathname.includes('tv') ? TYPE_TV : TYPE_MOVIE,
  )
  // const type = location.pathname.includes('tv')
  //   ? TYPE_TV
  //   : TYPE_MOVIE

  // 🐶 determine l'id en fonction du type (soit 'tvId' soit 'movieId' )
  const [id, setId] = React.useState(type === TYPE_MOVIE ? movieId : tvId)
  //  const id = type === TYPE_MOVIE ? movieId : tvId

  React.useEffect(() => {
    execute(clientApi(`${type}/${id}`))
  }, [execute, id, type])

  // 🐶 Utilise à nouveau 'useEffect' pour mettre à jour les 3 states suivants:
  // - 'type'
  // - 'id'
  // - 'queried'
  // ce qui va ensuite déclancher un nouvelle appel API
  //
  // n'oublie pas les dépendances
  React.useEffect(() => {
    const type = location.pathname.includes('tv') ? TYPE_TV : TYPE_MOVIE
    setType(type)
    setId(type === TYPE_MOVIE ? movieId : tvId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location.pathname, movieId, tvId])

  React.useEffect(() => {})
  if (status === 'error') {
    // sera catché par ErrorBoundary
    throw new Error(error.message)
  }
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie?.data} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Série Netflix"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & aventure"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="53"
        title="Les meilleurs Thriller"
        watermark={false}
        wideImage={false}
      />

      {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity="error">
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Detail : {error.message}
          </Alert>
        </div>
      ) : null}

      {status === 'fetching' ? (
        <div className={classes.progress}>
          <CircularProgress />{' '}
        </div>
      ) : null}
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixById}
