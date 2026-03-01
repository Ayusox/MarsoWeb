# Guía de Configuración — GitHub Pages con despliegue por etiquetas

## ¿Qué vamos a conseguir?

**Separar completamente los cambios de código del despliegue a producción.**

Hasta ahora: cualquier `git push` a la rama `archivedtrue` actualiza el sitio web en vivo **inmediatamente**. Esto significa que un error, un cambio no probado, o un merge accidental pueden romper el sitio públicamente.

Después de esta configuración: **el sitio solo se actualiza cuando creas una etiqueta de versión** (por ejemplo, `v0.1.0`). Los cambios en `archivedtrue` simplemente se quedan en desarrollo.

---

## Requisitos previos

- Acceso de administrador al repositorio de GitHub `Ayusox/MarsoWeb`
- El archivo `.github/workflows/deploy.yml` ya debe estar en la rama principal

---

## Paso 1 — Cambiar la fuente de GitHub Pages

1. Ve a https://github.com/Ayusox/MarsoWeb/settings/pages (o: Settings → Pages)
2. Desplázate hasta la sección **"Build and deployment"**
3. En la lista desplegable **"Source"**, cambia de `Deploy from a branch` a `GitHub Actions`

   ![Después de cambiar, debería decir: "Source: GitHub Actions"]

4. Haz clic en **Save**

⚠️ **Cambio inmediato:** A partir de este momento, el sitio en vivo **ya no** se actualiza automáticamente cuando haces push a `archivedtrue`.

---

## Paso 2 — Conceder permisos de escritura a GitHub Actions

1. Ve a https://github.com/Ayusox/MarsoWeb/settings/actions (o: Settings → Actions → General)
2. Desplázate hasta **"Workflow permissions"**
3. Selecciona **"Read and write permissions"**
4. Opcionalmente, marca "Allow GitHub Actions to create and approve pull requests" (no es necesario para esta configuración)
5. Haz clic en **Save**

Esto permite que el workflow de despliegue use el token de GitHub para publicar en GitHub Pages.

---

## Paso 3 — Verificar que el workflow está registrado

1. Ve a https://github.com/Ayusox/MarsoWeb/actions (o: Actions en la barra superior)
2. En la lista izquierda, deberías ver un workflow llamado **"Deploy to GitHub Pages"**
3. Si no aparece:
   - Espera unos segundos y recarga la página
   - Verifica que el archivo `.github/workflows/deploy.yml` esté en la rama `archivedtrue`

---

## Paso 4 — Prueba final

Ahora haremos una prueba para asegurar que todo funciona.

### 4a. Crear la rama de release
```bash
git checkout archivedtrue
git pull origin archivedtrue
git checkout -b releases/0.1
git push origin releases/0.1
```

### 4b. Crear la etiqueta de versión y desplegar
```bash
git tag -a v0.1.0 -m "Release v0.1.0: primera versión públicada"
git push origin v0.1.0
```

### 4c. Verificar el despliegue
1. Ve a https://github.com/Ayusox/MarsoWeb/actions
2. Deberías ver un nuevo "run" con el título **"Deploy to GitHub Pages"** en la parte superior
3. Espera a que el workflow termine (suele tardar menos de 1 minuto)
4. Cuando esté **verde (✓)**, el sitio se ha actualizado correctamente
5. Abre tu sitio web (https://ayusox.github.io/MarsoWeb/) y confirma que se ve bien

---

## Paso 5 — Prueba de que main no dispara despliegues

Ahora verifica que un simple push a `archivedtrue` **no** activa el workflow.

```bash
# Estando en releases/0.1, vuelve a main
git checkout archivedtrue

# Haz un cambio pequeño (por ejemplo, un comentario en el README)
echo "# Test" >> test.txt
git add test.txt
git commit -m "Test: verificar que main no dispara deploy"
git push origin archivedtrue
```

1. Ve a https://github.com/Ayusox/MarsoWeb/actions
2. **No debería haber un nuevo run de "Deploy to GitHub Pages"**
3. Si hay un run nuevo, algo está mal en la configuración

---

## ✅ Configuración completada

Una vez hayas completado estos 5 pasos, tu flujo de trabajo está listo:

- ✓ GitHub Pages se actualiza **solo** cuando se crea una etiqueta `v#.#.#`
- ✓ Los pushes a `archivedtrue` no tocan el sitio en vivo
- ✓ El workflow valida automáticamente que las etiquetas sigan el formato correcto

**Siguiente paso:** lee la **Guía de Flujo de Trabajo** (`docs/guia-flujo-trabajo.md`) para aprender cómo crear releases, hacer hotfixes, y trabajar día a día.
