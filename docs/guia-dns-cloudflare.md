# Guía de Configuración — Dominio personalizado en GitHub Pages con Cloudflare

## ¿Qué vamos a conseguir?

Hacer que tu sitio de MarsoWeb sea accesible en tu dominio personalizado `marsodistribuciones.com` en lugar de la URL por defecto de GitHub Pages (`ayusox.github.io/MarsoWeb`).

Para ello, configuraremos:
1. **GitHub Pages** para aceptar tu dominio
2. **Cloudflare** (tu proveedor de DNS) para apuntar `marsodistribuciones.com` a GitHub Pages
3. **HTTPS/SSL** (automático en GitHub Pages)

---

## Requisitos

- Acceso de administrador al repositorio `Ayusox/MarsoWeb` en GitHub
- Acceso a la cuenta de Cloudflare donde está registrado `marsodistribuciones.com`
- El sitio ya debe estar funcionando en GitHub Pages (de la guía anterior)

---

## Parte 1 — Configurar el dominio en GitHub Pages

### Paso 1.1: Indicar el dominio en la configuración de Pages

1. Ve a https://github.com/Ayusox/MarsoWeb/settings/pages
2. Desplázate hasta **"Custom domain"** (cerca de arriba)
3. En el campo de texto, escribe: `marsodistribuciones.com`
4. Haz clic en **Save**

   GitHub creará automáticamente un archivo `CNAME` en el repositorio con tu dominio.

⚠️ **Nota:** En este momento probablemente verás un aviso de "DNS check pending" — es normal, lo arreglaremos en la parte 2.

### Paso 1.2: Esperar a que GitHub cree el archivo CNAME

GitHub debería haber creado un archivo llamado `CNAME` en la raíz del repositorio.

Verifica en local:
```bash
git pull origin archivedtrue
cat CNAME
# Debería mostrar: marsodistribuciones.com
```

Si ves el archivo `CNAME` en GitHub pero no en local, hazlo manualmente:
```bash
echo "marsodistribuciones.com" > CNAME
git add CNAME
git commit -m "Add custom domain CNAME"
git push origin archivedtrue
```

---

## Parte 2 — Configurar los registros DNS en Cloudflare

Ahora le indicamos a Cloudflare que tu dominio debe apuntar a GitHub Pages.

### Paso 2.1: Acceder a Cloudflare

1. Ve a https://dash.cloudflare.com
2. Inicia sesión en tu cuenta
3. Selecciona el dominio `marsodistribuciones.com`
4. En el menú izquierdo, haz clic en **DNS** → **Records**

### Paso 2.2: Crear o modificar registros DNS

GitHub Pages usa dos tipos de registros DNS. Elimina cualquier registro anterior que apunte a otro lugar y crea estos:

#### Opción A: Usando direcciones IP de GitHub (recomendado)

Añade 4 registros `A` que apunten a las IP de GitHub Pages:

| Type | Name | IPv4 Address | TTL | Proxy |
|------|------|--------------|-----|-------|
| A | `marsodistribuciones.com` | `185.199.108.153` | Auto | Proxied |
| A | `marsodistribuciones.com` | `185.199.109.153` | Auto | Proxied |
| A | `marsodistribuciones.com` | `185.199.110.153` | Auto | Proxied |
| A | `marsodistribuciones.com` | `185.199.111.153` | Auto | Proxied |

Pasos:
1. Haz clic en **+ Add record**
2. Selecciona **Type: A**
3. En **Name**, escribe `marsodistribuciones.com` (o déjalo vacío según tu panel)
4. En **IPv4 Address**, escribe la primera IP: `185.199.108.153`
5. Deja **TTL** en Auto
6. En **Proxy status**, selecciona **Proxied** (nube naranja)
7. Haz clic en **Save**
8. Repite para las otras 3 IPs

#### Opción B: Usando CNAME (alternativa, solo si la Opción A no funciona)

Si prefieres, puedes crear un registro `CNAME` en lugar de `A`:

| Type | Name | Target | TTL | Proxy |
|------|------|--------|-----|-------|
| CNAME | `www` | `ayusox.github.io` | Auto | Proxied |

Para esto:
1. **+ Add record**
2. **Type: CNAME**
3. **Name:** `www`
4. **Target:** `ayusox.github.io`
5. **TTL:** Auto
6. **Proxy status:** Proxied
7. **Save**

**Nota:** La Opción A (registros A) es más eficiente. Usa la Opción B solo si tienes problemas.

### Paso 2.3: Esperar a que se propague

Los cambios DNS tardan entre 5 minutos y 48 horas en propagarse globalmente. Típicamente:
- **Cloudflare:** 2-5 minutos
- **Otros ISPs:** hasta 24-48 horas

Mientras esperas, puedes pasar al siguiente paso.

---

## Parte 3 — Verificar HTTPS en GitHub Pages

### Paso 3.1: Habilitar HTTPS automático

Vuelve a https://github.com/Ayusox/MarsoWeb/settings/pages

