# VidInsight AI - Analyse de Vidéos YouTube avec IA

Une plateforme SaaS puissante pour analyser les vidéos YouTube avec l'intelligence artificielle. Obtenez des transcriptions instantanées, des métriques d'engagement, des scores de viralité et des insights alimentés par l'IA.

## 🎯 Fonctionnalités

- **Analyse Vidéo Complète**: Extractez les métadonnées, les métriques d'engagement et les transcriptions
- **Transcription IA**: Support de 50+ langues avec détection automatique
- **Score de Viralité**: Algorithme propriétaire pour prédire le potentiel viral
- **Générateur de Miniatures IA**: Créez des miniatures accrocheuses
- **Générateur de Scripts IA**: Générez des scripts vidéo viraux
- **Internationalisation**: Support de 4 langues (FR, EN, ES, DE)
- **Thème Dark/Light**: Interface adaptable
- **Authentification Sécurisée**: Via Supabase
- **Rate Limiting**: Protection contre les abus

## 🛠️ Stack Technique

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 4 + PostCSS
- **Components**: Radix UI + shadcn/ui
- **State Management**: React Context + Hooks
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API Routes**: Next.js API Routes
- **Real-time**: Supabase Realtime (optionnel)

### DevTools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **TypeScript**: Strict mode

## 📋 Prérequis

- Node.js >= 18
- pnpm >= 8
- Compte Supabase
- Clés API pour les services IA (optionnel)

## 🚀 Installation & Setup

### 1. Cloner le repository
```bash
git clone <repository-url>
cd vidinsight
```

### 2. Installer les dépendances
```bash
pnpm install
```

### 3. Configuration des variables d'environnement
Créer un fichier `.env.local` basé sur `.env.example`:

```bash
cp .env.example .env.local
```

Remplir les variables requises:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Lancer le serveur de développement
```bash
pnpm dev
```

L'application sera disponible sur `http://localhost:3000`

## 📁 Structure du Projet

```
.
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # Routes API
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Accueil
├── components/            # Composants React
│   ├── ui/               # Composants UI (Radix)
│   └── *.tsx             # Composants métier
├── lib/                   # Utilitaires & services
│   ├── supabase/         # Client Supabase
│   ├── auth-context.tsx  # Contexte d'auth
│   ├── i18n.ts           # Traductions
│   └── types.ts          # Types TypeScript
├── styles/               # Fichiers CSS globaux
├── public/               # Assets statiques
└── hooks/                # React Hooks personnalisés
```

## 🔧 Commandes Disponibles

### Développement
```bash
pnpm dev          # Lancer le serveur de dev (port 3000)
pnpm build        # Build pour la production
pnpm start        # Lancer le serveur de prod
pnpm lint         # Vérifier le code avec ESLint
```

### Linting & Formatting
```bash
pnpm lint                                    # ESLint check
npx eslint . --fix                           # ESLint auto-fix
npx prettier --write .                       # Format avec Prettier
npx prettier --check .                       # Vérifier le format
```

## 🔐 Variables d'Environnement

### Requises
- `NEXT_PUBLIC_SUPABASE_URL`: URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clé publique Supabase

### Optionnelles
- `NEXT_PUBLIC_ANALYTICS_ID`: ID Google Analytics
- `STRIPE_SECRET_KEY`: Clé secrète Stripe (paiements)
- `OPENAI_API_KEY`: Clé API OpenAI
- `ANTHROPIC_API_KEY`: Clé API Anthropic

## 🔄 Authentification

Le projet utilise Supabase Auth avec:
- Email/Password
- Google OAuth (configurable)
- GitHub OAuth (configurable)

Les utilisateurs sont automatiquement créés dans la table `profiles` via un trigger Supabase.

## 🗄️ Base de Données

### Tables principales
- `profiles`: Profils utilisateurs
- `analyses`: Historique des analyses vidéo
- `subscriptions`: Plans d'abonnement (optionnel)

Voir `SUPABASE_SETUP.md` pour le setup détaillé.

## 🌐 Internationalisation

Les langues supportées:
- 🇫🇷 Français (défaut)
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇩🇪 Allemand

Gérer les traductions dans `lib/i18n.ts`.

## 🎨 Thème

Le projet supporte deux thèmes:
- Dark (défaut)
- Light

Gérer les thèmes via le composant ThemeProvider et `lib/theme-context.tsx`.

## ⚡ Performance

- Code splitting automatique avec Next.js
- Lazy loading des images
- Optimisation des paquets Radix UI
- Rate limiting côté serveur
- Compression des assets

## 🧪 Tests

Les tests unitaires et d'intégration peuvent être ajoutés avec:
- Jest
- React Testing Library
- Cypress (E2E)

## 📚 Documentation Supplémentaire

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Configuration Supabase
- [ANALYSIS.md](./ANALYSIS.md) - Points d'amélioration du projet
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contribution

1. Créer une branche (`git checkout -b feature/amazing-feature`)
2. Commit les changements (`git commit -m 'Add amazing feature'`)
3. Push vers la branche (`git push origin feature/amazing-feature`)
4. Ouvrir une Pull Request

### Standards de Code
- ESLint/Prettier doivent passer
- TypeScript strict mode
- Tests pour les nouvelles fonctionnalités
- Pas de `console.log` en production
- Pas de `any` types

## 📝 License

À définir

## 👨‍💻 Support

Pour les questions ou problèmes:
1. Vérifier la [documentation](./SUPABASE_SETUP.md)
2. Ouvrir une issue
3. Contacter l'équipe support

## 🚢 Déploiement

### Vercel (recommandé)
```bash
vercel
```

### Docker
```bash
docker build -t vidinsight .
docker run -p 3000:3000 vidinsight
```

Assurez-vous que toutes les variables d'environnement sont configurées dans la plateforme de déploiement.

---

**Développé avec ❤️ pour les créateurs de contenu YouTube**
