# Test développeuse web — Tremplin

## À propos de moi

- **Nom / prénom :** NGUYEN Kim Yen
- **Formation :** Étudiante en troisième année de BUT Métiers du Multimédia et de l’Internet (MMI), spécialité Développement Web et dispositifs interactifs.
- **Stage recherché :** environ 18 semaines pour l’année 2026-2027, selon un rythme de deux semaines en entreprise et deux semaines de cours.
- **Portfolio :** [nguyen-kimyen.com](https://nguyen-kimyen.com)
- **LinkedIn :** [nguyen-kimyen](https://www.linkedin.com/in/nguyen-kimyen)
- **GitHub :** à compléter

## Aperçu

Intégration d’une page de contact pour une agence immobilière à partir de la maquette fournie. Le formulaire permet de renseigner ses coordonnées, son motif de contact et plusieurs disponibilités pour une visite. Les demandes sont enregistrées dans une base de données locale SQLite.

## Captures d’écran

> Ajouter ici une capture d’écran de la page principale avant le rendu final.

## Stack technique & choix

- **Next.js 16.2.9 / React 19.2.4 :** framework moderne utilisé pour l’interface et la route serveur qui enregistre les formulaires.
- **TypeScript :** permet de sécuriser les données et de rendre le code plus fiable.
- **CSS personnalisé :** utilisé pour reproduire précisément la maquette, sans dépendre d’une bibliothèque d’interface.
- **SQLite :** base de données locale légère, créée automatiquement au premier envoi du formulaire ; elle évite de devoir installer et lancer un serveur de base de données.
- **API Route Next.js :** la route `/api/demandes` reçoit les données du formulaire et les enregistre dans SQLite.
- **ESLint :** vérifie la qualité du code et aide à repérer les erreurs.
- **Git / GitHub :** utilisés pour versionner et publier le projet.

## Lancement du projet

### Prérequis

- Node.js 22 ou une version plus récente

### Installation

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

La base SQLite locale (`demandes.db`) est créée automatiquement lors du premier envoi de formulaire. Elle n’est pas versionnée dans Git.

## Questions

### Avez-vous trouvé l’exercice facile ou difficile ? Qu’est-ce qui vous a posé problème ?

J’ai trouvé l’exercice moyennnement difficile, notamment pour reproduire la maquette avec précision et concevoir un formulaire réellement fonctionnel. La gestion des disponibilités, la validation des champs et l’enregistrement des données en base ont demandé une attention particulière.

### Avez-vous appris de nouveaux outils pour répondre à l’exercice ? Si oui, lesquels ?

Oui. Cet exercice m’a permis d’approfondir Next.js, les routes API, la gestion d’un formulaire React et SQLite.

### Quelle est la place du développement web dans votre cursus de formation ?

Le développement web occupe une place centrale dans mon cursus. Ma spécialité Développement Web et dispositifs interactifs me permet d’aborder à la fois l’intégration, le développement front-end, les interactions et la conception d’expériences numériques.

### Avez-vous utilisé un LLM ? Si oui, comment intégrez-vous les LLM à chaque étape de votre workflow ?

Oui. J’utilise les LLM comme outil d’assistance pour clarifier une approche technique, comprendre une erreur, explorer des alternatives et relire le code. Je conserve toutefois la responsabilité des choix techniques, des tests et de la validation finale.
