import { BackHeader, Stepper, Dots, Photo } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

export function Checkout({ vm, app }) {
  const c = vm.co;
  if (!c) return null;
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// checkout" />
      <h1 className="dk" style={{ fontSize: 48 }}>CONFIRMÁ EL TURNO</h1>
      <div className="cd col">
        <Photo src={c.foto} h={92} veil="bottom" alt=""><span className="idx" style={{ color: 'var(--ink)' }}>// tu turno</span></Photo>
        <div className="col g6" style={{ padding: 16 }}>
          <p className="ds" style={{ fontSize: 24 }}>{c.cuando}</p>
          <p className="ley">{c.donde}</p>
        </div>
      </div>
      <div className="rb">
        <div className="col g2">
          <span className="bx" style={{ fontSize: 14 }}>¿cuántos ya están?</span>
          <span className="ley" style={{ fontSize: 12 }}>contándote. el resto lo conseguimos.</span>
        </div>
        <Stepper value={`${c.nYa}/${c.cupo}`} onMinus={c.menos} onPlus={c.mas} />
      </div>
      <div className="col">
        <div className="row ln"><span className="ley ink">turno</span><span style={{ fontSize: 15 }}>{c.precio}</span></div>
        <div className="row ln"><span className="ley ink">cargo por servicio 6% · iva incluido</span><span style={{ fontSize: 15 }}>{c.fee}</span></div>
        <div className="row" style={{ borderTop: '1px solid var(--accent)' }}><span className="bx" style={{ fontSize: 16 }}>total</span><span className="bx" style={{ fontSize: 18 }}>{c.total}</span></div>
      </div>
      <div className="cd col g10" style={{ padding: 16 }}>
        <div className="rb">
          <span className="bx" style={{ fontSize: 15 }} id="lbl-split">dividir entre los jugadores</span>
          <button className={'sw' + (c.split ? ' on' : '')} role="switch" aria-checked={c.split} aria-labelledby="lbl-split" onClick={c.toggleSplit}><span /></button>
        </div>
        <p className="ley" style={{ fontSize: 13 }}>{c.splitTxt}</p>
      </div>
      <div className="rb base"><span className="sec">pagás ahora</span><span className="dk" style={{ fontSize: 38 }}>{c.ahora}</span></div>
      <p className="ley" style={{ fontSize: 12 }}>lo que ves es lo que pagás: el cargo por servicio ya está sumado. el pago lo procesa Mercado Pago y tu tarjeta no queda guardada en la app.</p>
      <button className="btn" onClick={c.pagar}>pagar con mercado pago</button>
      <p className="idx center">pago simulado para el prototipo</p>
    </div>
  );
}

export function Confirmado({ vm }) {
  const c = vm.cf;
  if (!c) return null;
  return (
    <div className="col g22 pad">
      <Photo src={IMG('festejo')} h={210} veil="bottom" style={{ margin: 'calc(-1 * var(--top)) -20px 0' }} alt="jugadores abrazados festejando un gol" />
      <div className="hdr rb">
        <span className="idx">// reserva confirmada</span>
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="#bce04b" strokeWidth="1.6" aria-hidden="true">
          <circle cx="18" cy="18" r="16" /><circle cx="18" cy="18" r="10" /><path d="M13 18.5l3.5 3.5 7-8" />
        </svg>
      </div>
      <h1 className="dk" style={{ fontSize: 62 }}>CANCHA RESERVADA.</h1>
      <p className="ds" style={{ fontSize: 23, lineHeight: '29px' }}>ahora solo falta que vengan todos.</p>
      <div className="cd hi col g12" style={{ padding: 16 }}>
        <p className="ds" style={{ fontSize: 22 }}>{c.cuando}</p>
        <p className="ley">{c.donde}</p>
        <Dots dots={c.dots} />
        <div className="ln col g4" style={{ paddingTop: 12 }}>
          <span style={{ fontSize: 14 }}>{c.pagado}</span>
          <span className="idx">{c.agenda}</span>
        </div>
      </div>
      {c.faltaGente && (
        <div className="col g12">
          <p style={{ fontSize: 16, lineHeight: '22px' }}>
            son <span className="bx">{c.conf}</span>. <span className="bx" style={{ color: 'var(--accent)' }}>{c.pregunta}</span>
          </p>
          <button className="btn" onClick={c.publicar}>{c.cta}</button>
        </div>
      )}
      <button className="btn s" onClick={c.mis}>ver mis partidos</button>
    </div>
  );
}
