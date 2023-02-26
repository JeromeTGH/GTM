# Projet GTM (backend)

Le __Projet GTM (backend)__ est tout simplement un "Gestionnaire de Taches Mensuelles", développé à titre personnel, pour un usage personnel. C'est avant tout un projet d'apprentissage de NodeJS (et de bon nombre de ses modules, comme express, mongoose, bcrypt, …), ainsi que de MongoDB.

Globalement, ce gestionnaire de taches aura pour but de :
- envoyer des mails, avec liste de tâches à faire, le 1er de chaque mois, à chaque utilisateur inscrit
- gérer le suivi (pointage) des tâches réalisées

De manière secondaire, ce gestionnaire permettra également :
- de gérer une base d'utilisateurs (pseudo/email/mdp) ; il sera possible, de manière conditionnelle, de créer/voir/mettre à jour/effacer des utilisateurs
- de gérer des tâches réalisables, pour chaque utilisateur (il sera là aussi possible de créer/voir/maj/supprimer des éléments)
- de gérer des listes de tâches, définies et figées au 1er de chaque mois (en fonction des tâches réalisables "présentes", au 1er de chaque mois)

Ici, il s'agit da partie backend (API), de ce projet.

Nota : les envois de mails périodiques seront lancés via CRON, depuis un hébergement web, au niveau de l'API (requete GET à effectuer = api/listesdetaches/genereToutesLesListesMensuelles/).

## Sommaire
1. [Fichiers/répertoires à créer](#fic-rep-a-creer)
2. [Liste de toutes les routes de l'API](#routes)
3. [Installation](#installation)
4. [Divers](#divers)

<a name="fic-rep-a-creer"></a>
## Fichiers/répertoires à créer

Avant de pouvoir exécuter ce projet, il faudra penser à rajouter certains fichiers qui sont manquant ici (pour des raisons de sécurité/confidentialité).

--> Fichier `./config/.env`. Il devra contenir les 2 lignes suivantes (colonne "Code"):

| Commentaire | Code |
| ------------- |:-------------:|
| Port d'accès au __serveur NodeJS__ (5000, par défaut) | PORT=5000 |
| __Connection string__, pour l'accès à la base de données | DB_CONNECTION_STRING=mongodb+srv://username:pass@cluster/dbname  |
| __Clef secrète__, pour json-web-token (jwt) | CLEF_SECRETE=xxxxx |

<a name="routes"></a>
## Fichiers/répertoires à créer

| Méthode d'appel | Chemin d'accès | Commentaires | Paramètres à fournir |
| ------------- |:-------------:|:-------------:|:-------------:|
| GET | getUserIdSiCookieJwtConforme | Renvoie l'ID de l'utilisateur connecté (ou 0, si aucun) | - |
| POST | api/utilisateurs/postCreateUser | Permet la création d'un nouvel utilisateur | {"pseudo": "xxx", "email": "yyy", "password": "zzz"} |
| POST | api/utilisateurs/postLogin | Permet à l'utilisateur de se connecter, à l'aide de son email et mot de passe | {"email": "xxx", "password": "yyy"} |
| POST | api/utilisateurs/postLogout | Permet de déconnecter l'utilisateur "en cours" | - |
| GET | api/utilisateurs/getAll | Retourne un tableau d'objets, avec tous les utilisateurs dedans | - |
| GET | api/utilisateurs/getOne/xxxxxxx | Retourne les données utilisateur, dont l'ID est égal à "xxxxxxx" | - |
| PUT | api/utilisateurs/updateOne/xxxxxxx | Met à jour les données utilisateur (pseudo, etat actif/inactif), dont l'ID est égal à "xxxxxxx" | { "pseudo": "yyy", "estActif": false } |
| DELETE | api/utilisateurs/deleteOne/xxxxxxx | Supprime l'utilisateur, dont l'ID est égal à "xxxxxxx" | - |
| PATCH | api/utilisateurs/addTask/xxxxxxx | Permet l'ajout d'une nouvelle tâche possible, pour un utilisateur donné (ayant l'ID égal à "xxxxxxx") | { "libelle": "yyy", "description": "zzz" } |
| PATCH | api/utilisateurs/updateTask/xxxxxxx | Permet de modifier le libellé et la description d'une tâche possible, pour un utilisateur donné (ayant l'ID égal à "xxxxxxx") | { "old_libelle": "ancien yyy", "old_description": "ancien zzz", "new_libelle": "nouveau yyy", "new_description": "nouveau zzz" } |
| PATCH | api/utilisateurs/removeTask/xxxxxxx | Permet l'enlever une tâche possible, pour un utilisateur donné (ayant l'ID égal à "xxxxxxx"), d'après son libellé et sa description | { "libelle": "yyy", "description": "zzz" } |
| POST | api/listesdetaches/genereNouvelleListeDeTachesAfaire/xxxxxxx | Permet de générer une nouvelle liste de tâches à faire, pour l'utilisateur ayant l'ID numéro xxxxxxx | - |
| GET | api/listesdetaches/getAllListesDeTachesAfaire/xxxxxxx | Permet d'afficher toutes les liste de tâches à faire, pour l'utilisateur ayant l'ID numéro xxxxxxx | - |
| GET | api/listesdetaches/getListeDeTachesAfaire/xxxxxxx | Permet d'afficher la liste de tâches à faire, ayant pour ID le numéro xxxxxxx | - |
| DELETE | api/listesdetaches/removeListeDeTachesAfaire/xxxxxxx | Permet de supprimer la liste de tâches à faire, ayant pour ID le numéro xxxxxxx | - |
| PUT | api/listesdetaches/updateListeDeTachesAfaire/xxxxxxx | Permet de changer le timestampCloture d'une liste de tâches à faire, ayant pour ID le numéro xxxxxxx | - |
| PATCH | api/listesdetaches/updateUneTacheDansListeDeTachesAfaire/xxxxxxx | Permet de changer l'état d'une tâche donnée (dire si elle est accomplie ou nom), listé dans une liste de tâches à faire, ayant pour ID le numéro xxxxxxx | { "tacheID": "yyy", "bTacheAccomplie": true ou false } |
| GET | api/listesdetaches/genereToutesLesListesMensuelles/ | Permet de générer une série de listes de tâches à faire, une par utilisateur identifié en base, ayant un statut actif | - |

<a name="installation"></a>
## Installation

Faire un `npm install` dans le répertoire projet, pour installer toutes les librairies nécessaires (nota : cette commande va créer et loger toutes ces librairies dans un répertoire spécifique, nommé `node_modules`).

<a name="divers"></a>
## Divers

Projet d'apprentissage personnel de NodeJS / Javascript / MongoDB.

@2023