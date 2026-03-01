# Guía de Protección — Rama principal con requisitos de revisión

## ¿Qué vamos a conseguir?

Evitar que cualquiera (incluso tú) pueda hacer push directo a `archivedtrue` sin revisión. **Todos los cambios deben pasar por un Pull Request y ser revisados** antes de mergear.

Beneficios:
- ✓ Evita cambios accidentales en main
- ✓ Asegura que alguien revise cada cambio antes de publicar
- ✓ Previene que pushes defectuosos quiebren el flujo de deploy
- ✓ Mantiene un historial claro de cambios aprobados

---

## Requisitos

- Ser administrador del repositorio `Ayusox/MarsoWeb`
- Si trabajas en equipo, tener al menos una persona más que actúe como revisor

---

## Paso 1 — Acceder a configuración de rama protegida

1. Ve a https://github.com/Ayusox/MarsoWeb/settings/branches
2. Haz clic en **"Add rule"** (o **"New branch protection rule"**)

---

## Paso 2 — Especificar la rama a proteger

En el campo **"Branch name pattern"**:
- Escribe: `archivedtrue`
- Esto protege exactamente esa rama (no es un patrón, es el nombre exacto)

Haz clic en **Create** (o continúa a los siguientes pasos si aún no termina el formulario).

---

## Paso 3 — Activar protecciones (obligatorias)

### 3a. Requerir Pull Requests antes de mergear

Marca la opción **"Require a pull request before merging"**

Luego marca la sub-opción:
- ✓ **"Require approvals"** — selecciona **1** (al menos una persona debe revisar)

Si trabajas solo inicialmente y después tendrás equipo, puedes dejar en 1. Si ya tienes equipo, considera 2 para mayor rigidez.

### 3b. Descartar revisiones obsoletas (recomendado)

Marca **"Dismiss stale pull request approvals when new commits are pushed"**

Esto significa: si alguien aprueba el PR y luego haces un commit nuevo, la aprobación anterior se descarta y necesita una nueva revisión. Evita aprobaciones "obsoletas".

### 3c. Requerir que los cambios solicitados se hayan resuelto (recomendado)

Marca **"Require resolution of conversations before merging"**

Esto asegura que todos los comentarios/conversaciones en el PR estén resueltos antes de mergear.

---

## Paso 4 — Descartar las opciones innecesarias (para este caso)

Deja **sin marcar** (o opcional según tu equipo):

- ❌ "Require status checks to pass before merging"
  - *Nota: puedes marcarlo si añades GitHub Actions checks, pero para este caso no es obligatorio*
- ❌ "Require branches to be up to date before merging"
  - *Opcional: ayuda a evitar conflictos, pero ralentiza un poco*
- ❌ "Require signed commits"
  - *Opcional: solo si tienes firma GPG configurada*
- ❌ "Require code reviews from code owners"
  - *No necesario si no tienes CODEOWNERS file*

---

## Paso 5 — Quien puede saltarse las restricciones (administrador)

En la sección **"Allow force pushes"** y **"Allow deletions"**:

Deja ambas sin marcar. Esto significa:
- ❌ Nadie puede hacer force push a `archivedtrue`
- ❌ Nadie puede borrar `archivedtrue`

Esto protege incluso contra accidentes de administradores.

---

## Paso 6 — Guardar la regla

Haz clic en **"Create"** o **"Save changes"** al final de la página.

GitHub debería mostrar un mensaje de confirmación: ✓ "Branch rule created"

---

## Resultado final

Tu configuración debería verse así en https://github.com/Ayusox/MarsoWeb/settings/branches:

```
Branch protection rules

Rule name: archivedtrue
├─ Require a pull request before merging
│  └─ Require approvals: 1
├─ Dismiss stale pull request approvals when new commits are pushed
├─ Require resolution of conversations before merging
└─ (No force push, no deletions)
```

---

## Cómo fluye ahora el trabajo

### ❌ Ya NO puedes hacer esto:

```bash
# Esto ahora fallará:
git checkout archivedtrue
git commit -m "quick fix"
git push origin archivedtrue
# Error: This branch is protected. You must create a Pull Request.
```

### ✅ Ahora debes hacer esto:

