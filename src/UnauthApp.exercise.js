import * as React from 'react'
import {LoginRegister} from './components/LoginRegister'
import {AuthContext, useAuth} from 'context/AuthContext.exercise'

// ⛏️ supprime les props '{login, register, error}' car il sera récupéré via le context API ('AuthContext')
// directement dans le composant 'src/componants/LoginRegister'
function UnauthApp() {
  // function UnauthApp({login, register, error}) {
  const {login, register, error} = useAuth()
  const imageUrl = '/images/posters.jpg'
  return (
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
      <img
        src="/images/netflix-logo.png"
        alt=""
        style={{margin: '30px'}}
        height={50}
      />

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
