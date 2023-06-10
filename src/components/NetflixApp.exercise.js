import React from 'react'

// 🐶 créé une structure HTML simple represantant le site de Netflix
// il y aura :
// - une barre de menu
// - un header
// - un zone de pochette de film (format large)
// - un zone de pochette de film (format poster)
// - un footer

// 👨‍✈️ Hugo le chef de projet te détaillera chaque bloque.
const NetflixApp = () => {
  return (
    <div>
      {/* 👨‍✈️ Barre de menu :  créé la barre de menu en créant 7 élements (2 images logo et 5 liens) 
      La premiere image sera le logo NetFlix, la derniere image le boutton du compte.*/}
      <div>
        {/* 🐶 créé une <img> avec la source "images/netflix-logo.png" et 'height' de 20px   */}
        {/* 🐶 créé  5 liens <a> : Acceuil, Séries, Films, Nouveautés, Ma liste*/}
        {/* 🐶 créé une <img> avec la source "images/netflix-avatar.png" et 'height' de 20px   */}
        <img
          src="images/netflix-logo.png"
          alt=""
          style={{height: '20px'}}
        ></img>
        <a href="https://example.com">Accueil</a>
        <a href="https://example.com">Séries</a>
        <a href="https://example.com">Films</a>
        <a href="https://example.com">Nouveautés</a>
        <a href="https://example.com">Ma liste</a>
        <img
          src="images/netflix-avatar.png"
          alt=""
          style={{height: '20px'}}
        ></img>
      </div>

      {/* 👨‍✈️ Header : Contenant un titre, 2 bouttons, zone description */}
      <header>
        <div>
          {/* 🐶 Créé un titre h1 : La casa de papel */}
          <h1>La casa de papel</h1>
          <div>
            {/* 🐶 Créé un button : Lecture */}
            {/* 🐶 Créé un button : Ajouter à ma liste */}
            <input type="button" value={'Lecture'} />
            <input type="button" value={'Ajouter à ma liste'} />
          </div>
          {/* 🐶 Créé un titre h1 contenant le texte : Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d'un cambriolage grandiose ciblant la Maison royale de la
            Monnaie d'Espagne. */}
          <h1>
            Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d'un cambriolage grandiose ciblant la Maison royale de la
            Monnaie d'Espagne.
          </h1>
        </div>
      </header>

      {/* 👨‍✈️ Zone ligne de films format large */}
      <div>
        {/* 🐶 Créé un titre h2 : Films Netflix */}
        <h2>Films Netflix</h2>
        <div>
          {/* 🐶 Créé 4 <img> height à 250 : Alterne avec 'images/sample.jpg' et images/sample1.jpg  */}
          <img style={{height: '250px'}} src="images/sample.jpg" alt=""></img>
          <img style={{height: '250px'}} src="images/sample1.jpg" alt=""></img>
          <img style={{height: '250px'}} src="images/sample.jpg" alt=""></img>
        </div>
      </div>

      {/* 👨‍✈️ Zone ligne de films format poster */}
      <div>
        {/* 🐶 Créé un titre h2 : Série Netflix */}
        <h2>Série Netflix</h2>
        <div>
          {/* 🐶 Créé 4 <img> height à 300 : Alterne avec 'images/sample-poster.jpg' et images/sample-poster1.jpg  */}
          <img
            style={{height: '300px'}}
            src="images/sample-poster.jpg"
            alt=""
          ></img>
          <img
            style={{height: '300px'}}
            src="images/sample-poster1.jpg"
            alt=""
          ></img>
          <img
            style={{height: '300px'}}
            src="images/sample-poster.jpg"
            alt=""
          ></img>
          <img
            style={{height: '300px'}}
            src="images/sample-poster1.jpg"
            alt=""
          ></img>
        </div>
      </div>

      <footer>2021 - Netflix Clone</footer>
    </div>
  )
}
export {NetflixApp}
