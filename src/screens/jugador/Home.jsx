import { Isologo, Barras, Marks, Dots, Icon, Photo } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

export function CardFeedMini({ f }) {
  return (
    <button className={'tile' + (f.hi ? ' hi' : '')} style={{ padding: 0, display: 'flex', alignItems: 'stretch' }} onClick={f.sumarme}>
      <span className="photo" style={{ width: 96, minHeight: 104 }} aria-hidden="true"><img src={f.foto} alt="" loading="lazy" /></span>
      <span className="col g4 min0" style={{ padding: '12px 14px', flex: 1 }}>
        <span className="sec">{f.busca}</span>
        <span className="bx" style={{ fontSize: 14 }}>{f.cuando}</span>
        <span className="ley" style={{ fontSize: 12, lineHeight: '17px' }}>{f.donde} · {f.cat}</span>
        <span className="rb" style={{ paddingTop: 2 }}><span className="idx">{f.share} c/u</span><Icon name="next" size={18} /></span>
      </span>
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
        <h1 className="dk" style={{ fontSize: 56 }}>HOLA, {h.aliasUp}</h1>
        <p className="ley">nunca te quedes sin jugar.</p>
      </div>

      {p ? (
        <section className="cd hi col" aria-label="próximo partido">
          <Photo src={p.foto} h={96} veil="bottom" alt="">
            <div className="rb"><span className="idx" style={{ color: 'var(--ink)' }}>// próximo partido</span><span className={'pl ' + p.rolCls}>{p.rol}</span></div>
          </Photo>
          <div className="col g14" style={{ padding: 18 }}>
            <div className="col g6">
              <p className="ds" style={{ fontSize: 27 }}>{p.cuando}</p>
              <p className="ley">{p.donde}{p.cat ? ' · ' + p.cat : ''}</p>
            </div>
            <Dots dots={p.dots} />
            <div className="rb">
              <span style={{ fontSize: 15 }}><span className="bx">{p.conf}</span> confirmados</span>
              {p.faltaGente && <span className="pl f">{p.faltanTxt}</span>}
              {p.completo && <span className="pl l">equipo completo</span>}
            </div>
            {p.nPend > 0 && <p className="sec" style={{ fontSize: 13 }}>{p.nPend === 1 ? 'alguien se sumó y espera que lo confirmes' : `${p.nPend} esperan que los confirmes`}</p>}
            {p.esperando && <p className="ley ink" style={{ fontSize: 13 }}>{p.esperaTxt}</p>}
            {p.showPublicar && (
              <div className="col g12">
                <p className="ley ink">{p.pregunta}</p>
                <button className="btn" onClick={p.publicar}>{p.cta}</button>
              </div>
            )}
            {p.publicado && <p className="sec" style={{ fontSize: 13 }}>{p.pubTxt}</p>}
            <button className="btn s" onClick={p.ver}>ver partido</button>
          </div>
        </section>
      ) : (
        <section className="cd col" aria-label="próximo partido">
          <Photo src={IMG('arco')} h={120} veil="bottom" alt="arco vacío en una cancha de césped sintético">
            <span className="idx" style={{ color: 'var(--ink)' }}>// próximo partido</span>
          </Photo>
          <div className="col g12" style={{ padding: 18 }}>
            <p className="ds" style={{ fontSize: 24 }}>el arco te está esperando.</p>
            <p className="ley">todavía no tenés partidos. reservá una cancha o sumate a uno cerca: hay gente que te necesita.</p>
            <button className="btn" onClick={h.reservar}>reservar cancha</button>
          </div>
        </section>
      )}

      {h.calif && (
        <button className="tile hi rb g12" style={{ padding: 16 }} onClick={h.calif.ir}>
          <span className="col g4 min0">
            <span className="sec">¿cómo estuvo el {h.calif.partido.split(' · ')[0]}?</span>
            <span className="ley ink" style={{ fontSize: 13 }}>calificá la conducta de tus compañeros. es a ciegas y tarda un minuto.</span>
          </span>
          <Icon name="next" size={22} />
        </button>
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
