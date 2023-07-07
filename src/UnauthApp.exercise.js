import * as React from 'react'
// 🐶 importe le composant 'LoginRegister' qui est dans ./components/LoginRegister
import LoginRegister from './components/LoginRegister'

// 🐶 passe les props 'login' et 'register' qui sont utilise à <Login>
function UnauthApp({login, register, error}) {
  // 👨‍✈️ hugo souhaite une image de fond avec des films Netflix pour page <LoginRegister />
  // utilise celle ci :
  // 🤖 const imageUrl = '/images/posters.jpg'
  const imageUrl = '/images/posters.jpg'
  return (
    // 🐶 applique ce style pour avoir l'image de fond
    // backgroundImage: `url('${imageUrl}')`,
    // backgroundSize: 'cover',

    // position: 'fixed',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // overflow: 'auto',
    // <div style={{color: 'white'}}>

    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',

        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
      }}
    >
      {/* 🐶 créé un logo : une balise <img> /images/netflix-logo.png
     - margin à '30px
     - height à 50
    */}
      <img
        src="/images/netflix-logo.png"
        alt=""
        style={{margin: '30px'}}
        height={50}
      />
      {/* ⛏️ supprime le texte ci dessous et remplace le par le composant <LoginRegister>
      Passe les props :
      - open={true}
      - login
      - register
       */}
      {/* Vous n'êtes pas connecté */}
      <div>
        <LoginRegister
          open={true}
          login={login}
          register={register}
          error={error}
        />
      </div>
    </div>
  )
}

export {UnauthApp}
