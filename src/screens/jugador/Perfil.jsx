export default function Perfil({ vm }) {
  const p = vm.pp;
  return (
    <div className="col g22 pad">
      <div className="hdr"><span className="idx">// perfil</span></div>
      <div className="wrap g16" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <div style={{ width: 80, height: 80, flex: 'none', border: '1px solid var(--accent)', background: 'var(--surface-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <span className="dk" style={{ fontSize: 44, color: 'var(--accent)' }}>{p.ini}</span>
        </div>
        <div className="col g6 min0">
          <h1 className="dk" style={{ fontSize: 42 }}>{p.nombreUp}</h1>
          <p className="ley" style={{ fontSize: 13 }}>{p.sub}</p>
        </div>
      </div>
      <div className="grid3">
        <div className="cd hi col g6" style={{ padding: '14px 12px' }}><span className="dk" style={{ fontSize: 34, color: 'var(--accent)' }}>{p.asis}</span><span className="idx">asistencia</span></div>
        <div className="cd col g6" style={{ padding: '14px 12px' }}><span className="dk" style={{ fontSize: 34 }}>{p.jugados}</span><span className="idx">partidos jugados</span></div>
        <div className="cd col g6" style={{ padding: '14px 12px', justifyContent: 'space-between' }}><span className="bx" style={{ fontSize: 14, lineHeight: '17px', wordBreak: 'break-word' }}>{p.pos}</span><span className="idx">posición</span></div>
      </div>
      <section className="cd col g14" style={{ padding: 18 }} aria-label="cómo funciona la asistencia">
        <h2 className="sec">cómo funciona la asistencia</h2>
        {[
          'cada partido que jugás suma. tu % son los partidos que jugaste sobre los que confirmaste.',
          'si te bajás a último momento o no vas, baja. el complejo puede marcar un no-show.',
          'los organizadores ven tu % antes de sumarte. el que viene siempre, juega siempre.',
        ].map((txt, i) => (
          <div key={i} className="wrap g12" style={{ flexWrap: 'nowrap' }}>
            <span className="idx" style={{ flex: 'none' }}>// 0{i + 1}</span>
            <p className="ley ink" style={{ fontSize: 13 }}>{txt}</p>
          </div>
        ))}
      </section>
      <section className="col" aria-label="historial">
        <h2 className="sec" style={{ paddingBottom: 8 }}>historial</h2>
        {p.historial.map((h, i) => (
          <div key={i} className="ln rb" style={{ minHeight: 56, padding: '8px 0' }}>
            <div className="col g2 min0"><span className="bx" style={{ fontSize: 14 }}>{h.fecha}</span><span className="idx">{h.lugar}</span></div>
            <span className={'pl ' + h.cls} style={{ alignSelf: 'center' }}>{h.res}</span>
          </div>
        ))}
      </section>
      <button className="btn s" onClick={p.editar}>editar mi ficha</button>
    </div>
  );
}
