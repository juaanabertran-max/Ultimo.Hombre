import { Photo } from '../../components/ui.jsx';

const GRID3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 };

export default function PerfilComplejo({ vm }) {
  const c = vm.cp;
  const [a, b, d, e] = c.galeria;
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// tu complejo</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '92px 92px', gap: 4 }} aria-label="fotos del complejo">
        <Photo src={a} h="100%" veil={false} style={{ gridRow: 'span 2' }} alt="cancha de fútbol 5 de noche" />
        <Photo src={b} h="100%" veil={false} alt="cancha con las luces prendidas" />
        <Photo src={e || d} h="100%" veil={false} alt="pasillo de vestuarios" />
      </div>
      <div className="col g8">
        <h1 className="dk" style={{ fontSize: 46 }}>{c.nombreUp}</h1>
        {c.verificado && <span className="pl f">complejo verificado</span>}
        <p className="ley" style={{ fontSize: 13 }}>abierto de lunes a domingo, de 10 a 24 h</p>
      </div>
      <section className="col" aria-label="canchas">
        <h2 className="sec" style={{ paddingBottom: 6 }}>canchas</h2>
        {[['cancha 1', 'fútbol 5 · césped sintético'], ['cancha 2', 'fútbol 5 · césped sintético'], ['cancha 3', 'fútbol 7 · césped sintético']].map(([x, y]) => (
          <div key={x} className="row ln"><span className="bx" style={{ fontSize: 14 }}>{x}</span><span className="ley" style={{ fontSize: 13 }}>{y}</span></div>
        ))}
      </section>
      <section className="col" aria-label="precios por franja">
        <h2 className="sec" style={{ paddingBottom: 6 }}>precios por franja</h2>
        <div style={{ ...GRID3, padding: '8px 0' }}><span /><span className="idx">de día · 10 a 18 h</span><span className="idx">de noche · 18 a 24 h</span></div>
        {c.precios.map((p) => (
          <div key={p.t} className="ln" style={{ ...GRID3, padding: '12px 0' }}>
            <span className="bx" style={{ fontSize: 14 }}>{p.t}</span><span style={{ fontSize: 14 }}>{p.dia}</span><span style={{ fontSize: 14 }}>{p.noche}</span>
          </div>
        ))}
        {c.promo && <p className="sec" style={{ fontSize: 12, paddingTop: 8 }}>promo activa: de día entre semana, fútbol 5 a {c.promoDia5} y fútbol 7 a {c.promoDia7}.</p>}
      </section>
      <section className="col" aria-label="horarios">
        <h2 className="sec" style={{ paddingBottom: 6 }}>horarios</h2>
        <div className="row ln"><span className="ley ink" style={{ fontSize: 13 }}>lunes a domingo</span><span style={{ fontSize: 14 }}>10 a 24 h</span></div>
        <div className="row ln"><span className="ley ink" style={{ fontSize: 13 }}>turnos</span><span style={{ fontSize: 14 }}>de 1 hora</span></div>
      </section>
      <button className="btn s" onClick={c.cerrar}>cerrar sesión</button>
    </div>
  );
}
