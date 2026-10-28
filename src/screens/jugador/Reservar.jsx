import { useRef } from 'react';
import { BackHeader, Chips, Seg, Icon, Photo } from '../../components/ui.jsx';

function Filtros({ r }) {
  return (
    <>
      <Seg label="tipo de cancha" value={r.t} onChange={r.setTipo} options={[{ id: 5, label: 'fútbol 5' }, { id: 7, label: 'fútbol 7' }]} />
      <div className="hs"><Chips items={r.dias} /></div>
      <div className="wrap" style={{ flexWrap: 'nowrap' }}><Chips items={r.franjas} grow /></div>
    </>
  );
}

export function Complejos({ vm, app }) {
  const r = vm.res;
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// reservar" />
      <h1 className="dk" style={{ fontSize: 50 }}>RESERVÁ LA CANCHA</h1>
      <Filtros r={r} />
      <h2 className="sec">{r.titulo}</h2>
      {r.lista.map((x) => (
        <button key={x.id} className="tile col" style={{ padding: 0, alignItems: 'stretch' }} onClick={x.open}>
          <Photo src={x.foto} h={130} veil="bottom" alt="">
            <span className="rb base"><span className="ds" style={{ fontSize: 24 }}>{x.nombre}</span><span className="idx" style={{ color: 'var(--ink)' }}>{x.km}</span></span>
          </Photo>
          <span className="col g8" style={{ padding: '12px 16px 16px' }}>
            <span className="wrap g6">
              <span className={'pl ' + x.libresCls}>{x.libresTxt}</span>
              {x.promo && <span className="pl f">-20% de día</span>}
            </span>
            <span className="ley" style={{ fontSize: 13 }}>{x.precioTxt}</span>
          </span>
        </button>
      ))}
      {r.vacio && <p className="ley center" style={{ padding: '8px 12px' }}>todo lleno en esta franja. probá otra, que la cancha no se va a ningún lado.</p>}
    </div>
  );
}

function Galeria({ c }) {
  const ref = useRef(null);
  const ir = (i) => {
    c.setGal(i);
    const el = ref.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== c.gal) c.setGal(i);
  };
  return (
    <div style={{ position: 'relative', marginTop: 'calc(-1 * var(--top))' }}>
      <div className="gal" ref={ref} onScroll={onScroll} aria-label={`fotos de ${c.nombre}`} tabIndex={0}>
        {c.galeria.map((src, i) => <Photo key={src} src={src} h={240} veil="bottom" alt={`foto ${i + 1} de ${c.nombre}`} />)}
      </div>
      <div className="rb" style={{ position: 'absolute', left: 16, right: 16, bottom: 12 }}>
        <span className="idx" style={{ color: 'var(--ink)' }}>{c.gal + 1}/{c.galeria.length} · deslizá</span>
        <div className="galdots">{c.galeria.map((_, i) => <button key={i} className={i === c.gal ? 'on' : ''} aria-label={`ver foto ${i + 1}`} onClick={() => ir(i)} />)}</div>
      </div>
    </div>
  );
}

export function ComplejoDetalle({ vm, app }) {
  const c = vm.cxd;
  if (!c) return null;
  return (
    <div className="col" style={{ minHeight: '100%', position: 'relative' }}>
      <Galeria c={c} />
      <button className="ib" style={{ position: 'absolute', top: 4, left: 8, background: 'rgba(28,28,75,.6)' }} aria-label="volver" onClick={() => app.back()}><Icon name="back" /></button>
      <div className="col g20" style={{ padding: '20px 20px 28px', flex: 1 }}>
        <div className="col g8">
          <h1 className="dk" style={{ fontSize: 46 }}>{c.nombreUp}</h1>
          <p className="ley">{c.km} · fútbol 5 y 7 · abierto de 10 a 24 h</p>
        </div>
        <div className="grid2">
          <div className="cd col g4" style={{ padding: '12px 14px' }}>
            <span className="idx">de día · 10 a 18 h</span>
            <span className="ds n" style={{ fontSize: 21 }}>{c.dia}</span>
            {c.promo && <span className="sec" style={{ fontSize: 11 }}>promo horas muertas</span>}
          </div>
          <div className="cd col g4" style={{ padding: '12px 14px' }}>
            <span className="idx">de noche · 18 a 24 h</span>
            <span className="ds n" style={{ fontSize: 21 }}>{c.noche}</span>
          </div>
        </div>
        <Filtros r={vm.res} />
        {c.canchas.map((k) => (
          <div key={k.k} className="col g10">
            <h2 className="sec">{k.titulo}</h2>
            <div className="grid3" style={{ gap: 6 }}>
              {k.slots.map((s) => (
                <button key={s.h} className={'sl' + (s.oc ? ' oc' : s.on ? ' on' : '')} disabled={s.oc} aria-pressed={s.on} aria-label={s.aria} onClick={s.pick}>
                  <span className="bx" style={{ fontSize: 15 }}>{s.h} h</span>
                  <span style={{ fontSize: 11, textDecoration: s.oc ? 'line-through' : 'none' }}>{s.sub}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="ley" style={{ fontSize: 12 }}>los horarios punteados ya están reservados. el que madruga, juega.</p>
      </div>
      {c.sel && (
        <div className="up rb g14" style={{ position: 'sticky', bottom: 0, background: 'var(--surface-raised)', borderTop: '1px solid var(--accent)', padding: '14px 20px' }}>
          <div className="col g2 min0" style={{ flex: 1 }}>
            <span className="bx" style={{ fontSize: 14 }}>{c.sel.txt}</span>
            <span className="ds n" style={{ fontSize: 20 }}>{c.sel.precio}</span>
          </div>
          <button className="btn sm" onClick={c.sel.reservar}>reservar</button>
        </div>
      )}
    </div>
  );
}
