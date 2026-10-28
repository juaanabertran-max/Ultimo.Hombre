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
          <p className="ley ink" style={{ fontSize: 13 }}>de cada reserva por app ves el alias de quien organiza, su teléfono, cuántos juegan y el estado de pago. menos superposiciones, menos ausencias.</p>
          <p className="ley" style={{ fontSize: 12 }}>solo para gestionar la reserva: no se usan para publicidad propia.</p>
        </div>
      </div>
      <div className="hs"><Chips items={r.dias} /></div>
      <p className="idx">{r.count}</p>
      {r.items.map((x) => (
        <article key={x.k} className="cd col g10" style={{ padding: '14px 16px' }}>
          <div className="rb"><span className="bx" style={{ fontSize: 15 }}>{x.hora}</span><span className={'pl ' + x.estCls} style={{ alignSelf: 'center' }}>{x.est}</span></div>
          <div className="col">
            <div className="row ln"><span className="ley" style={{ fontSize: 13 }}>organiza</span><span className="bx" style={{ fontSize: 14 }}>{x.org}</span></div>
            <div className="row ln"><span className="ley" style={{ fontSize: 13 }}>teléfono</span><span style={{ fontSize: 14 }}>{x.tel}</span></div>
            <div className="row ln"><span className="ley" style={{ fontSize: 13 }}>jugadores</span><span style={{ fontSize: 14 }}>{x.jug}</span></div>
            <div className="row ln" style={{ paddingBottom: 0 }}><span className="ley" style={{ fontSize: 13 }}>pago</span><span style={{ fontSize: 14, textAlign: 'right' }}>{x.pago}</span></div>
          </div>
          {x.canNoShow && <button className="btn s sm" style={{ alignSelf: 'flex-start' }} onClick={x.noShow}>marcar no-show</button>}
          {x.noshow && <span className="pl f">no-show</span>}
        </article>
      ))}
      {r.items.length === 0 && <p className="ley center" style={{ padding: 12 }}>día tranquilo, ni una reserva. ideal para promocionar horas muertas.</p>}
    </div>
  );
}
