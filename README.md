# Último Hombre · prototipo

Prototipo navegable de la app de Último Hombre (Vite + React). Nunca te quedes sin jugar.

## Qué tiene

**Sesión y registro**
- Splash con el logo animado, bienvenida con foto y tagline, «Ingresar» (mail + contraseña, recuperar contraseña, Google/Apple simulados) y «Crear cuenta».
- Al crear cuenta se elige una sola vez «Soy jugador» o «Tengo un complejo». Cada tipo de cuenta ve solo su parte de la app: no hay botón para pasar de un lado al otro.
- Registro de jugador en 5 pasos: alias + fecha de nacimiento (18+), mail y celular verificados con código, contraseña con requisitos en vivo, perfil futbolero opcional y privacidad (obligatorios separados, opcionales sin tildar).
- Registro de complejo en 6 pasos: datos + mapa, responsable, contraseña, verificación (CUIT, habilitación, Mercado Pago), canchas y términos. Termina en «en revisión» con un botón para simular la aprobación.

**Jugador:** home, reservar con galería, checkout con el cargo siempre visible, publicar lugares (posición, nivel, categoría, torneo, revisar o aceptar automático), revisar a quien se suma (perfil mínimo, confirmar o quitar con reglas de 3 h), sumarse a partidos (el organizador confirma o te devuelve todo), bloquear y reportar, «no puedo ir» con la regla de 6 h, calificación ciega de conducta, perfil con reputación y configuración de privacidad.

**Complejo (North Champ):** panel con horas muertas, agenda en tiempo real, reservas con datos mínimos y no-show, cobros con «complejo pionero» y perfil verificado.

## Privacidad desde el diseño
- No se pide DNI ni género. Femenino/mixto/masculino es categoría del partido.
- Opcionales (ubicación, notificaciones, publicidad, foto, posición, nivel) con casillas sin tildar y editables desde Configuración > Privacidad.
- Entre jugadores se ve alias, posición, nivel y reputación; foto y teléfono recién con el partido confirmado.
- Sin cuentas regresivas ni urgencias falsas. La publicidad siempre dice «Publicidad».

## Panel de demo
Fuera del teléfono hay un panel **Demo** (no es parte de la app) con:
- «Entrar como Facu (jugador)» y «Entrar como North Champ (complejo)».
- «Completar con datos de ejemplo» cuando estás en un formulario de registro o de ingreso.
- «Reiniciar demo».

Cuentas para probar «Ingresar»: `facu@mail.com` / `Futbol123` (jugador) y `hola@northchamp.com.ar` / `Cancha2026` (complejo). Los códigos de verificación aceptan cualquier número de 6 cifras.

Todo vive en memoria: al recargar la página vuelve al inicio.

## Correrlo en tu compu
```bash
npm install
npm run dev
```

## Actualizar Vercel
Subí el contenido de esta carpeta al repo de GitHub (Add file → Upload files, reemplazando los archivos). Vercel publica la nueva versión solo.

## Estructura
```
src/
  logic/data.js            datos de ejemplo, precios y reglas
  logic/view.js            lo que muestra cada pantalla de la app
  logic/viewAuth.js        validaciones de ingreso y registro
  logic/actions*.js        acciones de sesión, jugador y complejo
  App.jsx                  estado, navegación y capas
  screens/auth/            splash, bienvenida, ingresar, registros
  screens/jugador/         pantallas del jugador
  screens/complejo/        pantallas del complejo
  components/              íconos, fotos, formularios, hojas y panel de demo
public/img/                fotos con el duotono de la marca (fuentes en CREDITOS.md)
public/fonts/              Helvetica y Ashcroft del design system
```

## Ojo con las fuentes
Ashcroft es una versión de prueba y Helvetica es paga: antes de difundir el link abiertamente, chequeá las licencias.
