# StageManager — Version A (conforme Sprint 0 / Sprint 1 / Sprint 2)

Plateforme de gestion des stages et des stagiaires. Front-end **Vite + Vue 3
(Composition API / `<script setup>`) + TypeScript + Tailwind CSS v4 + Vue Router
+ Pinia**, frontend mock-driven (aucun backend réel) avec ESLint + Prettier configurés.

---

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrir **http://localhost:5173**.

```bash
npm run build     # build de production (vue-tsc + vite build)
npm run preview   # prévisualiser le build
npm run lint       # ESLint avec correction automatique
npm run format      # Prettier
```

## 👤 Comptes de démonstration (mot de passe : `password`)

| Rôle | Email |
|---|---|
| Administrateur | sana.bensalah@stagemanager.tn |
| Responsable Stage | mehdi.gharbi@stagemanager.tn |
| Tuteur / Encadrant | ahmed.benali@stagemanager.tn (ou sonia.trabelsi@...) |
| Stagiaire | jean.dupont@stagemanager.tn (ou hela.belghith@...) |

Le compte `karim.jlassi@stagemanager.tn` est volontairement **désactivé** pour tester le blocage de connexion.

---

## A. Sprint 0 — corrections apportées

| Point du Sprint 0 | État avant | Correction |
|---|---|---|
| `src/pages/` (ISSUE-009) | `src/views/` | Renommé en `pages/` |
| `components/ui/` (ISSUE-009) | Absent | Créé, contient `StatusBadge.vue`, `UserAvatar.vue` |
| `src/styles/` (ISSUE-009) | `style.css` à la racine de `src/` | Déplacé dans `src/styles/main.css` |
| `.gitkeep` dans dossiers vides (ISSUE-009) | Absent | Ajouté (`src/utils/.gitkeep`) |
| ESLint + Prettier (ISSUE-008) | Absent | Configurés (`eslint.config.js`, `.prettierrc.json`), 0 erreur/avertissement |
| Alias `@` (ISSUE-007) | Déjà présent | Conservé tel quel |
| Pinia (ISSUE-006) | Déjà présent | Conservé, étendu à 9 stores métier |

---

## B. Sprint 1 — statut des 15 issues

| Issue | Module | Statut | Fichiers principaux |
|---|---|---|---|
| 101 | Layout principal | ✅ | `layouts/AppLayout.vue`, `layouts/AuthLayout.vue` |
| 102 | Header | ✅ | `components/layout/AppHeader.vue` |
| 103 | Sidebar | ✅ (barre latérale fixe, filtrée par permission) | `components/layout/AppSidebar.vue` |
| 104 | Footer | ✅ | `components/layout/AppFooter.vue` |
| 105 | BaseButton | ✅ | `components/base/BaseButton.vue` |
| 106 | BaseInput | ✅ | `components/base/BaseInput.vue` |
| 107 | BaseCard | ✅ | `components/base/BaseCard.vue` |
| 108 | BaseModal | ✅ | `components/base/BaseModal.vue` |
| 109 | BaseTable | ✅ | `components/base/BaseTable.vue` |
| 110 | Vue Router | ✅ | `router/index.ts` |
| 111 | Navigation | ✅ (guards auth + permission, 3 niveaux : navigation/affichage/actions) | `router/index.ts`, `composables/usePermissions.ts` |
| 112 | Page Dashboard | ✅ (structure, contenu réel en 208) | `pages/dashboard/DashboardPage.vue` |
| 113 | Page Login | ✅ | `pages/auth/LoginPage.vue` |
| 114 | Page 404 | ✅ | `pages/common/NotFoundPage.vue` |
| 115 | Thème Tailwind | ✅ (clair/sombre, sobre et professionnel) | `styles/main.css` |

## C. Sprint 2 — statut des 12 issues

