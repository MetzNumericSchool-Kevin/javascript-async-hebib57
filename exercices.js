/**
 * Code de base, ne pas modifier
 */

// Définition
const voyage = document.querySelector(".voyage_en_cours");
const epoque = document.querySelector(".localisation_epoque");
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(
  ".form__recherche_artefact"
);

const epoques = {
  romaine: "Romaine",
  medievale: "Médievale",
  jurassique: "Jurassique",
};

const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const afficherDestination = (nomEpoque) =>
  (localisationEpoqueHTML.textContent = nomEpoque);

// Execution
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");
  quandRechercheArtefact(artefact);
});

const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */
let nomEpoqueActuelle;

creerLesChoixEpoque(epoques);

// Fonction appelée plus haut quand le formulaire de voyage temporel est soumis
// et qu'une époque de destination du voyage temporel a été choisi
function quandEpoqueChoisie(nomEpoque) {
  nomEpoqueActuelle = nomEpoque;
  console.log(nomEpoqueActuelle);
  epoque.style.display = "none";
  voyage.style.display = "block";
  voyagerTemps(nomEpoqueActuelle, function () {
    voyage.style.display = "none";
    epoque.style.display = "block";
    epoque.textContent = nomEpoqueActuelle;
  });

  // Utilisation de votre0 fonction voyagerTemps
}

// Fonction appelée plus haut quand le formulaire de recherche d'artefact est soumis
function quandRechercheArtefact(artefact) {
  // Utilisation de votre fonction collecterArtefact
  collecterArtefact(artefact, function (collecteReussie) {
    afficherRechercheArtefact({
      artefact: artefact,
      epoque: nomEpoqueActuelle,
      success: collecteReussie,
    });
  });
}

function voyagerTemps(destination, callback) {
  console.log("Voyage temporel vers :", destination);
  setTimeout(() => {
    console.log("Voyage terminé vers :", destination);
    callback(destination);
  }, generationNombreAleatoireEntre(1000, 3000));
}

function collecterArtefact(nomArtefact, callback) {
  console.log("Collecte d'artefact en cours... ", nomArtefact);
  setTimeout(function () {
    const collecteReussie = Math.random() * 100 < 50;
    console.log(
      "Collecte d'artefact terminée :",
      nomArtefact,
      "Collecte réussie :",
      collecteReussie
    );
    callback(collecteReussie, nomArtefact);
  }, generationNombreAleatoireEntre(1000, 3000));
}

function missionTemporelleComplexe() {
  console.log("Mission temporelle complexe en cours...");
  voyagerTemps("médiévale", () => {
    collecterArtefact("épée de chevalier", () => {
      voyagerTemps("romaine", () => {
        collecterArtefact("bouclier", () => {
          collecterArtefact("épée romaine", () => {
            console.log("Mission temporelle complexe accomplie");
          });
        });
      });
    });
  });
}

missionTemporelleComplexe();
