import React from 'react'

// 🐶 Cette fonction loguera les information de profil en rouge
const logProfiler = data => {
  console.log('%c profiler', 'color: LightCoral', data)
}

// 🐶 passe les props 'phases' et ...props
function Profiler({phases = [], ...props}) {
  // 🐶 créé une fonction handleRender qui fera le rendu du profiler
  // passe lui tous les paramètres du 'onRender'
  // 📝https://fr.reactjs.org/docs/profiler.html#onrender-callback
  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interaction,
  ) => {
    // 🐶 conditionne l'appel de la fonction 'logProfiler' si 'phases' contient 'phase'
    // pour n'appeler  'logProfiler' que sur certaines phases ['mount','update']
    // 🐶 appelle logProfiler avec un objet qui contier tous les parametres
    if (!phases.length || phases.includes(phase)) {
      // Si j'ai pas de phases ou une phase de "mount" ou "update" je log
      logProfiler({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interaction,
      })
    }
  }

  // 🐶 retourne <React.Profiler avec les bons props onRender et ...props
  return <React.Profiler onRender={handleRender} {...props} />
}
export {Profiler}
