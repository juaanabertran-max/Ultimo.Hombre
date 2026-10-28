import { BackHeader, Micro, Photo } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';
import { CardFeedMini } from './Home.jsx';

function Publicidad() {
  return (
    <article className="cd col" aria-label="publicidad">
      <Photo src={IMG('pies-pelota')} h={120} veil="bottom" alt="">
        <span className="pl" style={{ background: 'rgba(28,28,75,.75)' }}>publicidad</span>
      </Photo>
      <div className="col g6" style={{ padding: '12px 16px 16px' }}>
        <span className="bx" style={{ fontSize: 15 }}>botines para sintético con 20% off</span>
        <span className="ley" style={{ fontSize: 12 }}>Pique Deportes · marca de ejemplo. lo ves porque activaste la publicidad de marcas deportivas.</span>
      </div>
    </article>
  );
}

function CardPartido({ f }) {
  return (
    <article className={'cd col' + (f.hi ? ' hi' : '')}>
      <Photo src={f.foto} h={130} veil="bottom" alt="">
        <div className="rb top">
          <div className="wrap g6">
            <span className="pl" style={{ background: 'rgba(28,28,75,.7)' }}>{f.cat}</span>
            {f.esTorneo && <span className="pl l" style={{ background: 'rgba(28,28,75,.7)' }}>{f.torneoTxt}</span>}
          </div>
        </div>
      </Photo>
      <div className="col g12" style={{ padding: 16 }}>
        <div className="rb top">
          <div className="col g6 min0">
            <p className="sec" style={{ fontSize: 16 }}>{f.busca}</p>
            <p className="bx" style={{ fontSize: 15 }}>{f.cuando}</p>
            <p className="ley" style={{ fontSize: 13 }}>{f.donde}</p>
          </div>
          <div className="end"><span className="ds n" style={{ fontSize: 22 }}>{f.share}</span><span className="idx">c/u</span></div>
        </div>
        <p className="wrap g8" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
          <Micro name="mira" size={14} color="#bce04b" style={{ flex: 'none', marginTop: 3 }} />
          <span className="ley ink" style={{ fontSize: 12, lineHeight: '17px' }}><span className="sr">por qué lo ves: </span>{f.porque}</span>
        </p>
        {f.msg && <p className="ley ink" style={{ fontSize: 13 }}>“{f.msg}”</p>}
        <div className="ln rb" style={{ paddingTop: 12 }}>
          <span className="idx">organiza {f.org} · {f.nivel}</span>
          {f.can && <button className="btn sm" onClick={f.sumarme}>sumarme</button>}
          {f.joined && <span className="pl l">ya estás adentro</span>}
          {f.lleno && <span className="pl m">completo</span>}
        </div>
      </div>
    </article>
  );
}

export function Feed({ vm }) {
  const fd = vm.fd;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// buscar partido</span></div>
      <div className="col g10">
        <h1 className="dk" style={{ fontSize: 50 }}>SUMATE A UN PARTIDO</h1>
        <p className="ley">partidos cerca que necesitan gente. vos elegís dónde y cuándo.</p>
      </div>
      <div className="wrap">
        <button className={'ch' + (!fd.soloTorneos ? ' on' : '')} aria-pressed={!fd.soloTorneos} onClick={() => fd.setSolo(false)}>todos</button>
        <button className={'ch' + (fd.soloTorneos ? ' on' : '')} aria-pressed={fd.soloTorneos} onClick={() => fd.setSolo(true)}>solo torneos</button>
      </div>
      {fd.items.map((f, i) => (
        <div key={f.id} className="col g20">
          <CardPartido f={f} />
          {fd.publi && i === 1 && <Publicidad />}
        </div>
      ))}
      {fd.items.length === 0 && (
        <div className="cd col">
          <Photo src={IMG('vestuario')} h={130} veil="bottom" alt="pasillo de vestuarios vacío" />
          <p className="ley center" style={{ padding: 16 }}>ningún torneo pidiendo refuerzos por ahora. el vestuario está vacío, pero no por mucho.</p>
        </div>
      )}
    </div>
  );
}

