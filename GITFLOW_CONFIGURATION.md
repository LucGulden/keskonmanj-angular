# Configuration GitFlow pour GitHub Actions

## 🌳 Stratégie de branches

```
main (production)
  ↑
  └── develop (pré-production)
        ↑
        ├── feature/* (nouvelles fonctionnalités)
        └── hotfix/* (corrections urgentes)
```

### Règles de workflow :
- ✅ Push uniquement sur `feature/*` et `hotfix/*`
- ✅ PR de `feature/*` et `hotfix/*` vers `develop`
- ✅ PR de `develop` vers `main` uniquement
- ✅ Suppression automatique des branches après merge
- ✅ Protection de `main` et `develop` contre la suppression
- ✅ Tag des versions sur `main`

## 📋 Workflows créés

### 1. `ci.yml` - Pipeline CI/CD
S'exécute sur :
- Push vers `feature/*` et `hotfix/*`
- Pull requests vers `develop` et `main`

### 2. `deploy.yml` - Déploiement Production
S'exécute sur :
- Push vers `main`
- Tags de version (v*.*.*)

### 3. `validate-pr-source.yml` - Validation des PR
Vérifie que les PR vers `main` proviennent uniquement de `develop`

### 4. `cleanup-branches.yml` - Nettoyage automatique
Supprime automatiquement les branches `feature/*` et `hotfix/*` après merge

## 🔒 Configuration des règles de protection de branches

### Configuration pour la branche `main`

1. Allez dans **Settings** > **Branches** > **Add branch protection rule**

2. **Branch name pattern:** `main`

3. Activez les règles suivantes :

```
☑️ Require a pull request before merging
   ☑️ Require approvals: 1 (ou plus selon vos besoins)
   ☑️ Dismiss stale pull request approvals when new commits are pushed
   ☑️ Require review from Code Owners (optionnel)

☑️ Require status checks to pass before merging
   ☑️ Require branches to be up to date before merging
   Status checks requis :
   - build-and-test (Node 18.x)
   - build-and-test (Node 20.x)
   - check-source-branch

☑️ Require conversation resolution before merging

☑️ Require signed commits (optionnel mais recommandé)

☑️ Require linear history

☑️ Include administrators (force les règles même pour les admins)

☑️ Restrict who can push to matching branches
   - Ajouter uniquement : develop (ou laisser vide si vous voulez bloquer tous les push)

☑️ Allow force pushes: NON ❌
☑️ Allow deletions: NON ❌
```

### Configuration pour la branche `develop`

1. **Branch name pattern:** `develop`

2. Activez les règles suivantes :

```
☑️ Require a pull request before merging
   ☑️ Require approvals: 1
   ☑️ Dismiss stale pull request approvals when new commits are pushed

☑️ Require status checks to pass before merging
   ☑️ Require branches to be up to date before merging
   Status checks requis :
   - build-and-test (Node 18.x)
   - build-and-test (Node 20.x)

☑️ Require conversation resolution before merging

☑️ Require linear history (optionnel)

☑️ Include administrators

☑️ Allow force pushes: NON ❌
☑️ Allow deletions: NON ❌
```

## 🚀 Workflow de développement

### 1. Créer une nouvelle fonctionnalité

```bash
# Depuis develop
git checkout develop
git pull origin develop

# Créer une branche feature
git checkout -b feature/nom-de-la-feature

# Développer et committer
git add .
git commit -m "feat: description de la fonctionnalité"

# Pousser la branche
git push origin feature/nom-de-la-feature
```

### 2. Créer une PR vers develop

```bash
# Sur GitHub, créer une PR de feature/nom-de-la-feature vers develop
# Les workflows CI s'exécutent automatiquement
# Après review et approbation, merger la PR
# La branche feature/* est automatiquement supprimée
```

### 3. Créer un hotfix

```bash
# Depuis main (pour un hotfix urgent)
git checkout main
git pull origin main

# Créer une branche hotfix
git checkout -b hotfix/correction-critique

# Corriger et committer
git add .
git commit -m "fix: correction du bug critique"

# Pousser la branche
git push origin hotfix/correction-critique

# Créer une PR vers develop
# Après merge, la branche est automatiquement supprimée
```

### 4. Livrer une version en production

