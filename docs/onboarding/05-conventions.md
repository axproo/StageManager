# Conventions de développement

## Objectif

Tous les développeurs doivent produire un code homogène et maintenable.

---

# Langue

Le code est rédigé en anglais.

Les commentaires peuvent être rédigés en français lorsque cela est nécessaire.

---

# Nommage des fichiers

## Composants

Utiliser le **PascalCase**.

Exemples :

```text
BaseButton.vue
UserCard.vue
InternForm.vue
DepartmentTable.vue
```

---

## Pages

```text
DashboardView.vue
LoginView.vue
InternsView.vue
UsersView.vue
```

---

## Composables

```text
useAuth.ts
useApi.ts
useToast.ts
usePagination.ts
```

---

## Stores

```text
auth.store.ts
user.store.ts
intern.store.ts
department.store.ts
```

---

## Services

```text
auth.service.ts
user.service.ts
intern.service.ts
department.service.ts
```

---

# Variables

Utiliser le **camelCase**.

```ts
const currentUser
const selectedDepartment
const isAuthenticated
```

---

# Classes

Utiliser le **PascalCase**.

```ts
class UserService
class ApiClient
```

---

# Constantes

Utiliser le **UPPER_SNAKE_CASE**.

```ts
API_URL
MAX_FILE_SIZE
DEFAULT_LANGUAGE
```

---

# Dossiers

Utiliser le **kebab-case**.

```text
user-management
shared-components
```

---

# Bonnes pratiques

* Une fonction = une responsabilité.
* Un composant = une responsabilité.
* Éviter la duplication de code.
* Privilégier la réutilisation.
* Supprimer le code inutilisé.
* Corriger les avertissements avant de créer une Pull Request.