export function Sumarme({ vm, app }) {
  const s = vm.sm;
  if (!s) return null;
  return (
    <div className="col g20 pad">
      <Photo src={s.foto} h={190} veil="bottom" style={{ margin: 'calc(-1 * var(--top)) -20px 0' }} alt="">
        <div className="wrap g6"><span className="pl" style={{ background: 'rgba(28,28,75,.7)' }}>{s.cat}</span>{s.esTorneo && <span className="pl l" style={{ background: 'rgba(28,28,75,.7)' }}>refuerzo · {s.torneoTxt}</span>}</div>
      </Photo>
      <BackHeader app={app} label="// sumarme" />
      <div className="col g10">
        <h1 className="dk" style={{ fontSize: 42 }}>{s.cuandoUp}</h1>
        <p className="ley">{s.donde}</p>
      </div>
      <div className="cd col" style={{ padding: 16 }}>
        <div className="row" style={{ paddingTop: 0 }}><span className="ley">buscan</span><span className="sec">{s.busca}</span></div>
        <div className="row ln"><span className="ley">organiza</span><span className="bx" style={{ fontSize: 14 }}>{s.org}</span></div>
        <div className="row ln"><span className="ley">nivel</span><span className="bx" style={{ fontSize: 14 }}>{s.nivel}</span></div>
        <div className="row ln" style={{ paddingBottom: 0 }}><span className="ley">vas como</span><span className="bx" style={{ fontSize: 14 }}>{s.vasComo}</span></div>
      </div>
      {s.otraPos && <p className="ley" style={{ fontSize: 13 }}>{s.otraTxt}</p>}
      {s.msg && <p className="ley ink">“{s.msg}”</p>}
      <div className="rb base">
        <div className="col g2"><span className="sec">tu parte</span><span className="idx">con el cargo por servicio incluido</span></div>
        <span className="dk" style={{ fontSize: 38 }}>{s.share}</span>
      </div>
      <div className="cd col g10" style={{ padding: '14px 16px' }}>
        <p className="wrap g10" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <Micro name="anillos" size={18} color="#bce04b" style={{ flex: 'none', marginTop: 1 }} />
          <span className="ley ink" style={{ fontSize: 13 }}>{s.aviso} {s.auto ? '' : 'mientras tanto ve tu alias, posición, nivel y reputación. tu foto y tu teléfono, recién cuando te confirma.'}</span>
        </p>
        <p className="wrap g10" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <Micro name="alerta" size={18} color="#bce04b" style={{ flex: 'none', marginTop: 1 }} />
          <span className="ley ink" style={{ fontSize: 13 }}>si cancelás con más de 6 horas de anticipación no afecta tu reputación. hoy tu asistencia es {s.asis}.</span>
        </p>
      </div>
      <button className="btn" onClick={s.pagar}>pagar mi parte con mercado pago</button>
    </div>
  );
}

export function Aviso({ vm }) {
  const a = vm.av;
  if (!a) return null;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// aviso</span></div>
      <h1 className="dk" style={{ fontSize: 40 }}>ESTA VEZ NO SE DIO</h1>
      <div className="cd hi col g12" style={{ padding: 16 }}>
        <p className="ley ink" style={{ fontSize: 15, lineHeight: '22px' }}>el organizador completó el equipo de otra forma. ya te devolvimos tu pago y hay otros partidos cerca que te necesitan.</p>
        <div className="col">
          <div className="row ln"><span className="ley">partido</span><span className="bx" style={{ fontSize: 13, textAlign: 'right' }}>{a.cuando} · {a.donde}</span></div>
          <div className="row ln"><span className="ley">reembolso</span><span className="bx" style={{ fontSize: 14 }}>{a.monto} · total</span></div>
          <div className="row ln" style={{ paddingBottom: 0 }}><span className="ley">tu reputación</span><span className="bx" style={{ fontSize: 14 }}>no cambia</span></div>
        </div>
      </div>
      <h2 className="sec">partidos cerca que te necesitan</h2>
      {a.otros.map((f) => <CardFeedMini key={f.id} f={f} />)}
      <button className="btn s" onClick={a.buscar}>ver todos los partidos</button>
    </div>
  );
}
