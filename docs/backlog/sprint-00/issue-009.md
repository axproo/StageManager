# ISSUE-009 — Organiser l'architecture du projet

## Sprint

Sprint 00

---

## Objectif

Créer une structure de projet commune à toute l'équipe.

---

## Dépendances

* ISSUE-004
* ISSUE-005
* ISSUE-006
* ISSUE-007
* ISSUE-008

---

## Tâches

Créer l'arborescence suivante :

```text
src/
├── assets/
├── components/
│   ├── base/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── composables/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
├── types/
├── utils/
└── styles/
```

Supprimer les dossiers inutilisés.

Créer un fichier `.gitkeep` dans chaque dossier vide.

---

## Critères d'acceptation

* [ ] L'arborescence est conforme.
* [ ] Tous les dossiers sont présents.
* [ ] Aucun dossier inutile.

---

## Livrables

* Pull Request

---

## Validation

Validation par le Tech Lead.
