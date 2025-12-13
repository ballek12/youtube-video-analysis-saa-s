# Guide de Contribution

Merci d'être intéressé par la contribution à VidInsight ! Ce document vous guide à travers le processus de contribution.

## 📋 Code de Conduite

Nous nous engageons à fournir un environnement accueillant à tous, indépendamment du sexe, de l'identité de genre, de l'âge, des origines ethniques, de la religion, ou du niveau d'expérience.

## 🚀 Comment Contribuer

### 1. Rapporter des Bugs

Avant de signaler un bug:
- Vérifiez que le problème ne soit pas déjà signalé
- Fournissez des informations détaillées et reproductibles
- Incluez des traces de pile si applicable

**Template de rapport de bug:**
```markdown
**Description:** Une description claire et concise du bug

**Étapes pour reproduire:**
1. ...
2. ...
3. ...

**Comportement attendu:**
Décrivez le comportement attendu

**Captures d'écran/Logs:**
Ajoutez des captures si possible
```

### 2. Proposer des Améliorations

**Template pour les améliorations:**
```markdown
**Description:** Description claire de l'amélioration

**Motivation:** Pourquoi cette améliorations est nécessaire?

**Solution proposée:** Votre idée de solution

**Alternatives envisagées:** Autres approches possibles
```

### 3. Soumettre du Code

#### Setup du Développement

1. **Fork le repository**
```bash
gh repo fork <username>/vidinsight
```

2. **Cloner votre fork**
```bash
git clone https://github.com/your-username/vidinsight.git
cd vidinsight
```

3. **Créer une branche**
```bash
git checkout -b feature/ma-nouvelle-feature
```

4. **Installer les dépendances**
```bash
pnpm install
```

5. **Lancer le serveur de dev**
```bash
pnpm dev
```

#### Standards de Code

##### TypeScript
- ✅ **Obligatoire**: Strict mode TypeScript
- ✅ **Obligatoire**: Pas de `any` types
- ✅ **Recommandé**: Types explicites pour les fonctions publiques

```typescript
// ❌ Mauvais
function fetchData(id: any): any {
  // ...
}

// ✅ Bon
function fetchData(id: string): Promise<UserData> {
  // ...
}
```

##### React & Components

- ✅ Utiliser des components fonctionnels avec Hooks
- ✅ Mémoriser les composants si nécessaire (`React.memo`)
- ✅ Utiliser des clés appropriées (pas d'indices)
- ✅ Éviter les side effects dans le rendu

```typescript
// ❌ Mauvais
<div key={index} />

// ✅ Bon
<div key={`item-${item.id}`} />
```

##### Nommage

- **Components**: PascalCase (ex: `UserProfile`)
- **Fichiers composants**: PascalCase (ex: `UserProfile.tsx`)
- **Utilitaires/Fonctions**: camelCase (ex: `getUserData`)
- **Fichiers utilitaires**: kebab-case (ex: `user-utils.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_USERS`)

##### Styling

- Utiliser Tailwind CSS pour les styles
- Pas de CSS-in-JS inline
- Préférer les classes Tailwind plutôt que `style={{}}``

```typescript
// ❌ Mauvais
<div style={{ color: 'red', fontSize: '16px' }} />

// ✅ Bon
<div className="text-red-500 text-base" />
```

#### Tests

- Ajouter des tests pour les nouvelles fonctionnalités
- Assurer que tous les tests passent

```bash
pnpm test
```

#### Linting & Formatting

Le code doit être formaté et linter avant commit:

```bash
# Vérifier ESLint
pnpm lint

# Corriger automatiquement
npx eslint . --fix

# Formater avec Prettier
npx prettier --write .
```

#### Messages de Commit

Suivre le format Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types autorisés:**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Changements de documentation
- `style`: Changements de style (Prettier, ESLint)
- `refactor`: Refactoring sans changement de fonctionnalité
- `perf`: Optimisations de performance
- `test`: Ajout/modification de tests
- `chore`: Tâches de maintenance

**Exemples:**
```
feat(auth): add two-factor authentication
fix(ui): correct button alignment on mobile
docs(readme): update installation instructions
style: format code with prettier
```

### 4. Pull Request

#### Checklist avant de soumettre

- [ ] Votre code suit les standards du projet
- [ ] Vous avez testé localement
- [ ] ESLint et Prettier passent
- [ ] Les tests passent (si applicable)
- [ ] La documentation est à jour
- [ ] Les messages de commit sont clairs
- [ ] Pas de fichiers non pertinents ajoutés

#### Template de PR

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Changement cassant
- [ ] Mise à jour de documentation

## Issues Liées
Ferme #(numéro du ticket)

## Changements
- Point 1
- Point 2
- Point 3

## Tests
Description des tests ajoutés/modifiés

## Screenshots (si applicable)
Ajouter des captures d'écran

## Checklist
- [ ] Mon code suit les styles du projet
- [ ] J'ai revu mes propres changements
- [ ] J'ai commenté mon code (si complexe)
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne créent pas de nouveaux warnings
```

## 🎯 Axes d'Amélioration Prioritaires

Voir [ANALYSIS.md](./ANALYSIS.md) pour la liste complète des points à améliorer.

### Priorité 1 (Critique)
- Corrections de configuration
- Améliorations de sécurité
- Corrections de types TypeScript

### Priorité 2 (Important)
- Améliorations d'UX/gestion d'erreurs
- Performance
- Documentation

### Priorité 3 (Recommandé)
- Features supplémentaires
- Tests
- Optimisations

## 📚 Ressources Utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Supabase Documentation](https://supabase.com/docs)

## ❓ Questions?

- Ouvrez une Discussion sur GitHub
- Contactez les mainteneurs
- Consultez la documentation

## 📝 License

En contribuant, vous acceptez que vos contributions soient licensées sous la même license que le projet.

---

**Merci pour votre contribution! 🎉**
