# Projet GTM (backend)

Le "Projet GTM (backend) est tout simplement un "Gestionnaire de Taches Mensuelles", développé à titre personnel, pour un usage personnel. C'est avant tout un projet d'apprentissage de NodeJS et quelque uns de ses modules (express, mongoose, bcrypt, …), ainsi que de MongoDB.

Ce gestionnaire de taches a principalement pour but de :
- envoyer des mails, avec liste de tâches à faire, le 1er de chaque mois, à chaque utilisateur inscrit
- gérer le suivi (pointage) des tâches réalisées

De manière secondaire, ce gestionnaire permettra également :
- de gérer une base d'utilisateurs (pseudo/email/mdp) ; il sera possible, de manière conditionnelle, de créer/voir/mettre à jour/effacer des utilisateurs
- de gérer des tâches réalisables, pour chaque utilisateur (il sera là aussi possible de créer/voir/maj/supprimer des éléments)
- de gérer des listes de tâches, définies et figées au 1er de chaque mois (en fonction des tâches réalisables "présentes", au 1er de chaque mois)
 
----- à vérifier ce qu'il est possible de faire ----- Nota : les envois de mails périodiques seront lancés via CRON, depuis un hébergement web, au niveau de l'API

## Sommaire
1. [Fichiers/répertoires à créer](#fic-rep-a-creer)
2. [Installation](#installation)
3. [Divers](#divers)

<a name="fic-rep-a-creer"></a>
## Fichiers/répertoires à créer

Avant de pouvoir exécuter ce projet, il faudra penser à rajouter certains fichiers qui sont manquant ici (pour des raisons de sécurité/confidentialité).

--> Fichier `./config/.env`. Il devra contenir les 2 lignes suivantes (colonne "Code"):

| Commentaire | Code |
| ------------- |:-------------:|
| Port d'accès au __serveur NodeJS__ (5000, par défaut) | PORT=5000 |
| __Connection string__, pour l'accès à la base de données | DB_CONNECTION_STRING=mongodb+srv://username:pass@cluster/dbname  |

<a name="installation"></a>
## Installation

_à rédiger en fin de projet_.

<a name="divers"></a>
## Divers

Projet d'apprentissage de NodeJS / Javascript / MongoDB.

@2023