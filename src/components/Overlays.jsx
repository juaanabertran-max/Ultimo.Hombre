import { Icon, Micro } from './ui.jsx';

export function PaySheet({ p }) {
  return (
    <div className="overlay">
      <div className="sheet up" role="dialog" aria-modal="true" aria-label="pago con mercado pago">
        <div className="rb">
          <span className="idx">// mercado pago · simulación</span>
          <button className="ib" aria-label="cerrar" onClick={p.close}><Icon name="close" size={20} /></button>
        </div>
        <p className="ley">{p.concepto}</p>
        <p className="dk" style={{ fontSize: 54 }}>{p.monto}</p>
        <p className="ley" style={{ fontSize: 12 }}>incluye el cargo por servicio. el pago lo procesa Mercado Pago: tu tarjeta no queda guardada en último hombre.</p>
        {p.nota && <p className="ley ink" style={{ fontSize: 13 }}>{p.nota}</p>}
        <div className="cd rb" style={{ padding: '14px 16px', background: 'var(--surface)' }}>
          <span className="bx" style={{ fontSize: 14 }}>dinero en cuenta</span>
          <span className="idx">medio de pago de prueba</span>
        </div>
        {p.proc ? (
          <div className="btn s" role="status" style={{ cursor: 'default' }}>
            <Micro name="ciclo" size={18} color="#bce04b" width={1.6} style={{ animation: 'uhSpin .9s linear infinite' }} />
            procesando el pago
          </div>
        ) : (
          <button className="btn" onClick={p.go}>pagar {p.monto}</button>
        )}
      </div>
    </div>
  );
}

export function CeldaSheet({ c }) {
  return (
    <div className="overlay">
      <div className="sheet up" role="dialog" aria-modal="true" aria-label="horario de la agenda">
        <div className="rb g8">
          <span className="idx">// {c.titulo}</span>
          <button className="ib" aria-label="cerrar" onClick={c.cerrar}><Icon name="close" size={20} /></button>
        </div>
        {c.est === 'libre' && (
          <div className="col g14">
            <div className="rb base"><p className="ds" style={{ fontSize: 24 }}>horario libre</p><span className="bx" style={{ fontSize: 15 }}>{c.precio}</span></div>
            <div>
              <label className="lbl" htmlFor="uh-manual">¿a nombre de quién?</label>
              <input id="uh-manual" className="inp" value={c.mNombre} onChange={c.setMNombre} placeholder="ej: Gastón, el de los martes" />
            </div>
            <button className="btn" onClick={c.cargar}>cargar reserva manual</button>
            <button className="btn s" onClick={c.bloquear}>bloquear horario</button>
          </div>
        )}
        {c.est === 'app' && (
          <div className="col">
            <p className="ds" style={{ fontSize: 24, paddingBottom: 6 }}>reservado por app</p>
            <div className="row ln"><span className="ley">organiza (alias)</span><span className="bx" style={{ fontSize: 14 }}>{c.org}</span></div>
            <div className="row ln"><span className="ley">teléfono</span><span style={{ fontSize: 14 }}>{c.tel}</span></div>
            <div className="row ln"><span className="ley">jugadores</span><span style={{ fontSize: 14 }}>{c.jug}</span></div>
            <div className="row ln"><span className="ley">pago</span><span style={{ fontSize: 14 }}>{c.pago}</span></div>
            <p className="ley" style={{ fontSize: 12, paddingTop: 8 }}>los datos de quien reservó quedan en la plataforma: si no viene, lo marcás desde reservas.</p>
          </div>
        )}
        {c.est === 'manual' && (
          <div className="col g12">
            <p className="ds" style={{ fontSize: 24 }}>reserva manual</p>
            <div className="col">
              <div className="row ln"><span className="ley">a nombre de</span><span className="bx" style={{ fontSize: 14 }}>{c.org}</span></div>
              <div className="row ln"><span className="ley">pago</span><span style={{ fontSize: 14 }}>{c.pago}</span></div>
            </div>
            <button className="btn s" onClick={c.liberar}>liberar horario</button>
          </div>
        )}
        {c.est === 'bloqueado' && (
          <div className="col g12">
            <p className="ds" style={{ fontSize: 24 }}>horario bloqueado</p>
            <p className="ley">{c.motivo}. no aparece en la app.</p>
            <button className="btn s" onClick={c.liberar}>desbloquear</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Notif({ n }) {
  return (
    <div className="notif in" role="status">
      <span className="bx" style={{ width: 38, height: 38, flex: 'none', background: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{n.ini}</span>
      <div className="col g2 min0" style={{ flex: 1 }}>
        <span className="bx" style={{ fontSize: 14, lineHeight: '18px' }}>{n.titulo}</span>
        <span style={{ fontSize: 12, lineHeight: '16px', fontStyle: 'italic' }}>{n.sub}</span>
      </div>
      <button className="ib" style={{ color: 'var(--on-accent)' }} aria-label="ver el partido" onClick={n.ver}><Icon name="next" size={22} /></button>
    </div>
  );
}

export function Toast({ txt }) {
  return (
    <div className="toast up" role="status">
      <Micro name="anillos" size={18} color="#bce04b" style={{ flex: 'none' }} />
      <span style={{ fontSize: 14, lineHeight: '19px', fontStyle: 'italic' }}>{txt}</span>
    </div>
  );
}
