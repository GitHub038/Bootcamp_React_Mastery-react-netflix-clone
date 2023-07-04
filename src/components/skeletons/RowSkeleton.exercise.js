import * as React from 'react'
// 🐶 importe le composant Skeleton de MUI
// 📑 Le lien vers la documentation de Skeleton https://mui.com/components/skeleton/
import {Skeleton} from '@mui/material'

// 🐶 Le style et le rendu du composant <NetflixHeader> et copier coller ci dessous
// 🐶 Ton boulot est de remplacer les données manquantes par des composants <Skeleton />

// 🐶 Nous voulons <RowSkeleton> gère le nombre de Skeleton image à afficher
// ainsi que le titre et le mode poster/large
// 🐶 créé 3 props
// 1. 'nbElement' initialisé à 20 par défaut
// 1. 'title' initialisé à 'films' par défaut
// 3. 'wideImage' initialisé à 'true' par défaut
const RowSkeleton = ({nbElement = 20, title = 'Films', wideImage = true}) => {
  // 🐶 déclare un array 'postersSkeletons'
  const postersSkeletons = []
  // 🐶 fait une boucle `for` de 0 à 'nbElement' et ajoute dans 'postersSkeletons' :
  // - une <div> avec 'className' 'row__poster' et 'row__posterLarge' et
  // - qui contient un composant  <Skeleton>
  // Propiété de <Skeleton>
  // - utilise le prop: variant = "rect"
  // - utilise les props 'width' et 'height' pour dimensionner le skeleton
  // 400 x 225 si 'wideImage' = true (format large)
  // 166 x 250 sinon (format poster)

  for (let i = 0; i < nbElement; i++) {
    postersSkeletons.push(
      <div key={i} className="row__poster row__posterLarge">
        <Skeleton
          variant="rectangular"
          width={wideImage ? 400 : 166}
          height={wideImage ? 225 : 250}
        />
      </div>,
    )
  }

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {/* 🐶 remplace l'array 'data.data.results' par l'array 'postersSkeletons' */}

          {/* {data.data.results.map(movie => {
          return (
            <div
              key={movie.id}
              className={`row__poster row__posterLarge ${watermarkClass}`}
            >
              <img src={buildImagePath(movie)} alt={movie.name} />
            </div>
          )
        })} */}
          {postersSkeletons.map(movie => {
            return movie
          })}
        </div>
      </div>
    </>
  )
}
export {RowSkeleton}