| Issue | Module | Statut | Fichiers principaux |
|---|---|---|---|
| 201 | Authentification | ✅ Login réel, session `sessionStorage`, blocage compte inactif, journalisation LOGIN/LOGOUT | `stores/auth.ts`, `services/authService.ts` |
| 202 | Gestion des utilisateurs | ✅ CRUD complet, réservé Admin | `pages/users/UsersPage.vue`, `services/userService.ts` |
| 203 | Gestion des rôles | ✅ CRUD + éditeur de permissions par module, protection des rôles système | `pages/roles/RolesPage.vue`, `services/roleService.ts` |
| 204 | Gestion des départements | ✅ CRUD, blocage suppression si membres | `pages/departments/DepartmentsPage.vue` |
| 205 | Gestion des stagiaires | ✅ Liste, filtres, fiche détail, affectation tuteur, scoping par rôle | `pages/stagiaires/*` |
| 206 | Gestion des présences | ✅ Saisie, consultation, historique, filtrage | `pages/presences/PresencesPage.vue` |
| 207 | Gestion des tâches | ✅ CRUD, liste filtrable (pas de Kanban — non nécessaire ici), scoping par rôle | `pages/taches/TachesPage.vue` |
| 208 | Tableau de bord (contenu) | ✅ 4 vues différenciées par rôle, calculées depuis les vraies données mock | `pages/dashboard/DashboardPage.vue` |
| 209 | Notifications | ✅ Cloche + panneau, liées à de vrais événements (tâche assignée, absence, affectation tuteur...) | `components/layout/AppHeader.vue`, `services/notificationService.ts` |
| 210 | Paramètres | ✅ Personnel (tous rôles) + global (Admin) | `pages/settings/SettingsPage.vue` |
| 211 | Recherche globale | ✅ Multi-entités, scoping par permission | `composables/useGlobalSearch.ts` |
| 212 | Journal d'activité | ✅ CREATE/UPDATE/DELETE/LOGIN/LOGOUT tracés, page dédiée Admin | `pages/activity-log/ActivityLogPage.vue`, `services/activityLogService.ts` |

---

## D. Architecture finale

```
src/
├── pages/            (auth, dashboard, users, roles, departments, stagiaires, presences, taches, settings, activity-log, common)
├── components/
│   ├── base/           BaseButton, BaseInput, BaseCard, BaseModal, BaseTable
│   ├── forms/            UserForm, RoleForm, DepartmentForm, StagiaireForm
│   ├── layout/             AppHeader, AppSidebar, AppFooter
│   └── ui/                   StatusBadge, UserAvatar
├── composables/         useI18n, usePermissions, useGlobalSearch
├── layouts/               AppLayout, AuthLayout
├── router/                 index.ts (guards permission)
├── services/                authService, userService, roleService, departmentService,
│                            stagiaireService, presenceService, taskService,
│                            notificationService, activityLogService, apiDelay
├── stores/                  auth, ui, users, catalog (roles+departments),
│                            stagiaires, presences, taches, notifications, activityLog
├── types/                    index.ts (toutes les interfaces)
├── mocks/                     users, roles, departments, stagiaires, presences,
│                              taches, notifications, activityLog (.json)
├── utils/                      (vide, .gitkeep — aucun besoin réel identifié)
└── styles/                      main.css
```

---

## E. Rôles et permissions (matrice finale implémentée)

| Module | Administrateur | Responsable Stage | Tuteur | Stagiaire |
|---|---|---|---|---|
| Utilisateurs | CRUD | Lecture | — | — |
| Rôles | CRUD | — | — | — |
| Départements | CRUD | Lecture | — | — |
| Stagiaires | CRUD | CRUD | Lecture + modif (les siens) | Lecture (le sien) |
| Présences | Lecture | CRU | CRU (ses stagiaires) | Lecture (les siennes) |
| Tâches | Lecture | Lecture | CRUD (ses stagiaires) | Lecture + statut (les siennes) |
| Dashboard | ✅ contenu propre | ✅ contenu propre | ✅ contenu propre | ✅ contenu propre |
| Notifications | Les siennes | Les siennes | Les siennes | Les siennes |
| Paramètres | Global + perso | Perso | Perso | Perso |
| Recherche | Tout | Scope Responsable | Scope Tuteur | Scope personnel |
| Journal d'activité | Lecture | — | — | — |

Ces permissions sont **réellement appliquées à 3 niveaux** : navigation (sidebar), guards de route (accès direct par URL bloqué), et actions (boutons conditionnés + vérification côté store/service).

---

## F. Tests effectués

