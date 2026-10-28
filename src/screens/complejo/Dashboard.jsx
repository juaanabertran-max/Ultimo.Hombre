import { Marks } from '../../components/ui.jsx';

export default function Dashboard({ vm }) {
  const d = vm.dash;
  return (
    <div className="col g20 pad">
      <div className="hdr rb">
        <span className="sec" style={{ fontSize: 13 }}>último hombre // complejos</span>
        <Marks />
      </div>
      <div className="col g8">
        <h1 className="dk" style={{ fontSize: 52 }}>{d.nombreUp}</h1>
        <div className="wrap" style={{ alignItems: 'center' }}>
          <span className="pl f">complejo verificado</span>
          <span className="pl l">complejo pionero</span>
          <span className="ley" style={{ fontSize: 13 }}>panel · hoy, miércoles 14</span>
        </div>
      </div>

      <section className="cd col g14" style={{ padding: 16 }} aria-label="ocupación de la semana">
        <div className="rb" style={{ alignItems: 'flex-end' }}>
          <div className="col g6"><span className="idx">// ocupación de la semana</span><span className="dk" style={{ fontSize: 52 }}>{d.ocup}</span></div>
          <span className="ley" style={{ fontSize: 12, textAlign: 'right' }}>3 canchas<br />10 a 24 h</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 6, alignItems: 'end', height: 104 }}>
          {d.bars.map((b) => (
            <div key={b.dia} className="col g4" style={{ alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
              <span className="idx" style={{ fontSize: 10 }}>{b.pct}%</span>
              <span style={{ display: 'block', width: '100%', height: Math.max(4, Math.round(b.pct * 0.8)), background: b.hoy ? 'var(--accent)' : 'var(--glow)' }} />
              <span className="idx" style={{ fontSize: 11 }}>{b.dia}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid2">
        <div className="cd col g6" style={{ padding: 14 }}><span className="idx">// reservas de hoy</span><span className="dk" style={{ fontSize: 40 }}>{d.hoy}</span><span className="ley" style={{ fontSize: 12 }}>{d.hoyTxt}</span></div>
        <div className="cd col g6" style={{ padding: 14 }}><span className="idx">// cobros del mes</span><span className="ds n" style={{ fontSize: 22, lineHeight: '40px' }}>{d.cobros}</span><span className="ley" style={{ fontSize: 12 }}>{d.cobrosTxt}</span></div>
      </div>

      <section className="cd hi col g14" style={{ padding: 16 }} aria-label="horas muertas">
        <div className="col g6">
          <h2 className="sec" style={{ fontSize: 16 }}>horas muertas</h2>
          <p className="ley" style={{ fontSize: 13 }}>de día y entre semana la cancha está más vacía que la tribuna visitante. {d.muertasTxt}.</p>
        </div>
        <div className="col g4">
          <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(7, minmax(0, 1fr))', gap: 4 }}>
            <span />
            {d.dias.map((x) => <span key={x} className="idx center" style={{ fontSize: 11 }}>{x}</span>)}
          </div>
          {d.heat.map((r) => (
            <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '52px repeat(7, minmax(0, 1fr))', gap: 4 }}>
              <span className="bx" style={{ fontSize: 11, alignSelf: 'center' }}>{r.label}</span>
              {r.cells.map((c, i) => (
                <span key={i} style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, background: `rgba(97, 97, 181, ${(0.1 + (c.pct / 100) * 0.9).toFixed(2)})`, border: `1px solid ${c.muerta ? 'var(--accent)' : 'rgba(233, 240, 255, .12)'}` }}>{c.pct}%</span>
              ))}
            </div>
          ))}
          <div className="wrap" style={{ alignItems: 'center', paddingTop: 4 }}>
            <span style={{ width: 14, height: 14, border: '1px solid var(--accent)' }} aria-hidden="true" />
            <span className="idx">hora muerta: menos del 40% ocupado</span>
          </div>
        </div>
        {d.promo ? (
          <div className="rb">
            <div className="col g4"><span className="pl f">promo activa</span><span className="ley" style={{ fontSize: 12 }}>-20% de lunes a viernes, de 10 a 18 h. ya aparece en la app.</span></div>
            <button className="btn s sm" onClick={d.pausar}>pausar</button>
          </div>
        ) : (
          <button className="btn" onClick={d.promocionar}>promocionar en la app · -20%</button>
        )}
      </section>

      {d.nuevas.length > 0 && (
        <section className="col" aria-label="recién entradas">
          <h2 className="sec" style={{ paddingBottom: 8 }}>recién entradas</h2>
          {d.nuevas.map((n) => (
            <div key={n.k} className="ln rb" style={{ minHeight: 54, padding: '8px 0' }}>
              <div className="col g2 min0"><span className="bx" style={{ fontSize: 14 }}>{n.txt}</span><span className="idx">{n.org}</span></div>
              <span className={'pl ' + n.estCls} style={{ alignSelf: 'center' }}>{n.est}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
