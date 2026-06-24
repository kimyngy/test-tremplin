import { baseDeDonnees } from "@/lib/database";

export const runtime = "nodejs";

function texte(valeur: unknown) {
  return typeof valeur === "string" ? valeur.trim() : "";
}

export async function POST(requete: Request) {
  const donnees: Record<string, unknown> = await requete.json();
  const nom = texte(donnees.nom);
  const prenom = texte(donnees.prenom);
  const email = texte(donnees.email);
  const telephone = texte(donnees.telephone);
  const message = texte(donnees.message);
  const disponibilites = Array.isArray(donnees.disponibilites)
    ? donnees.disponibilites.filter((disponibilite) => typeof disponibilite === "string")
    : [];

  if (!nom || !prenom || !email || !telephone || !message) {
    return Response.json(
      { message: "Merci de remplir tous les champs obligatoires." },
      { status: 400 },
    );
  }

  baseDeDonnees
    .prepare(
      `INSERT INTO demandes_contact
        (civilite, nom, prenom, email, telephone, sujet, message, disponibilites)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      texte(donnees.civilite) || null,
      nom,
      prenom,
      email,
      telephone,
      texte(donnees.sujet) || null,
      message,
      JSON.stringify(disponibilites),
    );

  return Response.json({ message: "Votre demande a bien été envoyée." }, { status: 201 });
}
