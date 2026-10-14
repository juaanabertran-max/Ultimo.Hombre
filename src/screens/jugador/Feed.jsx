import { BackHeader, Micro } from '../../components/ui.jsx';

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
      {fd.items.map((f) => (
        <article key={f.id} className={'cd col g12' + (f.hi ? ' hi' : '')} style={{ padding: 16 }}>
          {f.esTorneo && <span className="pl l">{f.torneoTxt}</span>}
          <div className="rb top">
            <div className="col g6 min0">
              <p className="sec" style={{ fontSize: 16 }}>{f.busca}</p>
              <p className="bx" style={{ fontSize: 15 }}>{f.cuando}</p>
              <p className="ley" style={{ fontSize: 13 }}>{f.donde}</p>
            </div>
            <div className="end"><span className="ds n" style={{ fontSize: 22 }}>{f.share}</span><span className="idx">c/u</span></div>
          </div>
          {f.hasMsg && <p className="ley ink" style={{ fontSize: 13 }}>“{f.msg}”</p>}
          <div className="ln rb" style={{ paddingTop: 12 }}>
            <span className="idx">organiza {f.org} · {f.nivel}</span>
            {f.can && <button className="btn sm" onClick={f.sumarme}>sumarme</button>}
            {f.joined && <span className="pl l">ya estás adentro</span>}
            {f.lleno && <span className="pl m">completo</span>}
          </div>
        </article>
      ))}
      {fd.items.length === 0 && <p className="ley center" style={{ padding: 12 }}>ningún torneo pidiendo refuerzos por ahora. raro, pero pasa.</p>}
    </div>
  );
}

export function Sumarme({ vm, app }) {
  const s = vm.sm;
  if (!s) return null;
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// sumarme" />
      <div className="col g10">
        {s.esTorneo && <span className="pl l">refuerzo · {s.torneoTxt}</span>}
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
      {s.hasMsg && <p className="ley ink">“{s.msg}”</p>}
      <div className="rb base">
        <div className="col g2"><span className="sec">tu parte</span><span className="idx">incluye el cargo por servicio</span></div>
        <span className="dk" style={{ fontSize: 38 }}>{s.share}</span>
      </div>
      <div className="cd wrap g12" style={{ padding: '14px 16px', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        <Micro name="alerta" size={22} color="#bce04b" style={{ flex: 'none', marginTop: 1 }} />
        <p className="ley" style={{ fontSize: 13 }}>
          si te bajás a último momento o no vas, baja tu asistencia. hoy tenés <span className="bx ley ink">{s.asis}</span>.
        </p>
      </div>
      <button className="btn" onClick={s.pagar}>pagar mi parte con mercado pago</button>
    </div>
  );
}
