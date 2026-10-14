import { Chips } from '../../components/ui.jsx';

export default function Cobros({ vm }) {
  const c = vm.cob;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// cobros</span></div>
      <h1 className="dk" style={{ fontSize: 50 }}>COBROS</h1>
      <section className="cd hi col g14" style={{ padding: 16 }} aria-label="complejo pionero">
        <div className="rb g10"><span className="pl f">complejo pionero</span><span className="idx">estás en el mes {c.mes}</span></div>
        <p className="ley ink" style={{ fontSize: 13 }}>por sumarte de los primeros, la comisión arranca en cero y sube de a poco.</p>
        <div className="grid3" style={{ gap: 4 }}>
          {c.tramos.map((x) => (
            <div key={x.l} className="col g4" style={{ padding: '10px 8px', background: x.on ? 'var(--accent)' : 'transparent', color: x.on ? 'var(--on-accent)' : 'var(--ink)', border: `1px solid ${x.on ? 'var(--accent)' : 'rgba(233, 240, 255, .3)'}` }}>
              <span className="dk" style={{ fontSize: 26 }}>{x.r}</span>
              <span style={{ fontSize: 11, fontStyle: 'italic' }}>{x.l}</span>
            </div>
          ))}
        </div>
        <div>
          <span className="lbl" style={{ fontSize: 12 }}>simular liquidación en</span>
          <div className="wrap"><Chips items={c.meses} /></div>
        </div>
      </section>
      <section className="cd col" style={{ padding: 16 }} aria-label="liquidación de octubre">
        <span className="idx" style={{ paddingBottom: 6 }}>// liquidación de octubre</span>
        {c.lineas.map((l) => (
          <div key={l.l} className="row ln">
            <span className="ley ink" style={{ fontSize: 13 }}>{l.l}</span>
            <span style={{ fontSize: 14, flex: 'none', color: l.lime ? 'var(--accent)' : 'inherit' }}>{l.v}</span>
          </div>
        ))}
        <div className="row" style={{ borderTop: '1px solid var(--accent)', paddingBottom: 0 }}>
          <span className="sec">neto a cobrar</span><span className="dk" style={{ fontSize: 30 }}>{c.neto}</span>
        </div>
      </section>
      <p className="ley" style={{ fontSize: 12 }}>la comisión es del 4% + iva sobre lo cobrado por la app y se descuenta sola. lo que cobrás en el complejo es todo tuyo.</p>
    </div>
  );
}
