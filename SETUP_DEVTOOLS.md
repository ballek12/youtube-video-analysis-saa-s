# Configuration des Outils de Développement

Ce guide explique comment configurer les outils de développement pour VidInsight.

## 📦 Installation Globale (Optionnel)

Certains outils peuvent être installés globalement pour une intégration IDE meilleure:

```bash
# pnpm (recommandé)
npm install -g pnpm

# ESLint
npm install -g eslint

# Prettier
npm install -g prettier
```

## 🎯 Configuration VS Code

### Extensions Recommandées

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Intégration ESLint en temps réel
   - Auto-fix sur save

2. **Prettier** (`esbenp.prettier-vscode`)
   - Formatage du code
   - Intégration avec Prettier

3. **TypeScript Vue Plugin** (`Vue.vscode-typescript-vue-plugin`)
   - Support TypeScript avancé

4. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplétion des classes Tailwind
   - Préview des couleurs

5. **Thunder Client** ou **REST Client**
   - Pour tester les API

6. **GitLens** (`eamodio.gitlens`)
   - Informations Git améliorées

### Fichier `.vscode/settings.json`

Créer ou modifier `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "search.exclude": {
    "node_modules": true,
    ".next": true
  },
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true
  }
}
```

### Fichier `.vscode/extensions.json`

Créer `.vscode/extensions.json` pour les recommandations:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## 🐚 Configuration Shell

### Alias Utiles

Ajouter au `.bashrc` ou `.zshrc`:

```bash
# Alias pour VidInsight
alias vid:dev="cd ~/path/to/vidinsight && pnpm dev"
alias vid:lint="cd ~/path/to/vidinsight && pnpm lint"
alias vid:build="cd ~/path/to/vidinsight && pnpm build"
alias vid:fix="cd ~/path/to/vidinsight && pnpm lint --fix && npx prettier --write ."

# pnpm global
alias pn="pnpm"
alias pnd="pnpm dev"
alias pnb="pnpm build"
alias pnt="pnpm test"
alias pni="pnpm install"
```

### Git Hooks avec Husky

Les git hooks ont été configurés dans `.husky/`:

**Pre-commit** (`.husky/pre-commit`):
- ESLint check
- Prettier format check
- Auto-fix si nécessaire

**Commit-msg** (à ajouter si needed):
- Validation du format Conventional Commits

### Installation de Husky

```bash
# Installer Husky
pnpm add -D husky

# Initialiser
npx husky install

# Donner les permissions d'exécution aux hooks
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

## 🔄 Workflow de Développement

### 1. Avant de commencer

```bash
# Créer une nouvelle branche
git checkout -b feature/ma-feature

# S'assurer que tout est up-to-date
git pull origin main
pnpm install
```

### 2. Pendant le développement

```bash
# Lancer le serveur de dev
pnpm dev

# En parallèle, checker le code
pnpm lint

# Fix automatiquement les erreurs
pnpm lint --fix && npx prettier --write .
```

### 3. Avant de committer

```bash
# Vérifier les changements
git status
git diff

# Les hooks Git vont s'exécuter automatiquement
git add .
git commit -m "feat: description de la feature"
```

### 4. Avant la PR

```bash
# Build pour s'assurer que tout compile
pnpm build

# Run tests (si applicable)
pnpm test

# Push les changements
git push origin feature/ma-feature
```

## 📊 Vérifications Automatiques

### ESLint

```bash
# Vérifier
pnpm lint

# Auto-fix
pnpm lint --fix

# Avec rapport détaillé
pnpm lint -- --format=detailed
```

### Prettier

```bash
# Vérifier
npx prettier --check .

# Formater
npx prettier --write .

# Vérifier un fichier spécifique
npx prettier --check ./path/to/file.tsx
```

### TypeScript

```bash
# Vérifier les types
npx tsc --noEmit

# Vérifier avec strict mode
npx tsc --noEmit --strict
```

### Build

```bash
# Build production
pnpm build

# Démarrer le serveur de production
pnpm start
```

## 🆘 Troubleshooting

### Les hooks Git ne s'exécutent pas

```bash
# Donner les permissions d'exécution
chmod +x .husky/*

# Réinitialiser Husky
rm -rf .husky && npx husky install
```

### ESLint ne fixe pas automatiquement

```bash
# Vérifier la configuration
npx eslint . --debug

# Réinstaller ESLint
rm -rf node_modules/.cache/eslint-loader
pnpm install
```

### Prettier et ESLint en conflit

```bash
# Installer eslint-config-prettier
pnpm add -D eslint-config-prettier

# Ajouter à .eslintrc.js en dernier:
# "extends": [..., "prettier"]
```

## 📚 Ressources

- [ESLint Docs](https://eslint.org/docs/latest/)
- [Prettier Docs](https://prettier.io/docs/en/)
- [Husky Docs](https://typicode.github.io/husky/)
- [Commitlint Docs](https://commitlint.js.org/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## ✅ Checklist de Setup

- [ ] Cloner le repository
- [ ] Installer pnpm
- [ ] Lancer `pnpm install`
- [ ] Configurer VS Code (extensions + settings)
- [ ] Ajouter les alias shell (optionnel)
- [ ] Configurer Husky (`npx husky install`)
- [ ] Tester les hooks Git avec un commit
- [ ] Lancer `pnpm dev` et vérifier que tout fonctionne
- [ ] Lire [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Vous êtes prêt à contribuer! 🚀**
