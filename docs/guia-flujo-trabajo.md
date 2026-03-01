# Guía de Flujo de Trabajo — Releases con ramas y etiquetas

## Resumen: el modelo de ramas

```
archivedtrue (rama principal de desarrollo)
    ↑
    ↓ (cuando tienes features listas para publicar)

releases/0.1 (rama de release para versión 0.1.x)
    ↓
    v0.1.0 → Despliegue a producción ✓
    v0.1.1 → Hotfix despliegue       ✓

releases/0.2 (rama de release para versión 0.2.x)
    ↓
    v0.2.0 → Despliegue a producción ✓
```

**Regla de oro:** El sitio en vivo **solo se actualiza** cuando haces push de una etiqueta `v#.#.#`.

---

## Convención de nombres

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Rama principal | `archivedtrue` | (la rama "main") |
| Feature branches | `feat/descripcion` | `feat/new-hero-section` |
| Release branches | `releases/X.Y` | `releases/0.1`, `releases/1.0` |
| Etiquetas | `vX.Y.Z` | `v0.1.0`, `v0.2.1` |

---

## Flujo de trabajo diario (sin despliegues)

### Crear una feature branch

```bash
# Desde archivedtrue, crea una rama nueva
git checkout archivedtrue
git pull origin archivedtrue
git checkout -b feat/new-hero-section

# Ahora edita los archivos
# (index.html, styles.css, script.js, etc.)
```

### Trabajar en la rama (commits y pushes)

```bash
# Edita archivos
# (abre index.html en un editor, haz cambios, guarda)

# Prueba localmente
python3 -m http.server 8080
# Abre http://localhost:8080 en tu navegador

# Cuando estés satisfecho
git add index.html styles.css script.js
git commit -m "feat: update hero section with new copy"
git push origin feat/new-hero-section
```

### Hacer PR y mergear a main

```bash
# Ve a GitHub: https://github.com/Ayusox/MarsoWeb/pulls
# 1. Abre un Pull Request de feat/new-hero-section → archivedtrue
# 2. Revisa los cambios (GitHub muestra el diff)
# 3. Haz clic en "Merge pull request"
# 4. Confirma el merge

# En local
git checkout archivedtrue
git pull origin archivedtrue
```

**Nota importante:** El sitio web en vivo **NO cambió** durante todo esto. Estamos solo en development.

---

## Crear un nuevo release (publicar versión)

Usa esto cuando tienes un conjunto de features listas y quieres publicarlas.

### Escenario: primera release (v0.1.0)

```bash
# 1. Asegúrate de estar en main y actualizado
git checkout archivedtrue
git pull origin archivedtrue

# 2. Crea la rama de release
git checkout -b releases/0.1
git push origin releases/0.1

# 3. Crea la etiqueta (esto es lo que desencadena el despliegue)
git tag -a v0.1.0 -m "Release v0.1.0: initial public release"
git push origin v0.1.0

# ← En este momento, GitHub Actions comienza a desplegar ↓

# 4. Verifica el despliegue
# Abre: https://github.com/Ayusox/MarsoWeb/actions
# Espera a que el workflow "Deploy to GitHub Pages" esté verde ✓
# Luego, abre https://ayusox.github.io/MarsoWeb/ y confirma que se vea bien
```

**Tiempo estimado:** menos de 1 minuto desde push hasta que el sitio se actualice.

### Escenario: siguiente release (v0.2.0)

```bash
# 1. Desde main (que ahora tiene más features que releases/0.1)
git checkout archivedtrue
git pull origin archivedtrue

# 2. Crea una nueva rama de release
git checkout -b releases/0.2
git push origin releases/0.2

# 3. Tag y push
git tag -a v0.2.0 -m "Release v0.2.0: add catalog videos"
git push origin v0.2.0

# 4. Verifica en Actions (GitHub)
```

---

## Hotfix — corregir un error en producción

Aquí es donde las ramas de release brillan. Si encuentras un error en `v0.1.0`, lo corriges **solo en esa rama**, sin afectar el trabajo en main.

### Escenario: error en v0.1.0, necesita hotfix

```bash
# 1. Checkout la rama de release que tiene el error
git checkout releases/0.1

# 2. Haz el cambio (edita el archivo)
# (por ejemplo, corrige un enlace de WhatsApp)

# 3. Commit y push
git add index.html
git commit -m "fix: correct WhatsApp phone number"
git push origin releases/0.1

# 4. Tag la versión patch (X.Y.Z+1)
git tag -a v0.1.1 -m "Hotfix v0.1.1: fix WhatsApp number"
git push origin v0.1.1

# ← Despliegue iniciado ↓
```

