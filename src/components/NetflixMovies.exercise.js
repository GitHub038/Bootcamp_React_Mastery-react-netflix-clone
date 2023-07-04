import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
// 🐶 supprime getRandomType nous n'utilisons plus de types aléatoire
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import {makeStyles} from '@mui/styles'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {useFetchData} from '../utils/hooks'
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

const NetflixMovies = () => {
  const classes = useStyles()
  const {data: headerMovie, error, status, execute} = useFetchData()
  // 🐶 fixe le bon type
  const [type] = React.useState(getRandomType())
  const defaultMovieId = getRandomId(type)

  React.useEffect(() => {
    execute(clientApi(`${type}/${defaultMovieId}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, type])

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
      {/* 
        🐶 utilise les bons 'props' pour respacter les spécifications de   
        👨‍✈️ Hugo le chef de projet : "Les mieux notés"
      */}
      <NetflixRow
        wideImage={false}
        watermark={false}
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
      />
      {/* 
        🐶 Utilise les bons 'props' pour respacter les spécifications de   
        👨‍✈️ Hugo le chef de projet : "Les films pouplaires"
      */}
      <NetflixRow
        type={TYPE_MOVIE}
        filter="populaire"
        title="Les films populaires"
        watermark={false}
        wideImage={true}
      />
      {/* 
        🐶 Utilise les bons 'props' pour respacter les spécifications de   
        👨‍✈️ Hugo le chef de projet : "Films Fantastiques"
      */}
      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="14"
        title="Les films fantastiques"
        watermark={false}
        wideImage={true}
      />
      {/* 
        🐶 Utilise les bons 'props' pour respacter les spécifications de   
        👨‍✈️ Hugo le chef de projet : "Les films de science fiction"
      */}
      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="878"
        title="Les films de sciences fictions"
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
export {NetflixMovies}
