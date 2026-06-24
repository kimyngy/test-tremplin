import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const cheminBaseDeDonnees = path.join(process.cwd(), "demandes.db");
const baseDeDonnees = new DatabaseSync(cheminBaseDeDonnees);

baseDeDonnees.exec(`
  CREATE TABLE IF NOT EXISTS demandes_contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    civilite TEXT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT NOT NULL,
    sujet TEXT,
    message TEXT NOT NULL,
    disponibilites TEXT NOT NULL,
    cree_le TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

export { baseDeDonnees };
