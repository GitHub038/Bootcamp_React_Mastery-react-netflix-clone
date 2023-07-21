import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import {makeStyles} from '@mui/styles'
// import {Alert, AlertTitle} from '@mui/material'
// import CircularProgress from '@mui/material/CircularProgress'
// ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
// import {useFetchData} from '../utils/hooks'
// 🐶 importe {useQuery}
import {useQuery} from 'react-query'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'

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

const NetflixNews = ({logout}) => {
  const classes = useStyles()
  // ⛏️ supprime 'useFetchData' car nous ne l'utiliseront plus ici
  // const {data: headerMovie, error, status, execute} = useFetchData()
  const [type] = React.useState(getRandomType())
  const [defaultMovieId] = React.useState(getRandomId(type))

  // ⛏️ supprime le hook 'useEffect' car on utilisera 'useQuery'
  // React.useEffect(() => {
  //   execute(clientApi(`${type}/${defaultMovieId}`))
  // }, [execute, defaultMovieId, type])

  // 🐶 Fait l'appel HTTP en utilisant 'useQuery'
  // 📑 https://react-query.tanstack.com/reference/useQueries

  // par destructuration recupère {data: headerMovie, error, status}
  // 1. Le premier paramètre de 'useQuery' est un nom unique pour indentifier la requette
  //  utilise la contactenation 'type' et 'defaultMovieId'
  //
  // 2. Le deuxieme paramètre est une fonction qui recupère les données
  //  dans notre cas on utilisera `clientApi(`${type}/${defaultMovieId}`)`
  const {data: headerMovie} = useQuery(
    `${type}/${defaultMovieId}`,
    clientApi(`${type}/${defaultMovieId}`),
  )

  // ⛏️ supprime cette condition et le `throw new Error`
  // cela sera géré automatiquement par la configuration 'react-query'
  // dans les exercice bonus
  // if (status === 'error') {
  //   // sera catché par ErrorBoundary
  //   throw new Error(error.message)
  // }
  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie?.data} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="latest"
        title="A venir"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_MOVIE}
        filter="latest"
        title="Nouveauté"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="latest"
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
      {/* ⛏️ supprime l'alerte sur le status === 'error' ça ce sera gerer par react-query */}
      {/* {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity="error">
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Detail : {error.message}
          </Alert>
        </div>
      ) : null} */}
      {/* ⛏️ supprime CircularProgress car s'est déja gérer par les <Skeleton> */}
      {/* {status === 'fetching' ? (
        <div className={classes.progress}>
          <CircularProgress />{' '}
        </div>
      ) : null} */}
      <NetFlixFooter color="secondary" si />
      {/* 🐶 Nettoie tout les importes, classes, styles et hooks non utilisés  */}
    </div>
  )
}
export {NetflixNews}
