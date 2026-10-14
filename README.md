# Último Hombre · prototipo

Prototipo navegable de la app de Último Hombre (Vite + React), con los dos lados:

- **Jugador:** onboarding, ficha, home, reservar cancha, checkout con Mercado Pago simulado, publicar lugares faltantes (a los 3,5 s se suma alguien), buscar partido / refuerzos para torneos, mis partidos y perfil con asistencia.
- **Complejo (North Champ):** panel con horas muertas, agenda en tiempo real, reservas con no-show, cobros con la comisión de complejo pionero y perfil del complejo.

El estado vive en memoria mientras dura la sesión: si reservás un turno como jugador, aparece en la agenda del complejo. Al recargar la página vuelve todo al inicio (también está el botón "reiniciar").

En la compu se muestra dentro de un marco de iPhone; en el celular ocupa toda la pantalla.

## Correrlo en tu compu

```bash
npm install
npm run dev
```

## Subirlo a Vercel

**Opción A: con GitHub (recomendada)**
1. Subí esta carpeta a un repositorio nuevo de GitHub.
2. En vercel.com → *Add New… → Project* → importá el repo.
3. Vercel detecta Vite solo (build `npm run build`, salida `dist`). Tocá *Deploy*.

**Opción B: desde la terminal**
```bash
npm i -g vercel
vercel        # la primera vez te pide loguearte y confirmar el proyecto
vercel --prod
```

## Estructura

```
src/
  logic/data.js      datos de ejemplo, precios y reglas (comisiones, promo, cargo por servicio)
  logic/view.js      arma lo que muestra cada pantalla a partir del estado
  App.jsx            estado, acciones y navegación
  screens/jugador/   pantallas del jugador
  screens/complejo/  pantallas del complejo
  components/        íconos, isologo, controles y avisos
  styles.css         tokens del design system y estilos
public/fonts/        Helvetica y Ashcroft del design system
```

## Ojo con las fuentes

`public/fonts` trae los archivos del design system. Ashcroft es una **versión de prueba** y Helvetica es una fuente paga: antes de publicar el link abiertamente, chequeá que las licencias permitan usarlas en la web (o activá *Deployment Protection* en Vercel para que sólo entren los que vos invites). Si sacás los archivos, la app sigue andando con las fuentes de respaldo.