- ✅ `npm run build` : 0 erreur TypeScript, 0 erreur Vite
- ✅ `npm run lint` : 0 erreur, 0 avertissement ESLint
- ✅ Serveur `npm run dev` : démarre et répond (HTTP 200)
- ✅ Login/logout : testés avec les 4 rôles + compte désactivé (bloqué)
- ✅ Permissions : accès direct par URL testé (ex: un Stagiaire tapant `/users` est redirigé)
- ✅ CRUD : utilisateurs, rôles, départements, stagiaires, tâches testés manuellement
- ✅ Filtres : stagiaires (département/statut), présences (stagiaire), tâches (statut), journal (action)
- ✅ Cohérence mock : toutes les clés étrangères (`tuteurId`, `departmentId`, `roleId`, `stagiaireId`...) pointent vers des enregistrements existants
- ✅ Responsive : layout testé en largeur réduite (sidebar masquée sous `md`)

---

## G. Éléments volontairement non ajoutés (hors contexte StageManager)

- Fiches PFE, conventions, soutenances, jury, notes académiques (ancien périmètre écarté)
- Calendrier académique, fonctionnalités RH avancées (paie, congés légaux), fonctionnalités financières
- 2FA (non repris — l'issue "Authentification" ne l'exige pas explicitement pour cette Version A)
- Vue Kanban pour les tâches (une liste filtrable suffisait, évite une complexité d'architecture non nécessaire)
- Backend réel / base de données (hors périmètre du frontend mock-driven actuel)

---

## Décisions prises sans blocage (anciens points 🟡 tranchés)

Conformément à la directive de développement, les décisions suivantes ont été prises directement,
dans l'esprit "cohérence > simplicité > réutilisabilité > esthétique" :
- Sidebar **fixe latérale** (plus adaptée à un outil de gestion métier qu'un menu coulissant)
- Thème **clair par défaut**, sombre disponible — visuel sobre et professionnel (pas de glassmorphism)
- Permissions **granulaires par action CRUD** (module:action), éditables via l'interface Rôles
- Journal d'activité réservé à l'Admin uniquement (le Tuteur n'y a pas accès dans cette version)
- Paramètres globaux : section minimale mais réellement présente et visible uniquement par l'Admin
- Recherche globale : porte sur utilisateurs, stagiaires, tâches, départements — scoping strict par permission

---

## Évolution 2 — Enrichissement (post-livraison zip v2)

### A. Résumé — ce qui a été ajouté/amélioré

- **Login** : nouveau design premium à deux colonnes (formulaire + panneau de branding), inspiré de la
  Version B, mais authentification **Version A inchangée** (email/mot de passe uniquement, pas de
  parcours par rôle académique). Logo AXPROO intégré.
- **Charte de couleurs** : bleu/vert alignés sur le logo AXPROO, appliqués de façon cohérente dans toute
  la plateforme (variables `--color-brand-*`, `--color-accent-green`).
- **Photo de profil** : upload avec aperçu (base64, mock frontend), réutilisée automatiquement dans
  Header, Sidebar, liste utilisateurs, fiche stagiaire — fallback sur les initiales si absente.
- **Dashboard professionnel** : KPI enrichis, mini-graphiques légers (barres, sparkline, jauge circulaire —
  aucune dépendance externe ajoutée), section Alertes, section Activité récente (Admin).
- **Dashboard Stagiaire dédié** : bloc "Mon stage" avec jauge de progression circulaire, jours
  écoulés/restants, pourcentage, infos (département, tuteur, modalité, dates).
- **Modalité de stage** : présentiel / distanciel / hybride, ajoutée au modèle `Stagiaire` et visible
  dans la liste, la fiche détail et le formulaire.
- **Pointage** : bouton "Pointer ma présence" pour le Stagiaire (avec choix du mode si pertinent),
  statistiques d'assiduité (taux de présence, absences, retards) réutilisées sur les 3 dashboards
  concernés via un composable unique.
- **Attestation de stage** : page imprimable générée quand le stage est `terminé`, journalisée dans le
  Journal d'activité.
- **Notifications intelligentes** : réutilisent le système existant (`notifyOnce`, sans doublon) —
  pointage manquant, stage bientôt terminé, tâche en retard.
- **Correction routeur** : simplification de la déclaration des routes racines (suppression d'une route
  `'/'` dupliquée et fragile), aucune URL existante modifiée.

### B. Fichiers modifiés/ajoutés (principaux)

`types/index.ts` (avatarUrl, modalite, mode), `styles/main.css` (couleurs), `pages/auth/LoginPage.vue`,
`components/layout/AppHeader.vue`, `components/layout/AppSidebar.vue`, `pages/settings/SettingsPage.vue`,
`components/ui/UserAvatar.vue`, `components/ui/CircularProgress.vue` (nouveau),
`components/ui/MiniBarChart.vue` (nouveau), `components/ui/SparklineBars.vue` (nouveau),
`composables/useStageProgress.ts` (nouveau), `composables/useAttendanceStats.ts` (nouveau),
`composables/useSmartNotifications.ts` (nouveau), `pages/dashboard/DashboardPage.vue` (réécrite),
`pages/presences/PresencesPage.vue` (pointage + stats), `pages/stagiaires/AttestationPage.vue` (nouveau),
`components/forms/StagiaireForm.vue` (modalité), `stores/activityLog.ts` (méthode `record`),
`services/notificationService.ts` (`notifyOnce`), `router/index.ts` (correction), `mocks/*.json`
(dates réalistes + nouveaux champs), `public/logo-axproo.png` (nouveau).

### C. Compatibilité Sprint

Toutes les 27 issues restent conformes — aucune n'a été supprimée ni régressée. Les ajouts sont
additifs à l'intérieur des issues existantes (ex: la jauge de progression enrichit ISSUE-208, elle ne
crée pas de nouvelle issue).

### D. Fonctionnalités métier — explication rapide

- **Dashboard** : contenu différent par rôle, calculé depuis les mêmes stores (pas de données dupliquées).
- **Durée du stage** : calcul centralisé dans `useStageProgress`, jamais recopié.
- **Pointage** : le Stagiaire crée sa propre présence du jour ; les autres rôles gardent leurs permissions
  de saisie existantes (Tuteur/Responsable), aucun rôle ne pointe pour un autre sans permission.
- **Absences** : dérivées des mêmes présences mockées via `useAttendanceStats`, affichées différemment
  selon le rôle (personnel/équipe/global).
- **Modalités** : champ `modalite` sur le stage, `mode` par présence pour les stages hybrides.
- **Photo** : mock frontend uniquement (base64), aucune gestion serveur.
- **Attestation** : simulation d'export imprimable, pas de signature électronique.
- **Notifications** : mêmes événements + 3 nouveaux, mêmes mécanismes, pas de second système.

### E. Tests

- `npm run build` : ✅ 0 erreur
- `npm run lint` : ✅ 0 erreur, 0 avertissement (après suppression d'une variable inutilisée)
- Serveur `npm run dev` : ✅ démarre, répond HTTP 200
- Smoke test manuel : login (4 rôles), navigation par permission, upload photo avec aperçu, pointage
  stagiaire (création + non-doublon si déjà pointé), dashboard des 4 rôles, attestation (stage terminé
  uniquement), notifications intelligentes visibles dans le panneau du header

---

## 🛠️ Dépannage — page blanche au démarrage

Si `npm run dev` s'exécute sans erreur visible dans le terminal mais que le navigateur
affiche une page **totalement blanche** :

### 1. Vérifiez votre version de Node.js (cause la plus fréquente)

```bash
node -v
```

Ce projet nécessite **Node.js ≥ 20.19 ou ≥ 22.12**. Une version plus ancienne peut faire
échouer le serveur de développement de façon silencieuse. Si votre version est trop
ancienne, installez la dernière version LTS depuis [nodejs.org](https://nodejs.org) et
relancez `npm install` puis `npm run dev`.

### 2. Regardez la console du navigateur (F12 → Console)

Depuis cette version, toute erreur de démarrage s'affiche désormais **directement à l'écran**
(message "StageManager n'a pas pu démarrer" avec le détail technique) au lieu d'une page
blanche silencieuse. Si vous voyez ce message, copiez le texte en rouge et partagez-le pour
un diagnostic précis.

### 3. Videz le cache du navigateur

`Ctrl+Shift+R` (rechargement forcé) — un ancien build en cache peut parfois persister.

### 4. Réinstallez proprement les dépendances

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 5. Vérifiez qu'aucune extension navigateur ne bloque `localhost`

Certains bloqueurs de publicité/traqueurs interfèrent avec les scripts de modules JS en
local. Essayez en navigation privée ou avec les extensions désactivées.
