"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const heures = ["9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"];
const minutes = ["00", "15", "30", "45"];

type NomSelecteur = "jour" | "heure" | "minute";

type SelecteurProps = {
  nom: NomSelecteur;
  valeur: string;
  options: string[];
  ouvert: boolean;
  ouvrir: () => void;
  choisir: (valeur: string) => void;
};

function Selecteur({ nom, valeur, options, ouvert, ouvrir, choisir }: SelecteurProps) {
  return (
    <div className="selecteur">
      <button
        type="button"
        className="selecteur-bouton"
        aria-haspopup="listbox"
        aria-expanded={ouvert}
        onClick={ouvrir}
      >
        {valeur}<span className="fleche-selecteur" aria-hidden="true" />
      </button>
      {ouvert && (
        <div className="menu-selecteur" role="listbox" aria-label={nom}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option === valeur}
              key={option}
              onClick={() => choisir(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Accueil() {
  const [disponibilites, definirDisponibilites] = useState<string[]>([]);
  const [jour, definirJour] = useState("Lundi");
  const [heure, definirHeure] = useState("9h");
  const [minute, definirMinute] = useState("00");
  const [selecteurOuvert, definirSelecteurOuvert] = useState<NomSelecteur | null>(null);
  const [etatEnvoi, definirEtatEnvoi] = useState<"repos" | "envoi" | "succes" | "erreur">("repos");
  const [messageStatut, definirMessageStatut] = useState("");
  const [confirmationOuverte, definirConfirmationOuverte] = useState(false);

  function ajouterDisponibilite() {
    const nouvelleDisponibilite = `${jour} à ${heure}${minute}`;

    definirDisponibilites((disponibilitesActuelles) =>
      disponibilitesActuelles.includes(nouvelleDisponibilite)
        ? disponibilitesActuelles
        : [nouvelleDisponibilite, ...disponibilitesActuelles],
    );
  }

  function supprimerDisponibilite(indexASupprimer: number) {
    definirDisponibilites((disponibilitesActuelles) =>
      disponibilitesActuelles.filter((_, index) => index !== indexASupprimer),
    );
  }

  async function envoyerFormulaire(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();

    if (disponibilites.length === 0) {
      definirEtatEnvoi("erreur");
      definirMessageStatut("Ajoute au moins une disponibilité pour la visite.");
      return;
    }

    definirEtatEnvoi("envoi");
    definirMessageStatut("");
    const formulaireElement = evenement.currentTarget;
    const formulaire = new FormData(formulaireElement);

    try {
      const reponse = await fetch("/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          civilite: formulaire.get("civilite"),
          nom: formulaire.get("nom"),
          prenom: formulaire.get("prenom"),
          email: formulaire.get("email"),
          telephone: formulaire.get("telephone"),
          sujet: formulaire.get("sujet"),
          message: formulaire.get("message"),
          disponibilites,
        }),
      });
      const resultat = await reponse.json();

      if (!reponse.ok) {
        definirEtatEnvoi("erreur");
        definirMessageStatut(resultat.message);
        return;
      }

      formulaireElement.reset();
      definirDisponibilites([]);
      definirEtatEnvoi("succes");
      definirConfirmationOuverte(true);
    } catch {
      definirEtatEnvoi("erreur");
      definirMessageStatut("Une erreur est survenue. Réessaie dans un instant.");
    }
  }

  return (
    <main className="page">
      <form className="contact-form" onSubmit={envoyerFormulaire}>
        <h1>CONTACTEZ L’AGENCE</h1>

        <section className="coordinates">
          <h2>VOS COORDONNÉES</h2>
          <div className="radios">
            <label><input type="radio" name="civilite" value="mme" required /> Mme</label>
            <label><input type="radio" name="civilite" value="m" /> M</label>
          </div>
          <div className="name-fields">
            <input type="text" name="nom" placeholder="Nom" required />
            <input type="text" name="prenom" placeholder="Prénom" required />
          </div>
          <input type="email" name="email" placeholder="Adresse mail" required />
          <input type="tel" name="telephone" placeholder="Téléphone" required />
        </section>

        <section className="message">
          <h2>VOTRE MESSAGE</h2>
          <div className="radios">
            <label><input type="radio" name="sujet" value="visite" required /> Demande de visite</label>
            <label><input type="radio" name="sujet" value="rappel" /> Être rappelé·e</label>
            <label><input type="radio" name="sujet" value="photos" /> Plus de photos</label>
          </div>
          <textarea name="message" placeholder="Votre message" required />
        </section>

        <section className="availability">
          <h2>DISPONIBILITÉS POUR UNE VISITE</h2>
          <div className="availability-fields">
            <Selecteur
              nom="jour"
              valeur={jour}
              options={jours}
              ouvert={selecteurOuvert === "jour"}
              ouvrir={() => definirSelecteurOuvert(selecteurOuvert === "jour" ? null : "jour")}
              choisir={(valeur) => { definirJour(valeur); definirSelecteurOuvert(null); }}
            />
            <Selecteur
              nom="heure"
              valeur={heure}
              options={heures}
              ouvert={selecteurOuvert === "heure"}
              ouvrir={() => definirSelecteurOuvert(selecteurOuvert === "heure" ? null : "heure")}
              choisir={(valeur) => { definirHeure(valeur); definirSelecteurOuvert(null); }}
            />
            <Selecteur
              nom="minute"
              valeur={minute}
              options={minutes}
              ouvert={selecteurOuvert === "minute"}
              ouvrir={() => definirSelecteurOuvert(selecteurOuvert === "minute" ? null : "minute")}
              choisir={(valeur) => { definirMinute(valeur); definirSelecteurOuvert(null); }}
            />
            <button type="button" className="add-button" onClick={ajouterDisponibilite}>
              AJOUTER<br />DISPO
            </button>
          </div>

          <div className="liste-disponibilites">
            {disponibilites.map((disponibilite, index) => (
              <div className="slot" key={disponibilite}>
                {disponibilite}
                <button type="button" onClick={() => supprimerDisponibilite(index)} aria-label={`Supprimer ${disponibilite}`}>×</button>
              </div>
            ))}
          </div>
        </section>

        <div className="form-status" aria-live="polite">{messageStatut}</div>
        <button type="submit" className="submit-button" disabled={etatEnvoi === "envoi"}>
          {etatEnvoi === "envoi" ? "ENVOI..." : "ENVOYER"}
        </button>
      </form>

      {confirmationOuverte && (
        <div className="popup-fond" role="presentation">
          <div className="popup-confirmation" role="dialog" aria-modal="true" aria-labelledby="titre-confirmation">
            <h2 id="titre-confirmation">Demande envoyée</h2>
            <p>Votre demande a bien été envoyée à l’agence.</p>
            <button type="button" onClick={() => definirConfirmationOuverte(false)}>FERMER</button>
          </div>
        </div>
      )}
    </main>
  );
}
