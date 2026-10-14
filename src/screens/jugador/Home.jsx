import { Isologo, Barras, Marks, Dots, Icon } from '../../components/ui.jsx';

export function CardFeedMini({ f }) {
  return (
    <button className={'tile rb' + (f.hi ? ' hi' : '')} style={{ padding: '14px 16px' }} onClick={f.sumarme}>
      <span className="col g4 min0">
        <span className="sec">{f.busca}</span>
        <span className="bx" style={{ fontSize: 14 }}>{f.cuando}</span>
        <span className="ley" style={{ fontSize: 13 }}>{f.donde}</span>
      </span>
      <span className="end g2"><span className="ds n" style={{ fontSize: 20 }}>{f.share}</span><span className="idx">c/u</span></span>
    </button>
  );
}

export default function Home({ vm }) {
  const h = vm.home;
  const p = h.prox;
  return (
    <div className="col g26 pad">
      <div className="hdr rb">
        <div className="wrap g10" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
          <Isologo width={20} mini />
          <span className="sec" style={{ fontSize: 13 }}>último hombre</span>
        </div>
        <Barras />
        <Marks />
      </div>

      <div className="col g8">
        <h1 className="dk" style={{ fontSize: 56 }}>HOLA, {h.nombreUp}</h1>
        <p className="ley">nunca te quedes sin jugar.</p>
      </div>

      {p ? (
        <section className="cd hi col g14" style={{ padding: 18 }} aria-label="próximo partido">
          <div className="rb"><span className="idx">// próximo partido</span><span className={'pl ' + p.rolCls}>{p.rol}</span></div>
          <div className="col g6">
            <p className="ds" style={{ fontSize: 27 }}>{p.cuando}</p>
            <p className="ley">{p.donde}</p>
          </div>
          <Dots dots={p.dots} />
          <div className="rb">
            <span style={{ fontSize: 15 }}><span className="bx">{p.conf}</span> confirmados</span>
            {p.faltaGente && <span className="pl f">{p.faltanTxt}</span>}
            {p.completo && <span className="pl l">equipo completo</span>}
          </div>
          {p.showPublicar && (
            <div className="col g12">
              <p className="ley ink">{p.pregunta}</p>
              <button className="btn" onClick={p.publicar}>{p.cta}</button>
            </div>
          )}
          {p.publicado && <p className="sec" style={{ fontSize: 13 }}>{p.pubTxt}</p>}
          <button className="btn s" onClick={p.ver}>ver partido</button>
        </section>
      ) : (
        <section className="cd col g12" style={{ padding: 20 }}>
          <span className="idx">// próximo partido</span>
          <p className="ds" style={{ fontSize: 24 }}>nada a la vista.</p>
          <p className="ley">el jueves no se juega solo. reservá una cancha o sumate a un partido.</p>
          <button className="btn" onClick={h.reservar}>reservar cancha</button>
        </section>
      )}

      <div className="grid3">
        {[
          ['reservar cancha', 'field', h.reservar],
          ['buscar partido', 'target', h.buscar],
          ['mis partidos', 'calendar', h.mis],
        ].map(([label, icon, fn]) => (
          <button key={label} className="tile col" style={{ minHeight: 108, padding: '14px 12px', justifyContent: 'space-between', alignItems: 'flex-start' }} onClick={fn}>
            <Icon name={icon} size={26} color="#bce04b" width={1.6} />
            <span className="bx" style={{ fontSize: 14, lineHeight: '17px' }}>{label}</span>
          </button>
        ))}
      </div>

      <section className="col g12" aria-label="partidos cerca que necesitan gente">
        <div className="rb">
          <h2 className="sec">partidos cerca que necesitan gente</h2>
          <button className="ib" onClick={h.buscar}><span className="idx">ver todos</span></button>
        </div>
        {h.cerca.map((f) => <CardFeedMini key={f.id} f={f} />)}
        {h.cerca.length === 0 && <p className="ley">por ahora nadie pide refuerzos. buena señal: todos fueron.</p>}
      </section>
    </div>
  );
}
