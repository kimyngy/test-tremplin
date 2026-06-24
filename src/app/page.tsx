"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const heures = ["9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"];
const minutes = ["00", "15", "30", "45"];

export default function Accueil() {
  const [disponibilites, definirDisponibilites] = useState<string[]>([]);
  const [jour, definirJour] = useState("Lundi");
  const [heure, definirHeure] = useState("9h");
  const [minute, definirMinute] = useState("00");
  const [etatEnvoi, definirEtatEnvoi] = useState<"repos" | "envoi" | "succes" | "erreur">("repos");
  const [messageStatut, definirMessageStatut] = useState("");

  function ajouterDisponibilite() {
    const nouvelleDisponibilite = `${jour} à ${heure}${minute}`;

    definirDisponibilites((disponibilitesActuelles) =>
      disponibilitesActuelles.includes(nouvelleDisponibilite)
        ? disponibilitesActuelles
        : [...disponibilitesActuelles, nouvelleDisponibilite],
    );
  }

  function supprimerDisponibilite(indexASupprimer: number) {
    definirDisponibilites((disponibilitesActuelles) =>
      disponibilitesActuelles.filter((_, index) => index !== indexASupprimer),
    );
  }

  async function envoyerFormulaire(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    definirEtatEnvoi("envoi");
    definirMessageStatut("");

    const formulaire = new FormData(evenement.currentTarget);
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

    evenement.currentTarget.reset();
    definirDisponibilites([]);
    definirEtatEnvoi("succes");
    definirMessageStatut(resultat.message);
  }

  return (
    <main className="page">
      <form className="contact-form" onSubmit={envoyerFormulaire}>
        <h1>CONTACTEZ L’AGENCE</h1>

        <section className="coordinates">
          <h2>VOS COORDONNÉES</h2>
          <div className="radios">
            <label><input type="radio" name="civilite" value="mme" /> Mme</label>
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
            <label><input type="radio" name="sujet" value="visite" /> Demande de visite</label>
            <label><input type="radio" name="sujet" value="rappel" /> Être rappelé·e</label>
            <label><input type="radio" name="sujet" value="photos" /> Plus de photos</label>
          </div>
          <textarea name="message" placeholder="Votre message" required />
        </section>

        <section className="availability">
          <h2>DISPONIBILITÉS POUR UNE VISITE</h2>
          <div className="availability-fields">
            <select name="jour" value={jour} onChange={(evenement) => definirJour(evenement.target.value)}>
              {jours.map((jourDisponible) => <option key={jourDisponible}>{jourDisponible}</option>)}
            </select>
            <select name="heure" value={heure} onChange={(evenement) => definirHeure(evenement.target.value)}>
              {heures.map((heureDisponible) => <option key={heureDisponible}>{heureDisponible}</option>)}
            </select>
            <select name="minute" value={minute} onChange={(evenement) => definirMinute(evenement.target.value)}>
              {minutes.map((minuteDisponible) => <option key={minuteDisponible}>{minuteDisponible}</option>)}
            </select>
            <button type="button" className="add-button" onClick={ajouterDisponibilite}>
              AJOUTER<br />DISPO
            </button>
          </div>

          {disponibilites.map((disponibilite, index) => (
            <div className="slot" key={disponibilite}>
              {disponibilite}
              <button type="button" onClick={() => supprimerDisponibilite(index)} aria-label={`Supprimer ${disponibilite}`}>×</button>
            </div>
          ))}
        </section>

        <div className="form-status" aria-live="polite">{messageStatut}</div>
        <button type="submit" className="submit-button" disabled={etatEnvoi === "envoi"}>
          {etatEnvoi === "envoi" ? "ENVOI..." : "ENVOYER"}
        </button>
      </form>
    </main>
  );
}
