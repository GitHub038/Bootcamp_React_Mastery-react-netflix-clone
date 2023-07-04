import {NetflixApp} from 'components/NetflixApp'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
// 🐶 importe le composant 'Error404' depuis '/components/Error404'
// 🐶 importe le composant 'NetflixMovies', 'NetflixSeries','NetflixNews', 'NetflixById'
// 🐶 importe -> import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Error404 from 'components/Error404'
import {NetflixMovies} from 'components/NetflixMovies.exercise'
import {NetflixSeries} from 'components/NetflixSeries.exercise'
import {NetflixNews} from 'components/NetflixNews.exercise'
import {NetflixById} from 'components/NetflixById.exercise'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

function App() {
  return (
    // 🐶 wrappe toute l'application avec <Router>
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {/* 
          🐶 utilise <Routes> et  </Routes> pour determiner les routes
          nous voulons les routes avec les configurations suivantes :
          
          1. path '/' -> <NetflixApp />
          2. path '/tv/:tvId' -> <NetflixById />
          3. path '/tv/:movieId' -> <NetflixById />
          4. path '/series' -> <NetflixSeries />
          5. path '/movies' -> <NetflixMovies />
          6. path '/news' -> <NetflixNews />
          7. path '/*' -> <Error404 />
       
        */}
          <Routes>
            <Route path="/" element={<NetflixApp />} />
            <Route path="/tv/:tvId" element={<NetflixById />} />
            <Route path="/movie/:movieId" element={<NetflixById />} />
            <Route path="/series" element={<NetflixSeries />} />
            <Route path="/movies" element={<NetflixMovies />} />
            <Route path="/news" element={<NetflixNews />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  )
}

export {App}
