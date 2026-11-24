# Vola+ - Application de gestion de Cash Points

Application mobile React Native (Expo) pour la gestion de cash points (Orange Money, Mvola/Telma, Airtel Money).

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version LTS)
- Un éditeur de code (VS Code recommandé)
- L'application **Expo Go** installée sur votre téléphone (Android/iOS)

### Installation
1. Cloner le dépôt :
   git clone https://github.com/AnachiAndria/MyCash-Cash-Point-Management-System.git
   cd MyCash-Cash-Point-Management-System

2. Installer les dépendances :
   npm install

3. Configurer les variables d'environnement (Voir section Supabase ci-dessous).

4. Lancer l'application :
   npx expo start

5. Scanner le QR code avec l'application **Expo Go** sur votre téléphone.

## 🔐 Configuration Supabase (Backend)

Ce projet utilise une instance Supabase **déjà existante et partagée** (celle de l'administrateur du projet). Vous n'avez pas besoin de créer un nouveau projet Supabase. Vous devez simplement lier votre application locale à cette base de données.

### Comment lier le projet local à Supabase :

1. **Récupérer les clés** : Demandez à l'administrateur du projet l'URL du projet et la clé `Publishable key`.
2. **Créer le fichier d'environnement** : À la racine du projet, créez un fichier nommé `.env` (vous pouvez copier le fichier `.env.example` fourni).
3. **Remplir le fichier `.env`** avec les informations fournies par l'administrateur :
   EXPO_PUBLIC_SUPABASE_URL=https://[votre-projet].supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
4. **Redémarrer le serveur** : Si l'application tournait déjà, arrêtez-la (Ctrl+C) et relancez-la avec `npx expo start -c` pour prendre en compte les nouvelles variables.

*(Note : Le fichier `.env` contenant les vraies clés ne doit jamais être poussé sur GitHub, il est déjà ignoré par le `.gitignore`).*

## 📱 Fonctionnalités
- Authentification avec rôles (Gérant / Agent)
- Tableau de bord Gérant (vue globale des cash points)
- Saisie de rapport journalier (Agent)
- Fiche de paie (Agent)
- Historique des transactions
- Design "Vola+" (thème crème/vert, interface moderne)

## 🛠 Stack technique
- Frontend : React Native avec Expo
- Backend : Supabase (PostgreSQL, Auth, Row Level Security)
- Langage : TypeScript
