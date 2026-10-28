import { BackHeader, Dots, Micro, Photo, Avatar, Kebab } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

export function MisPartidos({ vm }) {
  const mp = vm.mp;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// mis partidos</span></div>
      <h1 className="dk" style={{ fontSize: 50 }}>MIS PARTIDOS</h1>
      {mp.items.map((m) => (
        <button key={m.id} className={'tile col' + (m.hi ? ' hi' : '')} style={{ padding: 0, alignItems: 'stretch' }} onClick={m.ver}>
          <Photo src={m.foto} h={84} veil="bottom" alt="">
            <span className="rb g8"><span className={'pl ' + m.rolCls}>{m.rol}</span><span className="bx" style={{ fontSize: 14 }}>{m.conf}</span></span>
          </Photo>
          <span className="col g8" style={{ padding: 16 }}>
            <span className="ds" style={{ fontSize: 22, display: 'block' }}>{m.cuando}</span>
            <span className="ley" style={{ fontSize: 13, display: 'block' }}>{m.donde}{m.cat ? ' · ' + m.cat : ''}</span>
            {m.esTorneo && <span className="idx">{m.torneoTxt}</span>}
            <Dots dots={m.dots} thin />
            {m.nPend > 0 && <span className="sec" style={{ fontSize: 12 }}>{m.nPend === 1 ? '1 jugador espera que lo confirmes' : `${m.nPend} jugadores esperan que los confirmes`}</span>}
            {m.esperando && <span className="sec" style={{ fontSize: 12 }}>esperando confirmación del organizador</span>}
            {m.publicado && !m.nPend && <span className="sec" style={{ fontSize: 12 }}>{m.pubTxt}</span>}
            {m.showPublicar && <span className="sec" style={{ fontSize: 12 }}>{m.faltanTxt} · tocá para publicar</span>}
          </span>
        </button>
      ))}
      {mp.items.length === 0 && (
        <div className="cd col">
          <Photo src={IMG('pelota-noche')} h={150} veil="bottom" alt="pelota en el césped de noche" />
          <div className="col g12" style={{ padding: 18 }}>
            <p className="ds" style={{ fontSize: 24 }}>ni un partido a la vista.</p>
            <p className="ley">el pasto está crecido de tanto esperarte.</p>
            <button className="btn" onClick={mp.reservar}>reservar cancha</button>
            <button className="btn s" onClick={mp.buscar}>buscar partido</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SeQuiereSumar({ j }) {
  return (
    <section className="cd hi col g14" style={{ padding: 16 }} aria-label={`${j.n} se quiere sumar`}>
      <span className="sec">se sumó y espera tu ok</span>
      <div className="wrap g12" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Avatar oculta size={56} />
        <div className="col g2 min0">
          <span className="ds" style={{ fontSize: 24 }}>{j.n}</span>
          <span className="ley" style={{ fontSize: 13 }}>{j.pos} · nivel {j.nivel}</span>
        </div>
      </div>
      <div className="grid3" style={{ gap: 6 }}>
        <div className="col g2" style={{ padding: '10px 8px', border: '1px solid var(--line)' }}><span className="bx" style={{ fontSize: 18 }}>{j.asis}</span><span className="idx" style={{ fontSize: 10 }}>asistencia</span></div>
        <div className="col g2" style={{ padding: '10px 8px', border: '1px solid var(--line)' }}><span className="bx" style={{ fontSize: 18 }}>{j.conducta}</span><span className="idx" style={{ fontSize: 10 }}>conducta</span></div>
        <div className="col g2" style={{ padding: '10px 8px', border: '1px solid var(--line)' }}><span className="bx" style={{ fontSize: 18 }}>{j.jugados}</span><span className="idx" style={{ fontSize: 10 }}>partidos</span></div>
      </div>
      <p className="ley" style={{ fontSize: 12 }}>todavía no ves su foto ni su nombre completo: así decidís por lo que importa. ya pagó su parte; si lo quitás, le devolvemos todo.</p>
      <div className="grid2">
        <button className="btn" onClick={j.confirmar}>confirmar</button>
        {j.puedeQuitar
          ? <button className="btn s" onClick={j.quitar}>quitar del partido</button>
          : <button className="btn s" onClick={j.reportar}>reportar</button>}
      </div>
      <p className="idx">{j.limite}</p>
    </section>
  );
}

export function Partido({ vm, app }) {
  const p = vm.pd;
  if (!p) return null;
  return (
    <div className="col g20 pad">
      <Photo src={p.foto} h={150} veil="bottom" style={{ margin: 'calc(-1 * var(--top)) -20px 0' }} alt="">
        <div className="wrap g6"><span className={'pl ' + p.rolCls}>{p.rol}</span>{p.cat && <span className="pl" style={{ background: 'rgba(28,28,75,.7)' }}>{p.cat}</span>}{p.esTorneo && <span className="pl l" style={{ background: 'rgba(28,28,75,.7)' }}>{p.torneoTxt}</span>}</div>
      </Photo>
      <BackHeader app={app} label="// partido" />
      <div className="col g10">
        <h1 className="dk" style={{ fontSize: 42 }}>{p.cuandoUp}</h1>
        <p className="ley">{p.donde}</p>
      </div>
      {p.esperando && (
        <div className="cd hi wrap g10" style={{ padding: '14px 16px', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <Micro name="ciclo" size={18} color="#bce04b" style={{ animation: 'uhSpin .9s linear infinite', flex: 'none', marginTop: 1 }} />
          <p className="ley ink" style={{ fontSize: 13 }}>{p.esperaTxt}</p>
        </div>
      )}
      {p.pendientes.map((j) => <SeQuiereSumar key={j.n} j={j} />)}
      <div className={'cd col g12' + (p.hi && !p.nPend ? ' hi' : '')} style={{ padding: 16 }}>
        <Dots dots={p.dots} />
        <div className="rb">
          <span style={{ fontSize: 15 }} aria-live="polite"><span className="bx">{p.conf}</span> en la lista</span>
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
          <div key={j.id} className="ln wrap g12" style={{ alignItems: 'center', flexWrap: 'nowrap', minHeight: 62, padding: '8px 0' }}>
            <Avatar foto={j.foto} ini={j.n.charAt(0).toUpperCase()} oculta={j.oculta} size={40} ring={j.nuevo} />
            <div className="col g2 min0" style={{ flex: 1 }}>
              <span className="bx" style={{ fontSize: 15 }}>{j.nombre}{j.bloqueado ? ' · bloqueado' : ''}</span>
              <span className="idx">{j.pos}</span>
              {j.tel && <span className="idx" style={{ color: 'var(--ink)' }}>{j.tel}</span>}
            </div>
            <span className={'pl ' + j.estCls} style={{ alignSelf: 'center' }}>{j.est}</span>
            {!j.yo && <Kebab label={`opciones para ${j.n}: bloquear o reportar`} onClick={j.menu} />}
          </div>
        ))}
        <p className="ley" style={{ fontSize: 12, paddingTop: 10 }}>{p.esperando ? 'las fotos y los teléfonos aparecen cuando el organizador confirma tu lugar.' : 'los teléfonos se ven entre jugadores confirmados en el partido.'}</p>
      </section>
      <div className="col g8">
        <button className="btn s" onClick={p.noPuedo}>no puedo ir</button>
        <p className="ley center" style={{ fontSize: 12 }}>si cancelás con más de 6 horas de anticipación no afecta tu reputación.</p>
      </div>
    </div>
  );
}
