# Guide de travail collaboratif avec Git

Une fois le dépôt Git créé et partagé, chaque stagiaire doit suivre les étapes suivantes pour pouvoir travailler sur le projet.

## 1. Installer Git

Si Git n'est pas encore installé sur votre machine, téléchargez-le depuis :

- https://git-scm.com/downloads

Vérifiez ensuite l'installation :

```bash
git --version
```

---

## 2. Obtenir les droits d'accès

Demandez à l'administrateur du projet de vous ajouter comme collaborateur afin d'avoir les droits de lecture et d'écriture sur le dépôt.

---

## 3. Cloner le dépôt

Clonez le dépôt sur votre ordinateur :

```bash
git clone <URL_DU_DEPOT>
```

Exemple :

```bash
git clone https://github.com/axproo/StageManager.git
```

---

## 4. Se placer dans le projet

```bash
cd projet
```

---

## 5. Créer une branche personnelle

Ne travaillez jamais directement sur la branche principale (`main`).

Créez votre propre branche :

```bash
git checkout -b prenom-nom
```

Exemple :

```bash
git checkout -b alice
```

---

## 6. Travailler sur le projet

Modifiez les fichiers, ajoutez vos fonctionnalités ou corrigez les bugs.

---

## 7. Enregistrer les modifications

Ajoutez les fichiers modifiés :

```bash
git add .
```

Puis créez un commit :

```bash
git commit -m "Description des modifications"
```

Exemple :

```bash
git commit -m "Ajout de la page de connexion"
```

---

## 8. Récupérer les dernières modifications

Avant d'envoyer votre travail, mettez votre dépôt à jour :

```bash
git pull origin main
```

> Remplacez `main` par `master` si votre dépôt utilise encore cette branche.

Résolvez les éventuels conflits avant de continuer.

---

## 9. Envoyer votre travail

Poussez votre branche sur le dépôt distant :

```bash
git push origin prenom-nom
```

---

## 10. Créer une Pull Request

Depuis GitHub (ou GitLab), créez une **Pull Request** (ou **Merge Request**) afin de proposer vos modifications.

Votre travail pourra alors être relu avant d'être fusionné dans la branche principale.

---

# Bonnes pratiques

- Toujours effectuer un `git pull` avant de commencer à travailler.
- Travailler uniquement sur une branche personnelle.
- Faire des commits réguliers avec des messages explicites.
- Tester son code avant de l'envoyer.
- Résoudre les conflits avant de créer une Pull Request.
- Ne jamais travailler directement sur la branche `main`.
- Ne jamais écraser le travail d'un autre stagiaire.

---

# Résumé des commandes

```bash
# Cloner le dépôt
git clone <URL_DU_DEPOT>

# Entrer dans le projet
cd projet

# Créer une branche
git checkout -b prenom-nom

# Ajouter les modifications
git add .

# Créer un commit
git commit -m "Description des modifications"

# Mettre à jour le projet
git pull origin main

# Envoyer son travail
git push origin prenom-nom
```

---

# Workflow

```text
Créer une branche
        │
        ▼
Modifier le code
        │
        ▼
git add .
        │
        ▼
git commit
        │
        ▼
git pull origin main
        │
        ▼
Résoudre les conflits (si nécessaire)
        │
        ▼
git push origin prenom-nom
        │
        ▼
Créer une Pull Request
        │
        ▼
Validation et fusion dans main
```