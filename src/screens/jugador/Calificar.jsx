import { BackHeader, Avatar, Chips, Photo, Micro } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

export default function Calificar({ vm, app }) {
  const c = vm.cal;
  if (!c) return null;
  if (c.enviado) {
    return (
      <div className="col g20 pad">
        <Photo src={IMG('festejo-2')} h={190} veil="bottom" style={{ margin: 'calc(-1 * var(--top)) -20px 0' }} alt="jugadores festejando en la cancha" />
        <div className="hdr"><span className="idx">// calificación enviada</span></div>
        <h1 className="dk" style={{ fontSize: 46 }}>{c.todos ? 'YA CALIFICARON TODOS' : 'LISTO. AHORA, A ESPERAR'}</h1>
        <p className="ley ink" style={{ fontSize: 15, lineHeight: '22px' }}>
          {c.todos
            ? 'ya podés ver cómo te fue en tu perfil. nadie vio lo que puso cada uno.'
            : 'es a ciegas y simultáneo: nadie ve lo que le pusieron hasta que califican todos. te avisamos.'}
        </p>
        <button className="lnk" style={{ alignSelf: 'flex-start' }} onClick={c.reportar}>reportar una calificación injusta</button>
        <button className="btn" onClick={c.volver}>volver al inicio</button>
      </div>
    );
  }
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// después del partido" />
      <div className="col g8">
        <h1 className="dk" style={{ fontSize: 44 }}>¿CÓMO ESTUVO?</h1>
        <p className="ley">{c.partido}</p>
      </div>
      <div className="cd col g8" style={{ padding: '14px 16px' }}>
        <p className="wrap g10" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <Micro name="mira" size={18} color="#bce04b" style={{ flex: 'none', marginTop: 1 }} />
          <span className="ley ink" style={{ fontSize: 13 }}>calificás conducta (puntualidad y actitud), no habilidad. es a ciegas: nadie ve lo que le pusieron hasta que califican todos.</span>
        </p>
      </div>
      {c.comp.map((p) => (
        <section key={p.n} className="ln col g10" style={{ paddingTop: 14 }} aria-label={`calificar a ${p.n}`}>
          <div className="wrap g12" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
            <Avatar foto={p.foto} ini={p.n.charAt(0)} size={40} />
            <div className="col g2"><span className="bx" style={{ fontSize: 15 }}>{p.n}</span><span className="idx">{p.pos}</span></div>
          </div>
          <div className="col g6"><span className="idx">puntualidad</span><div className="wrap g6"><Chips items={p.punt} /></div></div>
          <div className="col g6"><span className="idx">actitud</span><div className="wrap g6"><Chips items={p.act} /></div></div>
        </section>
      ))}
      <p className="idx">{c.listos} de {c.total} calificados</p>
      <button className="btn" disabled={c.listos < c.total} onClick={c.enviar}>enviar calificación</button>
      <button className="lnk" style={{ alignSelf: 'flex-start' }} onClick={c.reportar}>reportar una calificación injusta</button>
    </div>
  );
}
