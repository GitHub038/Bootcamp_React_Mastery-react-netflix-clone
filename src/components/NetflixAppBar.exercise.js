import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// 🐶 importe 'Link' de 'react-router-dom'
import {Link} from 'react-router-dom'

const NetflixAppBar = () => {
  const [appBarStyle, setAppBarStyle] = React.useState({
    background: 'transparent',
    boxShadow: 'none',
  })
  React.useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: '#111',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      } else {
        setAppBarStyle({
          background: 'transparent',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const margin10 = {margin: 10}
  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        {/* 🐶 remplace tous les <a> par des link */}
        <img className="nav__logo" src="/images/netflix-logo.png" alt="" />
        <Link to="/">
          <Typography style={margin10} variant="h6">
            Acceuil
          </Typography>
        </Link>
        <Link to="/series">
          <Typography style={margin10} variant="h6">
            Series
          </Typography>
        </Link>
        <Link to="/movies">
          <Typography style={margin10} variant="h6">
            Films
          </Typography>
        </Link>
        <Link to="/news">
          <Typography style={margin10} variant="h6">
            Nouveautés les plus regardées
          </Typography>
        </Link>
        <Link to="/list">
          <Typography style={margin10} variant="h6">
            Ma liste
          </Typography>
        </Link>
        <img
          style={{marginLeft: 'auto'}}
          className="nav__avatar"
          src="/images/netflix-avatar.png"
          alt=""
        />
      </Toolbar>
    </AppBar>
  )
}

export {NetflixAppBar}
