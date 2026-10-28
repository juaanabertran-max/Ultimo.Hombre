// Solo para la presentación: NO es parte de la app. Simula iniciar sesión con cada tipo de cuenta.
export default function DemoPanel({ app, formDemo }) {
  return (
    <aside className="demo" aria-label="panel de demo, no es parte de la app">
      <span className="idx demo-t">// demo · no es parte de la app</span>
      <button className="btn s" onClick={() => app.demoJugador()}>entrar como Facu (jugador)</button>
      <button className="btn s" onClick={() => app.demoComplejo()}>entrar como North Champ (complejo)</button>
      {formDemo && <button className="btn" onClick={() => app.demoFill()}>completar con datos de ejemplo</button>}
      <button className="ib" style={{ justifyContent: 'flex-start' }} onClick={() => app.reiniciar()}><span className="idx">reiniciar demo</span></button>
      <div className="creds col g6 ln" style={{ paddingTop: 10 }}>
        <span className="idx">cuentas para «ingresar»</span>
        <span className="ley" style={{ fontSize: 12 }}>jugador: facu@mail.com · Futbol123</span>
        <span className="ley" style={{ fontSize: 12 }}>complejo: hola@northchamp.com.ar · Cancha2026</span>
        <span className="ley" style={{ fontSize: 12 }}>códigos de verificación: cualquier número de 6 cifras</span>
      </div>
    </aside>
  );
}
