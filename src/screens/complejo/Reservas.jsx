import { Chips, Micro } from '../../components/ui.jsx';

export default function Reservas({ vm }) {
  const r = vm.rs;
  return (
    <div className="col g18 pad">
      <div className="hdr"><span className="idx">// reservas</span></div>
      <h1 className="dk" style={{ fontSize: 50 }}>RESERVAS</h1>
      <div className="cd hi wrap g14" style={{ padding: 16, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        <Micro name="mira" size={26} color="#bce04b" width={1.3} style={{ flex: 'none' }} />
        <div className="col g6">
          <h2 className="sec">sabés quién viene</h2>
          <p className="ley ink" style={{ fontSize: 13 }}>cada reserva por app trae nombre, teléfono y asistencia de quien reservó. menos superposiciones, menos ausencias.</p>
        </div>
      </div>
      <div className="hs"><Chips items={r.dias} /></div>
      <p className="idx">{r.count}</p>
      {r.items.map((x) => (
        <article key={x.k} className="cd col g10" style={{ padding: '14px 16px' }}>
          <div className="rb"><span className="bx" style={{ fontSize: 15 }}>{x.hora}</span><span className={'pl ' + x.estCls} style={{ alignSelf: 'center' }}>{x.est}</span></div>
          <div className="rb top">
            <div className="col g2 min0"><span className="bx" style={{ fontSize: 14 }}>{x.org}</span><span className="idx">{x.det}</span><span className="ley" style={{ fontSize: 12 }}>{x.pago}</span></div>
            <div className="end"><span className="ds n" style={{ fontSize: 20 }}>{x.asis}</span><span className="idx">asistencia</span></div>
          </div>
          {x.canNoShow && <button className="btn s sm" style={{ alignSelf: 'flex-start' }} onClick={x.noShow}>marcar no-show</button>}
          {x.noshow && <span className="pl f">no-show</span>}
        </article>
      ))}
      {r.items.length === 0 && <p className="ley center" style={{ padding: 12 }}>día tranquilo, ni una reserva. ideal para promocionar horas muertas.</p>}
    </div>
  );
}
