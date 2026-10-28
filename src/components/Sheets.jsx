// Hojas que suben desde abajo: quitar a un jugador, bloquear/reportar, bajarse, privacidad y legales.
import { Icon, Chips, Micro } from './ui.jsx';
import { DAYS, CX, hoursUntil } from '../logic/data.js';

function Sheet({ label, onClose, children }) {
  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet up" role="dialog" aria-modal="true" aria-label={label}>
        <div className="rb">
          <span className="idx">// {label}</span>
          <button className="ib" aria-label="cerrar" onClick={onClose}><Icon name="close" size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

const MOTIVOS_Q = ['nivel distinto', 'posición', 'otro'];
const MOTIVOS_R = ['no vino', 'mala conducta', 'agresión o insultos', 'otro'];

export default function Sheets({ app, vm }) {
  const S = app.state;
  const sh = S.sheet;
  const close = () => app.setState({ sheet: null });
  const set = (p) => app.setState({ sheet: { ...sh, ...p } });

  switch (sh.type) {
    case 'quitar':
      return (
        <Sheet label="quitar del partido" onClose={close}>
          <h2 className="dk" style={{ fontSize: 34 }}>¿QUITAR A {sh.n.toUpperCase()}?</h2>
          <ul className="col g8" style={{ margin: 0, paddingLeft: 18 }}>
            <li className="ley ink">le devolvemos el pago completo, automáticamente.</li>
            <li className="ley ink">no afecta su reputación.</li>
            <li className="ley ink">el lugar vuelve a quedar publicado.</li>
          </ul>
          <div className="col g6">
            <span className="idx">lo que le llega a {sh.n}:</span>
            <p className="quote">“el organizador completó el equipo de otra forma. ya te devolvimos tu pago y hay otros partidos cerca que te necesitan.”</p>
          </div>
          <div className="col g8">
            <span className="lbl" style={{ margin: 0 }}>motivo <span className="ley" style={{ fontSize: 12 }}>(opcional y privado: {sh.n} no lo ve)</span></span>
            <div className="wrap"><Chips items={MOTIVOS_Q.map((m) => ({ label: m, on: sh.motivo === m, pick: () => set({ motivo: sh.motivo === m ? null : m }) }))} /></div>
          </div>
          <button className="btn" onClick={() => app.confirmarQuitar()}>quitar del partido</button>
          <button className="btn s" onClick={close}>cancelar</button>
        </Sheet>
      );

    case 'jugador':
      return (
        <Sheet label={sh.n} onClose={close}>
          <button className="btn s" onClick={() => app.bloquear(sh.n)}>bloquear a {sh.n}</button>
          <p className="ley" style={{ fontSize: 12 }}>no van a coincidir en partidos que publiquen y no ven sus perfiles. {sh.n} no se entera.</p>
          <button className="btn s" onClick={() => app.setState({ sheet: { type: 'reportar', n: sh.n, motivo: null, texto: '' } })}>reportar a {sh.n}</button>
          <p className="ley" style={{ fontSize: 12 }}>lo revisa una persona del equipo. el reporte es confidencial.</p>
        </Sheet>
      );

    case 'reportar':
      return (
        <Sheet label={`reportar a ${sh.n}`} onClose={close}>
          <span className="lbl" style={{ margin: 0 }}>¿qué pasó?</span>
          <div className="wrap"><Chips items={MOTIVOS_R.map((m) => ({ label: m, on: sh.motivo === m, pick: () => set({ motivo: m }) }))} /></div>
          <label className="lbl" htmlFor="uh-rep" style={{ margin: 0 }}>contanos un poco más <span className="ley" style={{ fontSize: 12 }}>(opcional)</span></label>
          <textarea id="uh-rep" className="inp" rows={3} value={sh.texto} onChange={(e) => set({ texto: e.target.value })} />
          <button className="btn" disabled={!sh.motivo} onClick={() => app.enviarReporte()}>enviar reporte</button>
        </Sheet>
      );

    case 'reportarCalif':
      return (
        <Sheet label="calificación injusta" onClose={close}>
          <p className="ley ink">si creés que una calificación no refleja lo que pasó, contanos. la revisamos y, si corresponde, no cuenta para tu reputación.</p>
          <label className="lbl" htmlFor="uh-rc" style={{ margin: 0 }}>¿qué partido y qué pasó?</label>
          <textarea id="uh-rc" className="inp" rows={4} value={sh.texto} onChange={(e) => set({ texto: e.target.value })} placeholder="ej: el jueves 8 llegué a horario y me marcaron tarde" />
          <button className="btn" disabled={!sh.texto.trim()} onClick={() => app.enviarReporte()}>enviar</button>
        </Sheet>
      );

    case 'baja': {
      const m = app.match(S.selMatch);
      if (!m) return null;
      const hrs = hoursUntil(m.d, m.h);
      const afecta = hrs <= 6;
      return (
        <Sheet label="no puedo ir" onClose={close}>
          <h2 className="dk" style={{ fontSize: 40 }}>¿TE BAJÁS?</h2>
          <p className="cd ley ink" style={{ padding: '12px 14px' }}>si cancelás con más de 6 horas de anticipación no afecta tu reputación.</p>
          <p className="ley ink">
            {afecta
              ? `faltan menos de 6 h para el partido: si te bajás ahora, baja tu asistencia (quedarías en ${app.asis(1)}%).`
              : `faltan ${Math.floor(hrs)} h para el partido (${DAYS[m.d].largo} · ${m.h} h en ${CX[m.cx].nombre}). si te bajás ahora, tu reputación no cambia.`}
          </p>
          {m.rol === 'org' && <p className="ley" style={{ fontSize: 13 }}>sos quien organiza: la cancha sigue reservada y avisamos al grupo al toque.</p>}
          <button className="btn" onClick={close}>me quedo, voy</button>
          <button className="btn s" onClick={() => app.confirmBaja()}>me bajo</button>
        </Sheet>
      );
    }

    case 'datos': {
      const P = S.perfil;
      const filas = [
        ['alias', P.alias], ['mail', P.mail || '—'], ['celular', P.tel || '—'], ['fecha de nacimiento', P.nac || '—'],
        ['posición', P.pos || 'sin completar'], ['nivel', P.nivel || 'sin completar'], ['zona', P.zona],
        ['foto de perfil', P.foto ? 'sí' : 'no'], ['partidos en tu historial', String(S.historial.length)],
      ];
      return (
        <Sheet label="mis datos" onClose={close}>
          <p className="ley ink">esto es todo lo que guardamos de vos:</p>
          <div className="col">{filas.map(([a, b]) => <div key={a} className="row ln"><span className="ley">{a}</span><span className="bx" style={{ fontSize: 14, textAlign: 'right' }}>{b}</span></div>)}</div>
          <p className="ley" style={{ fontSize: 12 }}>no te pedimos DNI ni género porque no los necesitamos. tu tarjeta la guarda Mercado Pago, no nosotros.</p>
        </Sheet>
      );
    }

    case 'eliminar':
      return (
        <Sheet label="eliminar mi cuenta" onClose={close}>
          <h2 className="dk" style={{ fontSize: 34 }}>¿ELIMINAR TU CUENTA?</h2>
          <p className="ley ink">se elimina a los 30 días, con tus datos e historial. si entrás antes, se cancela. las reservas pagas que tengas siguen su curso.</p>
          <button className="btn s" onClick={() => app.eliminarCuenta()}>sí, eliminar mi cuenta</button>
          <button className="btn" onClick={close}>mejor no</button>
        </Sheet>
      );

    case 'politica':
    case 'terminos':
    case 'terminosC': {
      const titulo = { politica: 'política de privacidad', terminos: 'términos y condiciones', terminosC: 'términos para complejos' }[sh.type];
      const puntos = {
        politica: [
          'usamos tu mail y tu teléfono para tu cuenta y tus reservas.',
          'los pagos los procesa Mercado Pago: nunca guardamos tu tarjeta.',
          'no vendemos tus datos ni se los pasamos a nadie para publicidad.',
          'entre jugadores se ve un perfil mínimo. tu teléfono aparece recién cuando el partido está confirmado.',
          'podés ver, descargar, corregir o eliminar tus datos desde configuración > privacidad.',
        ],
        terminos: [
          'tenés que ser mayor de 18 para usar la app.',
          'el cargo por servicio (6%, iva incluido) se ve siempre antes de pagar.',
          'si cancelás con más de 6 h de anticipación, no afecta tu reputación.',
          'las calificaciones son sobre conducta, nunca sobre habilidad.',
        ],
        terminosC: [
          'los datos de los jugadores solo se usan para gestionar sus reservas, no para publicidad propia.',
          'la comisión es del 4% + iva sobre lo cobrado por la app (complejo pionero: 0%, 2% y después 4%).',
          'las reservas por app se cobran en tu cuenta de Mercado Pago vinculada al CUIT.',
        ],
      }[sh.type];
      return (
        <Sheet label={titulo} onClose={close}>
          <p className="ley">resumen en criollo. el texto legal completo va en este mismo lugar.</p>
          <ul className="col g10" style={{ margin: 0, paddingLeft: 18 }}>{puntos.map((p) => <li key={p} className="ley ink">{p}</li>)}</ul>
          <p className="ley" style={{ fontSize: 12 }}>dudas: privacidad@ultimohombre.com.ar</p>
          <button className="btn" onClick={close}>entendido</button>
        </Sheet>
      );
    }

    case 'mp':
      return (
        <Sheet label="mercado pago · simulación" onClose={close}>
          <h2 className="ds" style={{ fontSize: 24 }}>vinculá tu cuenta de cobro</h2>
          <p className="ley ink">vas a autorizar a último hombre a acreditar las reservas en tu cuenta de Mercado Pago. tiene que estar a nombre del CUIT {S.rc.cuit || 'del complejo'}.</p>
          <div className="cd col g4" style={{ padding: 14 }}><span className="idx">titular</span><span className="bx">{S.rc.razon || 'razón social del complejo'}</span><span className="idx">CUIT {S.rc.cuit || '—'}</span></div>
          <button className="btn" onClick={() => { app.setRC({ mp: true }); app.setState({ sheet: null }); app.toast('cuenta de Mercado Pago vinculada.'); }}>autorizar</button>
        </Sheet>
      );

    case 'olvide':
      return (
        <Sheet label="recuperar contraseña" onClose={close}>
          <p className="ley ink">poné tu mail y te mandamos un link para crear una contraseña nueva.</p>
          <label className="lbl" htmlFor="uh-olv" style={{ margin: 0 }}>mail</label>
          <input id="uh-olv" className="inp" type="email" value={sh.mail || ''} onChange={(e) => set({ mail: e.target.value })} autoComplete="email" />
          <button className="btn" disabled={!/^\S+@\S+\.\S+$/.test(sh.mail || '')} onClick={() => { close(); app.toast('listo. revisá tu mail (y spam, por las dudas).'); }}>mandar link</button>
        </Sheet>
      );

    default:
      return null;
  }
}

export { Micro };