Busca la opción **"Enforce HTTPS"** (cerca de donde pusiste el custom domain):
- Si está desmarcada, márcala
- GitHub debería mostrar un candado verde indicando que HTTPS está activo

**Nota:** A veces GitHub necesita unos minutos para emitir el certificado SSL después de configurar el dominio. Si no aparece la opción "Enforce HTTPS" todavía, espera 10-15 minutos.

---

## Parte 4 — Verificación final

### Verificación inmediata (local)

```bash
# Espera a que Cloudflare haya actualizado (5-10 minutos)
# Luego corre estos comandos:

# Ver los registros A que configuraste
dig marsodistribuciones.com A

# Ver que el CNAME apunta correctamente
dig marsodistribuciones.com CNAME

# Prueba de conectividad DNS
nslookup marsodistribuciones.com
```

Deberías ver las IPs de GitHub Pages o tu registro CNAME.

### Verificación en el navegador

1. Abre https://marsodistribuciones.com en tu navegador
2. Debería cargar tu sitio correctamente
3. Verifica que el candado 🔒 aparece en la barra de direcciones (HTTPS funcionando)

⚠️ **Si no funciona aún:**
- Espera más tiempo (la propagación DNS puede tardar hasta 48 horas)
- Vacía la caché del navegador: Ctrl+Shift+Delete (o Cmd+Shift+Delete en Mac)
- Prueba desde un navegador diferente o en incógnito
- Verifica que el archivo `CNAME` existe en el repositorio

### Verificación en GitHub

1. Ve a https://github.com/Ayusox/MarsoWeb/settings/pages
2. Bajo **"Custom domain"** debería decir **"marsodistribuciones.com"** ✓
3. Bajo **"HTTPS"** debería mostrar **"Enforce HTTPS"** marcado ✓
4. El aviso rojo de "DNS check pending" debería haber desaparecido

---

## Paso 5 (Opcional) — Configurar redirección www a sin-www

Si quieres que tanto `www.marsodistribuciones.com` como `marsodistribuciones.com` funcionen:

En Cloudflare, crea un registro CNAME adicional:

| Type | Name | Target | TTL | Proxy |
|------|------|--------|-----|-------|
| CNAME | `www` | `marsodistribuciones.com` | Auto | Proxied |

Esto hará que `www.marsodistribuciones.com` redirija a `marsodistribuciones.com`.

---

## Resumen de registros Cloudflare

Tu configuración final en Cloudflare debería verse así:

```
Type    Name                        Target / Value
────────────────────────────────────────────────────
A       marsodistribuciones.com     185.199.108.153      [Proxied]
A       marsodistribuciones.com     185.199.109.153      [Proxied]
A       marsodistribuciones.com     185.199.110.153      [Proxied]
A       marsodistribuciones.com     185.199.111.153      [Proxied]
CNAME   www                         marsodistribuciones.com [Proxied]
```

---

## Troubleshooting

### P: ¿Por qué GitHub dice "DNS check pending"?

**R:** Los registros DNS no se han propagado aún, o hay un error en la configuración. Verifica:
- Que los 4 registros A estén creados correctamente en Cloudflare
- Que apunten a las IPs exactas de GitHub Pages (sin espacios, sin typos)
- Espera 10-15 minutos y recarga la página de Settings

### P: Mi dominio antiguo aún funciona, ¿qué hago?

**R:** Si tenías otro proveedor DNS anterior:
1. Elimina los registros antiguos que apuntaban a otro lugar
2. Crea los nuevos registros A hacia GitHub Pages
3. Espera a que se propague (24-48 horas máximo)

### P: ¿Cómo sé si mi DNS está configurado correctamente?

**R:** Usa esta herramienta online para verificar: https://mxtoolbox.com/
- Escribe `marsodistribuciones.com`
- Haz clic en **DNS Lookup**
- Debería mostrar las 4 IPs de GitHub Pages

### P: ¿Por qué el certificado HTTPS no aparece?

**R:** A veces GitHub tarda 15-30 minutos en emitir el certificado SSL. Si pasada una hora aún no aparece:
1. Vuelve a https://github.com/Ayusox/MarsoWeb/settings/pages
2. Borra temporalmente el custom domain
3. Guarda (esto borra el archivo `CNAME`)
4. Espera 1 minuto
5. Vuelve a añadir `marsodistribuciones.com`
6. Guarda
7. Espera 15 minutos para que GitHub reemita el certificado

---

## ✅ Dominio configurado

Una vez que `marsodistribuciones.com` funcione en el navegador con HTTPS, todo está listo:

- ✓ Tu dominio personalizado apunta a GitHub Pages
- ✓ HTTPS está activado automáticamente
- ✓ Los usuarios pueden acceder a `https://marsodistribuciones.com`
- ✓ El archivo `CNAME` protege tu configuración

**Nota:** No necesitas hacer nada más cada vez que haces un despliegue. El dominio seguirá funcionando automáticamente.
