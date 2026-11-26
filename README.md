# Vola+ - Gestion de Cash Points Mobile Money

## 📱 À propos du projet
**Vola+** est une application mobile conçue pour les gérants de réseaux de **cash points** à Madagascar. Elle permet de centraliser, sécuriser et automatiser la collecte des rapports journaliers de chaque point de vente (Mobile Money : Orange Money, Mvola/Telma, Airtel Money).

L'objectif est de remplacer le processus manuel actuel (déplacement des agents, saisie sur Excel) par une solution numérique temps réel, réduisant les erreurs et offrant au gérant une vision consolidée de son activité.

## ✨ Fonctionnalités principales

L'application est divisée en deux espaces distincts, selon le rôle de l'utilisateur.

### 1. Espace Gérant (Administrateur)
Le gérant est le propriétaire du réseau de cash points. Il dispose d'une vue d'ensemble.
- **Tableau de bord global** : Visualisation en temps réel du total encaissé sur tous les points, du nombre de rapports reçus, et des écarts signalés.
- **Gestion des agents** : Création des comptes pour les agents (nom, email, mot de passe temporaire, et affectation à un cash point spécifique). Cette action est sécurisée et ne déconnecte pas le gérant.
- **Suivi des cash points** : Consultation des fiches détaillées par point de vente (ventes du jour, historique des rapports, écarts).
- **Validation des rapports** : Le gérant peut consulter le détail d'un rapport envoyé par un agent (produits vendus, opérations Mobile Money) et le valider ou signaler un écart.

### 2. Espace Agent (Opérateur de terrain)
L'agent est la personne qui tient le cash point au quotidien.
- **Tableau de bord personnel** : L'agent voit immédiatement son nom, le cash point dont il a la charge, et le total qu'il a encaissé dans la journée.
- **Saisie du rapport journalier** : Un formulaire simple et guidé permet à l'agent d'enregistrer, pour chaque produit et chaque opérateur Mobile Money, les montants des dépôts, retraits et ventes.
- **Consultation de la fiche de paie** : L'agent peut consulter le détail de sa rémunération (salaire de base, primes, retenues sur écarts) pour le mois en cours.

## ⚙️ Comment ça marche ? (Architecture technique)

L'application repose sur une architecture **client-serveur** moderne et sécurisée.

- **Frontend (Application Mobile)** : Développée avec **React Native (Expo)**. L'interface utilisateur suit la charte graphique "Vola+" (thème crème et vert).
- **Backend & Base de données** : **Supabase** (PostgreSQL). Toutes les données (profils, cash points, rapports) sont stockées dans des tables relationnelles.
- **Sécurité (Row Level Security - RLS)** : Chaque table est protégée par des règles strictes. Un agent ne peut lire que ses propres données, tandis que le gérant a une politique d'accès global.
- **Authentification** : Gérée par Supabase Auth. La session est stockée localement sur le téléphone.
- **Création de comptes (Edge Functions)** : L'application appelle une **Edge Function** (fonction serverless Supabase) pour créer un agent en arrière-plan sans déconnecter le gérant.

## 🚀 Installation et Démarrage (Développement)

### Prérequis
- Node.js (version LTS)
- L'application **Expo Go** sur votre téléphone
- Un projet **Supabase** (gratuit)

### Étapes pour le développeur

1. **Cloner le dépôt et installer les dépendances**
Ouvrez votre terminal et exécutez :
git clone https://github.com/AnachiAndria/MyCash-Cash-Point-Management-System.git
cd MyCash-Cash-Point-Management-System
npm install

2. **Configurer la base de données Supabase**
- Créez un nouveau projet sur supabase.com.
- Dans le terminal, liez le projet local à votre projet distant :
npx supabase link --project-ref <votre-project-id>
- Appliquez les migrations (crée les tables, triggers et règles de sécurité) :
npx supabase db push

3. **Configurer les variables d'environnement**
- À la racine du projet, créez un fichier .env :
cp .env.example .env
- Remplissez-le avec l'URL et la clé Publishable de votre projet Supabase :
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

4. **Créer le compte Gérant (Administrateur)**
L'application ne permet pas de s'inscrire en tant que gérant. Il faut le créer manuellement une seule fois :
- Allez dans **Authentication > Users** sur Supabase, cliquez sur **Add User** pour créer un utilisateur.
- Allez dans la table **profiles** (Table Editor) et modifiez la ligne de cet utilisateur pour mettre son role à gerant.

5. **Déployer l'Edge Function (pour la création d'agents)**
npx supabase functions deploy create-user

6. **Lancer l'application**
npx expo start
Scannez le QR code avec Expo Go.

## 🗄️ Gestion de la base de données (Migrations)

Ce projet utilise le système de migrations pour versionner la structure de la base de données.

### Première installation chez le client
1. Créez un nouveau projet Supabase.
2. Liez le projet local : npx supabase link --project-ref <project-id-du-client>
3. Appliquez les migrations : npx supabase db push
   (Cela exécutera les fichiers SQL présents dans supabase/migrations/ et créera toutes les tables et règles de sécurité).

### Pour les développeurs (mise à jour du schéma)
Si vous modifiez la base de données, générez un nouveau fichier de migration :
npx supabase db pull --remote
⚠️ Prérequis : Cette commande nécessite Docker Desktop installé et lancé sur votre machine.
Sans Docker : Créez manuellement un fichier .sql dans supabase/migrations/ avec vos modifications, puis exécutez npx supabase db push.

## 🛠 Stack Technique
- **Frontend** : React Native, Expo, TypeScript
- **Navigation** : React Navigation (Stack & Bottom Tabs)
- **Backend** : Supabase (PostgreSQL, Auth, Edge Functions, RLS)
- **Design** : Thème personnalisé "Vola+" (couleurs : #0E2A24, #1FAA6D, #F7F3E9)