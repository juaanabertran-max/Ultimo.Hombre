import { BackHeader, Dots, Micro } from '../../components/ui.jsx';

export function MisPartidos({ vm }) {
  const mp = vm.mp;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// mis partidos</span></div>
      <h1 className="dk" style={{ fontSize: 50 }}>MIS PARTIDOS</h1>
      {mp.items.map((m) => (
        <button key={m.id} className={'tile col g10' + (m.hi ? ' hi' : '')} style={{ padding: 16, alignItems: 'stretch' }} onClick={m.ver}>
          <span className="rb g8"><span className={'pl ' + m.rolCls}>{m.rol}</span><span className="bx" style={{ fontSize: 14 }}>{m.conf}</span></span>
          <span className="ds" style={{ fontSize: 22 }}>{m.cuando}</span>
          <span className="ley" style={{ fontSize: 13 }}>{m.donde}</span>
          {m.esTorneo && <span className="idx">{m.torneoTxt}</span>}
          <Dots dots={m.dots} thin />
          {m.publicado && <span className="sec" style={{ fontSize: 12 }}>{m.pubTxt}</span>}
          {m.showPublicar && <span className="sec" style={{ fontSize: 12 }}>{m.faltanTxt} · tocá para publicar</span>}
        </button>
      ))}
      {mp.items.length === 0 && (
        <div className="col g14" style={{ padding: '24px 0', alignItems: 'flex-start' }}>
          <Micro name="vacio" size={44} width={1} />
          <p className="ds" style={{ fontSize: 26 }}>ni un partido a la vista.</p>
          <p className="ley">el pasto está crecido de tanto esperarte.</p>
          <button className="btn" onClick={mp.reservar}>reservar cancha</button>
          <button className="btn s" onClick={mp.buscar}>buscar partido</button>
        </div>
      )}
    </div>
  );
}

export function Partido({ vm, app }) {
  const p = vm.pd;
  if (!p) return null;
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// partido" />
      <div className="col g10">
        <div className="wrap g6"><span className={'pl ' + p.rolCls}>{p.rol}</span>{p.esTorneo && <span className="pl l">{p.torneoTxt}</span>}</div>
        <h1 className="dk" style={{ fontSize: 42 }}>{p.cuandoUp}</h1>
        <p className="ley">{p.donde}</p>
      </div>
      <div className={'cd col g12' + (p.hi ? ' hi' : '')} style={{ padding: 16 }}>
        <Dots dots={p.dots} />
        <div className="rb">
          <span style={{ fontSize: 15 }} aria-live="polite"><span className="bx">{p.conf}</span> confirmados</span>
          {p.faltaGente && <span className="pl f">{p.faltanTxt}</span>}
          {p.completo && <span className="pl l">equipo completo</span>}
        </div>
        {p.showPublicar && (
          <div className="col g12"><p className="ley ink">{p.pregunta}</p><button className="btn" onClick={p.publicar}>{p.cta}</button></div>
        )}
        {p.publicado && (
          <div className="ln wrap g10" style={{ paddingTop: 12, alignItems: 'center', flexWrap: 'nowrap' }}>
            <Micro name="ciclo" color="#bce04b" style={{ animation: 'uhSpin .9s linear infinite', flex: 'none' }} />
            <span className="sec" style={{ fontSize: 12 }}>{p.pubTxt}</span>
          </div>
        )}
        {p.completo && <p className="ley">equipo completo. ahora que no falte nadie.</p>}
      </div>
      {p.hayDeben && (
        <div className="rb">
          <div className="col g2 min0"><span className="bx" style={{ fontSize: 14 }}>{p.pagosTxt}</span><span className="ley" style={{ fontSize: 12 }}>{p.debenTxt}</span></div>
          <button className="btn s sm" onClick={p.recordar}>recordar</button>
        </div>
      )}
      <section className="col" aria-label="jugadores">
        <h2 className="sec" style={{ paddingBottom: 8 }}>jugadores</h2>
        {p.jug.map((j) => (
          <div key={j.id} className="ln wrap g12" style={{ alignItems: 'center', flexWrap: 'nowrap', minHeight: 58, padding: '8px 0' }}>
            <span className="bx" style={{ width: 38, height: 38, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${j.nuevo ? 'var(--accent)' : 'var(--line-2)'}`, fontSize: 15 }} aria-hidden="true">{j.ini}</span>
            <div className="col g2 min0" style={{ flex: 1 }}><span className="bx" style={{ fontSize: 15 }}>{j.nombre}</span><span className="idx">{j.pos}</span></div>
            <span className={'pl ' + j.estCls} style={{ alignSelf: 'center' }}>{j.est}</span>
          </div>
        ))}
      </section>
      <button className="btn s" onClick={p.noPuedo}>no puedo ir</button>
    </div>
  );
}
