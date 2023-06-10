// ⛏️ supprime les 2 imports suivants, nous ne les utiliseront pas
// import logo from './logo.svg';
// import './App.css';
// 🐶 importe 'NetflixApp'
// 🤖 import {NetflixApp} from 'components/NetflixApp'
import {NetflixApp} from 'components/NetflixApp'

function App() {
  return (
    // ⛏️ supprime la 'div' principale et son contenu et retourne à la place
    <NetflixApp />
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}
// 🐶 edite maintenant le fichier 'components/NetflixApp'
export {App}
