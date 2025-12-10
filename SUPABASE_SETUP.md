# Configuration Supabase

Ce document explique comment configurer Supabase pour cette application.

## Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=https://ctcuwoklrlaxxewjnxgn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_LYI2lccWzapWsiU3s5nTMA_lzqrMOP6
```

## Structure de la base de données

### Table `profiles`
Extension de `auth.users` qui stocke les informations supplémentaires des utilisateurs :
- `id` (UUID, référence à auth.users)
- `email` (TEXT)
- `name` (TEXT)
- `plan` (TEXT: 'free', 'pro', 'enterprise')
- `credits` (INTEGER)
- `avatar` (TEXT, nullable)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### Table `analyses`
Stocke les analyses de vidéos YouTube :
- `id` (UUID)
- `user_id` (UUID, référence à auth.users)
- `url` (TEXT)
- `video_id` (TEXT)
- `video_title` (TEXT)
- `thumbnail` (TEXT)
- `analyzed_at` (TIMESTAMPTZ)
- `result` (JSONB) - Contient l'objet AnalysisResult complet
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

## Sécurité (RLS)

Les politiques Row Level Security (RLS) sont activées sur toutes les tables :
- Les utilisateurs ne peuvent accéder qu'à leurs propres données
- Les politiques sont configurées pour SELECT, INSERT, UPDATE et DELETE

## Fonctionnalités

### Authentification
- Inscription automatique d'un profil lors de la création d'un compte
- Gestion des sessions via Supabase Auth
- Middleware pour protéger les routes

### Stockage des analyses
- Sauvegarde automatique des analyses dans Supabase
- Limite de 50 analyses par utilisateur (gérée côté application)
- Récupération et suppression des analyses

## Migration

Les migrations ont été appliquées via Supabase MCP :
1. `create_initial_schema` - Création des tables et fonctions
2. `setup_rls_policies` - Configuration des politiques RLS
3. `fix_function_security` - Correction de la sécurité des fonctions SQL

## Utilisation

L'application utilise maintenant Supabase pour :
- L'authentification des utilisateurs
- Le stockage des profils utilisateurs
- Le stockage des analyses de vidéos
- La gestion des sessions

Tous les appels à `localStorage` ont été remplacés par des appels à Supabase.