```bash
# Créer une PR de develop vers main sur GitHub
# Le workflow validate-pr-source vérifie que la source est bien develop
# Après approbation et merge :

git checkout main
git pull origin main

# Créer un tag de version
git tag -a v1.2.3 -m "Version 1.2.3 - Description des changements"
git push origin v1.2.3

# Le workflow de déploiement s'exécute automatiquement
```

## 🏷️ Convention de nommage des tags

Utilisez le versioning sémantique (SemVer) :

```
v<MAJOR>.<MINOR>.<PATCH>

Exemples :
- v1.0.0 - Première version stable
- v1.1.0 - Nouvelles fonctionnalités (rétro-compatible)
- v1.1.1 - Corrections de bugs
- v2.0.0 - Changements majeurs (breaking changes)
```

## 🔍 Vérification de la configuration

### Checklist de configuration

- [ ] Règles de protection créées pour `main`
- [ ] Règles de protection créées pour `develop`
- [ ] Status checks configurés dans les règles de protection
- [ ] Suppression des branches désactivée pour `main` et `develop`
- [ ] Force push désactivé pour `main` et `develop`
- [ ] Workflows GitHub Actions copiés dans `.github/workflows/`
- [ ] Premier push d'une branche `feature/*` pour tester

### Tester la configuration

```bash
# Test 1 : Créer une feature branch
git checkout -b feature/test-workflow
git push origin feature/test-workflow
# ✅ Le workflow CI doit s'exécuter

# Test 2 : Créer une PR vers develop
# ✅ Le workflow CI doit s'exécuter sur la PR

# Test 3 : Merger la PR
# ✅ La branche feature/test-workflow doit être automatiquement supprimée

# Test 4 : Essayer de push directement sur develop (doit échouer)
git checkout develop
git push origin develop
# ❌ Doit être rejeté par les règles de protection

# Test 5 : Créer une PR de feature vers main (doit échouer)
# ❌ Le workflow validate-pr-source doit échouer
```

## 🎯 Commandes Git utiles

```bash
# Voir toutes les branches
git branch -a

# Voir les branches distantes
git branch -r

# Supprimer une branche locale
git branch -d feature/nom-de-la-branche

# Voir les tags
git tag -l

# Supprimer un tag local
git tag -d v1.0.0

# Supprimer un tag distant
git push origin --delete v1.0.0

# Voir l'historique avec les branches
git log --oneline --graph --all --decorate
```

## 📊 Badges pour votre README

```markdown
![CI/CD Pipeline](https://github.com/votre-username/votre-repo/workflows/CI%2FCD%20Pipeline/badge.svg)
![Deploy](https://github.com/votre-username/votre-repo/workflows/Deploy%20to%20Production/badge.svg)
![Branch Protection](https://img.shields.io/badge/branches-protected-green)
![GitFlow](https://img.shields.io/badge/workflow-GitFlow-blue)
```

## 🛠️ Personnalisation avancée

### Ajouter des reviewers obligatoires

Dans les règles de protection, activez "Require review from Code Owners" et créez un fichier `.github/CODEOWNERS` :

```
# Chaque ligne est un pattern de fichier suivi des reviewers

# Reviewers par défaut
* @votre-username @autre-reviewer

# Reviewers spécifiques pour certains dossiers
/src/app/core/ @lead-dev
/src/app/shared/ @team-frontend
```

### Ajouter des labels automatiques

Créez `.github/workflows/label-pr.yml` :

```yaml
name: Label PRs

on:
  pull_request:
    types: [ opened, reopened ]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
    - name: Label feature PRs
      if: startsWith(github.head_ref, 'feature/')
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            labels: ['feature', 'enhancement']
          })
    
    - name: Label hotfix PRs
      if: startsWith(github.head_ref, 'hotfix/')
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            labels: ['hotfix', 'bug']
          })
```

## 🐛 Résolution des problèmes

### La branche n'est pas supprimée automatiquement

- Vérifiez que le workflow `cleanup-branches.yml` a les permissions nécessaires
- Dans Settings > Actions > General > Workflow permissions, activez "Read and write permissions"

### Impossible de créer une PR de feature vers main

- C'est normal ! Le workflow `validate-pr-source.yml` bloque cette action
- Vous devez merger feature → develop → main

### Le status check n'apparaît pas dans les règles de protection

- Attendez qu'au moins une PR exécute le workflow
- Les status checks n'apparaissent qu'après leur première exécution

## 📚 Ressources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)