### Ahora llevar el fix a main

Para que el fix no se pierda, hay que traerlo a `archivedtrue`:

```bash
# Obtén el hash del commit del hotfix
git log releases/0.1 -1 --oneline
# Ejemplo output: a1b2c3d fix: correct WhatsApp phone number

# Ve a main y cherry-pick el commit
git checkout archivedtrue
git pull origin archivedtrue
git cherry-pick a1b2c3d
git push origin archivedtrue
```

**Después:** el próximo release (`v0.2.0`) incluirá automáticamente ese fix.

---

## Tabla de referencia: versiones y cuándo subirlas

Usa **semantic versioning** (`vMAJOR.MINOR.PATCH`):

| Tipo de cambio | Ejemplo | Acción |
|---|---|---|
| Corrección de typos, cambios de texto | "Error en nombre del producto" | `v0.1.0 → v0.1.1` (PATCH) |
| Nueva sección, nueva funcionalidad | "Agregar sección de testimonios" | `v0.1.x → v0.2.0` (MINOR) |
| Rediseño visual completo | "Cambiar tema de colores, layout" | `v0.x.x → v1.0.0` (MAJOR) |

---

## Ver el historial de releases

### En la línea de comandos

```bash
# Ver todas las etiquetas
git tag --list

# Ver detalles de una etiqueta específica
git show v0.1.0

# Ver el log de la rama releases/0.1
git log releases/0.1 --oneline
```

### En GitHub

1. Ve a https://github.com/Ayusox/MarsoWeb/releases
2. Aquí aparecerán todas tus etiquetas con información de release
3. Haz clic en una etiqueta para ver detalles (puedes editar la descripción)

---

## Referencia rápida: comandos más usados

```bash
# Crear y publicar un release
git checkout -b releases/0.1 && git push origin releases/0.1
git tag -a v0.1.0 -m "Release v0.1.0" && git push origin v0.1.0

# Hacer un hotfix
git checkout releases/0.1
# edita archivo
git add . && git commit -m "fix: descripción"
git push origin releases/0.1
git tag -a v0.1.1 -m "Hotfix v0.1.1" && git push origin v0.1.1
# llevar a main
git checkout archivedtrue && git pull && git cherry-pick <hash> && git push

# Ver releases
git tag --list
git log releases/0.1 --oneline
```

---

## Troubleshooting

### P: Hice push a archivedtrue pero el sitio no se actualizó. ¿Qué está mal?

**R:** Es lo esperado. El sitio solo se actualiza con etiquetas. Para publicar, debes:
1. Crear una rama de release: `git checkout -b releases/0.X`
2. Crear una etiqueta: `git tag -a v0.X.Y -m "Release v0.X.Y"`
3. Hacer push de la etiqueta: `git push origin v0.X.Y`

### P: ¿Puedo hacer varios releases desde la misma rama (releases/0.1)?

**R:** Sí, para hotfixes. Por ejemplo: `v0.1.0`, `v0.1.1`, `v0.1.2` — todas en `releases/0.1`. Cuando haya un conjunto importante de nuevas features, crea `releases/0.2` y usa `v0.2.0`.

### P: ¿Qué pasa si accidentalmente creo una etiqueta malformada?

**R:** El workflow validará automáticamente el formato. Si no es `vX.Y.Z`, el workflow fallará con un mensaje claro. Simplemente borra la etiqueta:
```bash
git tag -d v0.1.0   # local
git push origin :v0.1.0  # remote
```

### P: ¿Necesito crear un PR para hacer un release?

**R:** No. Las ramas de release no necesitan PRs. Simplemente crea la rama desde main, y luego el commit/tag en esa rama. (Pero si prefieres un PR para documentación, puedes hacerlo.)

---

## ✓ Resumen

1. **Main (`archivedtrue`) es para desarrollo** — nunca se publica automáticamente
2. **Release branches (`releases/0.X`) son para versiones** — crealás cuando algo está listo
3. **Tags (`v0.X.Y`) desencadenan despliegues** — es lo único que toca producción
4. **Hotfixes van en la rama de release** — y luego se llevan a main con cherry-pick

¡Ahora tienes un flujo seguro donde no puedes romper el sitio con un push accidental! 🎉
