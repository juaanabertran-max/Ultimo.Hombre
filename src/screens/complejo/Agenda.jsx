import { Chips } from '../../components/ui.jsx';

const COLS = '40px repeat(3, minmax(0, 1fr))';

export default function Agenda({ vm }) {
  const a = vm.ag;
  return (
    <div className="col g16 pad">
      <div className="hdr"><span className="idx">// agenda en tiempo real</span></div>
      <h1 className="dk" style={{ fontSize: 50 }}>AGENDA</h1>
      <div className="hs"><Chips items={a.dias} /></div>
      <div className="wrap" style={{ gap: '8px 14px' }}>
        {[['app', 'por app'], ['manual', 'manual'], ['', 'libre'], ['bloqueado', 'bloqueado']].map(([c, l]) => (
          <span key={l} className="wrap g6" style={{ alignItems: 'center' }}>
            <span className={'ag sw16 ' + c} aria-hidden="true" /><span className="idx">{l}</span>
          </span>
        ))}
      </div>
      <div className="col g4" aria-label="agenda por cancha y horario">
        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 4, position: 'sticky', top: 'calc(-1 * var(--top))', background: 'var(--surface)', padding: '6px 0', zIndex: 2 }}>
          <span />
          {a.canchas.map((c) => (
            <div key={c.t} className="col" style={{ alignItems: 'center' }}><span className="bx" style={{ fontSize: 12 }}>{c.t}</span><span className="idx" style={{ fontSize: 10 }}>{c.s}</span></div>
          ))}
        </div>
        {a.rows.map((r) => (
          <div key={r.h} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 4 }}>
            <span className="idx" style={{ alignSelf: 'center' }}>{r.h} h</span>
            {r.cells.map((c) => (
              <button key={c.k} className={'ag ' + c.cls} aria-label={c.aria} onClick={c.pick}>{c.txt}</button>
            ))}
          </div>
        ))}
      </div>
      <p className="ley" style={{ fontSize: 12 }}>tocá un horario libre para cargar una reserva manual o bloquearlo. las reservas por app entran solas.</p>
    </div>
  );
}
