import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
// 🐶 importe les composants MUI
// import {Alert, AlertTitle} from '@mui/material'
// import CircularProgress from '@mui/material/CircularProgress';
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
// 🐶 importe le Hook 'makeStyles' pour te creer un Hook 'useStyles'
import {makeStyles} from '@mui/styles'
import './Netflix.css'
import {useFetchData} from 'utils/hooks'

// 🐶 créé un hook 'useStyles' avec 'makeStyles'
// 📑 https://material-ui.com/styles/basics/#hook-api
// Ce hook aura deux classes :
// 1. alert
//  width: '50%',
//  margin : 'auto',
//  marginBotton:'50px'
//
// 2. progress
//  marginLeft : '30px',
const useStyles = makeStyles(theme => ({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBottom: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
}))

const NetflixApp = () => {
  // 🐶 utilise le hook classes ='useStyles', il sera utilié plus bas
  const myStyle = useStyles()
  // const [headerMovie, setHeaderMovie] = React.useState()
  const [type] = React.useState(getRandomType())
  const defaultMovieId = getRandomId(type)

  // 🐶 créé un state 'status', avec la valeur par defaut 'idle'
  // const [status, setStatus] = React.useState('idle')

  const {data: headerMovie, error, status, execute} = useFetchData()

  React.useEffect(() => {
    // 🐶 changer le status en 'fetching'
    // setStatus('fetching')

    // clientApi(`${type}/${defaultMovieId}`)
    //   .then(response => {
    //     setHeaderMovie(response)
    //     // 🐶 changer le status en 'done'
    //     setStatus('done')
    //   })
    //   // 🐶 changer le status en 'error' dans le catch
    //   .catch(error => {
    //     console.error(error)
    //     setStatus('error')
    //   })
    execute(clientApi(`${type}/${defaultMovieId}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie?.data} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      {/* 🐶 créé une <div> avec le prop 'className' et passer le style 'alert'  
        - Ajouter ensuite <Alert severity="error"> avec un message d'erreur
        - conditionnner l'affichage de cette <div> au status === 'error'
      */}

      {status === 'error' && (
        <div className={myStyle.alert}>
          <Alert severity="error">
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Détail : {error.message}
          </Alert>
        </div>
      )}
      {/* 🐶 créé une <div> avec le prop 'className' et passer le style 'progress'  
        - Ajouter ensuite <CircularProgress />
        - conditionnner l'affichage de cette <div> au status === 'fetching'
        - note : modifier la fonction 'clientAPI' avec sleep(2000) pour simuler un long appel
      */}
      {status === 'fetching' && (
        <div className={myStyle.progress}>
          <CircularProgress></CircularProgress>
        </div>
      )}

      <NetFlixFooter />
    </div>
  )
}
export {NetflixApp}
