import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
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

const NetflixSeries = () => {
  const classes = useStyles()
  const {data: headerMovie, error, status, execute} = useFetchData()
  // const [type] = React.useState(getRandomType())
  const defaultMovieId = getRandomId(TYPE_TV)

  React.useEffect(() => {
    execute(clientApi(`${TYPE_TV}/${defaultMovieId}`))
  }, [execute, defaultMovieId])

  if (status === 'error') {
    // sera catché par ErrorBoundary
    throw new Error(error.message)
  }
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie?.data} type={TYPE_TV} />
      {/* 
        🐶 utilise les bons 'props' pour respacter les spécifications de   
        👨‍✈️ Hugo le chef de projet : "Séries tendances Netflix "
        continue jusqu'a la fin
      */}
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Séries tendances Netflix"
      />

      <NetflixRow
        type={TYPE_TV}
        filter="toprated"
        title="Séries les mieux notés"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        wideImage={false}
        watermark={false}
        type={TYPE_TV}
        filter="populaire"
        title="Les série populiares"
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="99"
        title="Documentaires"
        watermark={false}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="80"
        title="Les séries criminelles"
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
export {NetflixSeries}
