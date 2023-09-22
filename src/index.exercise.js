import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {App} from './App'
import reportWebVitals from './reportWebVitals'
//🐶 importe le composant <Profiler/>
import {Profiler} from './components/Profiler'

ReactDOM.render(
  <React.StrictMode>
    {/* 🐶 Wrappe 'App' avec <React.Profiler onRender={(...args) => console.log(...args)} > 
        dans un premier temps pour tester*/}

    {/* 🐶 Ensuite Wrappe 'App' avec le composant Profiler */}
    <Profiler id="App Netflix" phases={['mount']}>
      <App />
    </Profiler>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