```bash
# 1. Crear una rama de feature
git checkout -b feat/my-feature

# 2. Hacer cambios y commits
git add index.html
git commit -m "Update hero section"
git push origin feat/my-feature

# 3. Abrir un PR en GitHub (aparecerá un botón automáticamente)
# - Ve a https://github.com/Ayusox/MarsoWeb/pulls
# - Haz clic en "New pull request"
# - Base: archivedtrue, Compare: feat/my-feature
# - Añade descripción si quieres
# - Haz clic en "Create pull request"

# 4. Esperar revisión (si trabajas solo, eres el revisor)
# - Haz clic en "Review changes"
# - Selecciona "Approve"
# - Haz clic en "Submit review"

# 5. Mergear el PR
# - Haz clic en "Merge pull request"
# - Haz clic en "Confirm merge"
# - GitHub automáticamente elimina la rama de feature (opcional)

# 6. En local, actualiza:
git checkout archivedtrue
git pull origin archivedtrue
git branch -d feat/my-feature  # elimina rama local
```

---

## Trabajar solo vs. en equipo

### Si trabajas solo:

Puedes hacer todo el flujo solo (crear rama, mergear con tu propia aprobación):
1. Feature branch → PR → Tu propria revisión (Approve) → Merge

Es un poco más lento, pero previene muchos errores accidentales. Es un buen trade-off.

### Si trabajas en equipo:

La rama protegida cobra sentido:
1. Alguien (A) abre un PR desde su feature branch
2. Otra persona (B) revisa y aprueba
3. A hace clic en Merge

---

## Troubleshooting

### P: ¿Cómo hago si necesito cambios urgentes y no hay reviewer disponible?

**R:** Las opciones son:
1. **Temporalmente desactiva la protección** (si eres admin):
   - Settings → Branches
   - Encuentra la regla `archivedtrue`
   - Haz clic en el botón de edición o eliminar
   - Apruébate a ti mismo el PR en espera
   - Reactiva la protección

2. **Usa una rama de release** (mejor):
   - Crea `releases/0.1` desde main
   - El cambio urgente va a `releases/0.1`
   - Tag y deploya desde ahí
   - Main se actualiza después (cuando haya reviewer)

### P: ¿Puedo hacer solo un commit directo a archivedtrue?

**R:** No, la protección bloquea todos los pushes directos sin PR. Incluso un commit "pequeño" debe ir por PR.

### P: ¿Qué pasa si mergeo un PR y luego me doy cuenta de que está mal?

**R:** Puedes:
1. Crear un nuevo PR revertiendo los cambios: `git revert <commit>`
2. O si es muy reciente, usar la opción de "Revert" en GitHub (botón en el PR mergeado)

### P: ¿Cómo veo si mi rama protegida está funcionando?

**R:** Intenta hacer push directo:
```bash
git checkout archivedtrue
echo "test" > test.txt
git add test.txt
git commit -m "test direct push"
git push origin archivedtrue

# Debería dar error: "protected branch"
```

Si ves ese error, ¡está funcionando! 🎉

---

## Interacción con el flujo de releases

La rama protegida **no interfiere** con tu flujo de releases:

```
archivedtrue (protegido — solo PRs)
    ↓ (cuando estés listo)

releases/0.1 (NO protegido — puedes pushear directo)
    ↓
    v0.1.0 (tag → despliegue automático)
```

Puntos clave:
- ✓ Los cambios a `archivedtrue` requieren PR + revisión
- ✓ Las ramas de release (`releases/0.X`) NO están protegidas — puedes commitear directamente
- ✓ Los tags en release branches disparan el despliegue como siempre

---

## ✅ Rama principal protegida

Una vez completado:
- ✓ Solo se pueden mergear cambios a `archivedtrue` a través de PRs
- ✓ Cada PR requiere al menos 1 aprobación
- ✓ Las aprobaciones se descartan si hay nuevos commits
- ✓ Todos los comentarios deben resolverse

Tu flujo ahora tiene una puerta de seguridad extra contra cambios accidentales. 🔐

---

## Referencia rápida: pasos en GitHub UI

1. Settings → Branches
2. Add rule → Branch name: `archivedtrue`
3. ✓ Require a pull request before merging
   - ✓ Require 1 approval
4. ✓ Dismiss stale pull request approvals
5. ✓ Require resolution of conversations
6. Create
